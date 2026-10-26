import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import releases from '@site/src/data/releases.json';

type Release = {
  version: string;
  date: string;
  engines: string;
  summary: string;
  highlights: string[];
  notes?: string[];
};

/**
 * Turns the small subset of Markdown used in releases.json into React:
 * **bold** and [label](/doc/path) links. Anything else stays plain text.
 */
function Inline({text}: {text: string}) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) return <Link key={i} to={link[2]}>{link[1]}</Link>;
        return part;
      })}
    </>
  );
}

/** Every release in src/data/releases.json, newest first. */
export default function ReleaseNotes() {
  return (
    <>
      {(releases as Release[]).map((release) => (
        <section key={release.version}>
          <Heading as="h2" id={`v${release.version.replace(/\./g, '-')}`}>
            {release.version}
          </Heading>
          <p>
            <em>{release.date} · {release.engines}</em>
          </p>
          <p>{release.summary}</p>
          <ul>
            {release.highlights.map((item, i) => (
              <li key={i}><Inline text={item} /></li>
            ))}
          </ul>
          {release.notes && release.notes.length > 0 && (
            <>
              <p><strong>Before you upgrade</strong></p>
              <ul>
                {release.notes.map((item, i) => (
                  <li key={i}><Inline text={item} /></li>
                ))}
              </ul>
            </>
          )}
        </section>
      ))}
    </>
  );
}
