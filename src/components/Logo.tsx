type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

// A clean price-tag silhouette with a punched hole — legible at 16px,
// carries the "tagsmiths" pun without needing extra detail (an earlier
// version added a hammer accent that just read as noise at small sizes).
export function Logo({ size = 22, withWordmark = true, className }: Props) {
  return (
    <span className={`logo ${className ?? ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M11.28 2.5H19a2.5 2.5 0 0 1 2.5 2.5v7.72a2.5 2.5 0 0 1-.73 1.77l-8.5 8.5a2.5 2.5 0 0 1-3.54 0l-7.72-7.72a2.5 2.5 0 0 1 0-3.54l8.5-8.5a2.5 2.5 0 0 1 1.77-.73Z"
          fill="currentColor"
        />
        <circle cx="16" cy="8" r="2" fill="var(--navy)" />
      </svg>
      {withWordmark && <span className="wordmark">tagsmiths</span>}
    </span>
  );
}
