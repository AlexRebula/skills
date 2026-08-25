import React, { type ReactNode, useEffect } from 'react';
import { GiselleThemeProvider } from '@littlebranches/giselle-mui';
import { useColorScheme } from '@mui/material/styles';

function readDocusaurusColorMode(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// Docusaurus's navbar toggle flips Infima's dark/light mode by setting
// `data-theme` on <html> (see @docusaurus/theme-common's colorMode context).
// It doesn't expose that state via a client module hook, and the toggle
// itself lives several layers below this Root component in the tree (inside
// `@theme/ThemeProvider`'s ColorModeProvider), so `useColorMode()` isn't
// reachable from here. Watching the attribute directly keeps this in sync
// with the *one* visible toggle Docusaurus already renders, without adding
// a second competing toggle UI or swizzling the navbar itself.
function GiselleColorModeBridge(): null {
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(readDocusaurusColorMode());

    const observer = new MutationObserver(() => {
      setMode(readDocusaurusColorMode());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [setMode]);

  return null;
}

// giselle-mui's theme ships with `colorSchemeSelector` defaulting to `'media'`
// (MUI's default whenever both light and dark color schemes are present),
// under which MUI's own `setMode` is a no-op — it only reacts to the OS-level
// `prefers-color-scheme` media query. Switching the selector to a dedicated
// data attribute makes `setMode` authoritative, which is what the bridge
// above needs. Deliberately NOT `'class'`: Docusaurus's router overwrites
// `document.documentElement.className` wholesale on every navigation
// (it owns that attribute for its own plugin/page classes), which silently
// wipes any class MUI adds. It never touches unrelated `data-*` attributes,
// and this uses its own name (`data-mui-mode`, not Docusaurus's own
// `data-theme`) so the two never fight over one attribute's value.
const themeOverrides = { colorSchemeSelector: 'data-mui-mode' };

// Swizzled Root: mounts GiselleThemeProvider around the whole site so any
// giselle-mui component rendered in custom content (landing page, section
// components) gets the Giselle theme, then bridges Docusaurus's existing
// dark/light toggle into it. Docusaurus's own chrome (sidebar, navbar shell,
// search, code blocks, pagination) stays on Infima — untouched here.
export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <GiselleThemeProvider themeOverrides={themeOverrides}>
      <GiselleColorModeBridge />
      {children}
    </GiselleThemeProvider>
  );
}
