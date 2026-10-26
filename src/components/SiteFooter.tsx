// Who runs this, and what happens to your work. Both were missing: the
// landing never named anyone, and "saved in this browser only" appeared
// only inside a reset warning.
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        tagsmiths is a hobby project by{' '}
        <a href="https://fenwickvale.com" rel="noopener">
          Fenwick &amp; Vale
        </a>
        . No accounts, no cookies, no analytics. Your work is saved in this browser only.
      </p>
    </footer>
  );
}
