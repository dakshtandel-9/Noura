import { Fragment } from "react";

/**
 * Editorial line breaks for headings: breaks on wider screens, natural reflow on mobile
 * (docs/design.md §4).
 */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br className="br-wide" />}
          {i > 0 && " "}
          {line}
        </Fragment>
      ))}
    </>
  );
}
