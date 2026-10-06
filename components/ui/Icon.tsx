import type { ReactNode } from "react";

// Path data from the approved 24×24, 1.5px-stroke set in docs/icons/.
const paths = {
  "arrow-down": <path d="M12 4v16m-6-6 6 6 6-6" />,
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 2v6m10-6v6M3 11h18M7 15h3m4 0h3" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-left": <path d="m15 5-7 7 7 7" />,
  "chevron-right": <path d="m9 5 7 7-7 7" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  // Admin-only additions in the same 24×24, 1.5px style; not yet part of docs/icons/.
  edit: <path d="M15.5 5.5 18.5 8.5M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5 4 20Z" />,
  trash: <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 12.5h9l1-12.5M10 11v5m4-5v5" />,
  search: <path d="m20 20-4.2-4.2M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v7m0-11v1" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C11 2 3 6 4 14s13 8 16-10Z" />
      <path d="M4 21 16 9" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
    </>
  ),
  lotus: (
    <path d="M12 20C4 16 5 9 12 3c7 6 8 13 0 17ZM12 20C3 22 1 13 2 9c5 0 8 4 10 11ZM12 20c9 2 11-7 10-11-5 0-8 4-10 11Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  "map-pin": (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  pause: <path d="M8 4v16M16 4v16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-4a6 6 0 0 1 12 0v4M17 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  play: <path d="m8 4 12 8-12 8Z" />,
  shield: (
    <>
      <path d="m12 2 9 4v6c0 5-4 8-9 10-5-2-9-5-9-10V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  waves: <path d="M2 7c4-5 8 5 12 0s7 0 8 0M2 12c4-5 8 5 12 0s7 0 8 0M2 17c4-5 8 5 12 0s7 0 8 0" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

/** Decorative by default: every icon-only control must carry its own accessible name. */
export function Icon({ name, className, size = 24 }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
