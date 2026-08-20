import React from 'react';
import { Redirect } from '@docusaurus/router';

/**
 * The docs plugin owns the site root (routeBasePath: '/'), but no single
 * doc is mapped to the exact "/" path, so visiting the bare root 404s.
 * This sends visitors into the docs instead of showing a dead end.
 */
export default function Home(): JSX.Element {
  return <Redirect to="/engineering/ask-matt" />;
}
