import releases from '@site/src/data/releases.json';

/** The newest released version, e.g. "6.1.0". Releases are listed newest first. */
export const latestVersion: string = releases[0].version;

/**
 * Renders the newest version from src/data/releases.json as "v6.1.0".
 *
 * Add a release by putting a new entry at the top of that file; the overview
 * hero and the Release notes page both read it, so nothing else needs editing.
 */
export default function LatestVersion() {
  return <>v{latestVersion}</>;
}
