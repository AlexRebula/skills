import React, { useEffect, useState, type ReactNode } from 'react';
import type { GitHubStarsProps } from './types';
import styles from './github-stars.module.css';

export function GitHubStars({ repo }: GitHubStarsProps): ReactNode {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Rate-limited or offline: fall back to a plain link, no count shown.
      });
  }, [repo]);

  return (
    <a href={`https://github.com/${repo}`} className={styles.starBadge} target="_blank" rel="noreferrer">
      {stars ? `★ ${stars.toLocaleString()} stars` : 'View on GitHub'}
    </a>
  );
}
