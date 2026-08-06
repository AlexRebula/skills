#!/usr/bin/env python3
"""
Fetch a YouTube video's transcript and basic metadata without a browser.

Usage:
    python3 fetch_transcript.py <video-url-or-id> [--lang en]

Requires: youtube-transcript-api, requests (pip3 install youtube-transcript-api)

Output (stdout): a single JSON object.
    Success: {"video_id", "title", "author", "duration", "date_published", "transcript"}
    Failure: {"error": "<reason>"}

Exit codes:
    0  transcript fetched successfully
    1  transcript unavailable (disabled, not found, or fetch blocked) — caller
       should fall back to browser automation or ask the user to paste one
    2  bad input (couldn't parse a video ID from the argument)
"""

import argparse
import json
import re
import sys
import warnings
from typing import Optional

warnings.filterwarnings("ignore")  # silence urllib3's harmless macOS LibreSSL notice

try:
    import requests
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api._errors import CouldNotRetrieveTranscript
except ImportError as exc:
    print(json.dumps({"error": f"missing dependency: {exc}"}))
    sys.exit(1)

USER_AGENT = "Mozilla/5.0 (compatible; wiki-ingest-transcript-fetch/1.0)"


def extract_video_id(url_or_id: str) -> Optional[str]:
    """Pull an 11-char YouTube video ID out of a URL, or pass an ID through."""
    if re.fullmatch(r"[\w-]{11}", url_or_id):
        return url_or_id
    match = re.search(r"(?:v=|youtu\.be/|shorts/)([\w-]{11})", url_or_id)
    return match.group(1) if match else None


def fetch_metadata(video_id: str) -> dict:
    """Best-effort title/author/duration/date via oEmbed + the public watch page.

    Returns fields as None if a given piece can't be found — the caller still
    has a usable transcript even when metadata is partially missing.
    """
    metadata = {"title": None, "author": None, "duration": None, "date_published": None}

    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        resp = requests.get(oembed_url, timeout=10)
        if resp.ok:
            data = resp.json()
            metadata["title"] = data.get("title")
            metadata["author"] = data.get("author_name")
    except requests.RequestException:
        pass

    try:
        resp = requests.get(
            f"https://www.youtube.com/watch?v={video_id}",
            headers={"User-Agent": USER_AGENT},
            timeout=10,
        )
        if resp.ok:
            duration_match = re.search(r'itemprop="duration" content="([^"]+)"', resp.text)
            date_match = re.search(r'itemprop="datePublished" content="([^"]+)"', resp.text)
            if duration_match:
                metadata["duration"] = iso8601_duration_to_hms(duration_match.group(1))
            if date_match:
                metadata["date_published"] = date_match.group(1)[:10]
    except requests.RequestException:
        pass

    return metadata


def iso8601_duration_to_hms(duration: str) -> str:
    """Convert 'PT125M46S' style durations to 'H:MM:SS' / 'M:SS'."""
    match = re.fullmatch(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", duration)
    if not match:
        return duration
    hours, minutes, seconds = (int(g) if g else 0 for g in match.groups())
    total_minutes = hours * 60 + minutes
    if hours:
        return f"{hours}:{minutes:02d}:{seconds:02d}"
    return f"{total_minutes}:{seconds:02d}"


def format_timestamp(seconds: float) -> str:
    total = int(seconds)
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def fetch_transcript_text(video_id: str, lang: str) -> str:
    api = YouTubeTranscriptApi()
    fetched = api.fetch(video_id, languages=[lang, "en"])
    lines = [f"[{format_timestamp(snippet.start)}] {snippet.text}" for snippet in fetched]
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", help="YouTube video URL or 11-char video ID")
    parser.add_argument("--lang", default="en", help="Preferred transcript language (default: en)")
    args = parser.parse_args()

    video_id = extract_video_id(args.video)
    if not video_id:
        print(json.dumps({"error": f"could not extract a video ID from '{args.video}'"}))
        return 2

    try:
        transcript = fetch_transcript_text(video_id, args.lang)
    except CouldNotRetrieveTranscript as exc:
        print(json.dumps({"error": f"transcript unavailable: {exc}"}))
        return 1
    except Exception as exc:  # network/blocking errors from the underlying HTTP client
        print(json.dumps({"error": f"transcript fetch failed: {exc}"}))
        return 1

    metadata = fetch_metadata(video_id)
    print(json.dumps({"video_id": video_id, "transcript": transcript, **metadata}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
