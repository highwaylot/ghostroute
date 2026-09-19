type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

// A tag shape (the thing this whole product teaches) with a hammered notch
// at the top standing in for "smith" — a simple, literal, ownable mark
// instead of an abstract swoosh.
export function Logo({ size = 22, withWordmark = true, className }: Props) {
  return (
    <span className={`logo ${className ?? ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18 4H8a2 2 0 0 0-2 2v10c0 .53.21 1.04.59 1.41l10 10a2 2 0 0 0 2.82 0l8-8a2 2 0 0 0 0-2.82l-10-10A2 2 0 0 0 18 4Z"
          fill="currentColor"
          className="logo-tag"
        />
        <circle cx="12" cy="10" r="2.4" fill="var(--navy)" />
        <path
          d="M14 4.5 18 2l1 2.2-3.4 2.1z"
          fill="currentColor"
          className="logo-hammer"
        />
      </svg>
      {withWordmark && <span className="wordmark">tagsmiths</span>}
    </span>
  );
}
