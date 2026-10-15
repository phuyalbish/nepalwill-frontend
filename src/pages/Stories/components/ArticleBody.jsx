import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

/** react-markdown passes the hast `node` prop; keep it off the DOM element. */
function clean(props) {
  const rest = { ...props };
  delete rest.node;
  return rest;
}

const LINK_CLASS =
  "font-medium text-purple underline decoration-purple/30 underline-offset-4 hover:decoration-purple";

/** Absolute http(s) and protocol-relative URLs. mailto:, tel:, #hash and /paths are not external. */
const isExternal = (href) => /^(https?:)?\/\//i.test(href);

/** External links open in a new tab; site paths use the router; everything else is a plain link. */
function Anchor(props) {
  const { href = "", children, ...rest } = clean(props);
  if (isExternal(href)) {
    return (
      <a {...rest} href={href} className={LINK_CLASS} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link {...rest} to={href} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  return (
    <a {...rest} href={href} className={LINK_CLASS}>
      {children}
    </a>
  );
}

const components = {
  h2: (props) => (
    <h2 {...clean(props)} className="mb-4 mt-12 font-display text-[2rem] leading-tight text-ink md:text-[2.25rem]" />
  ),
  h3: (props) => (
    <h3 {...clean(props)} className="mb-3 mt-8 font-display text-2xl leading-snug text-ink" />
  ),
  p: (props) => <p {...clean(props)} className="mb-6" />,
  ul: (props) => <ul {...clean(props)} className="mb-6 list-disc space-y-2 pl-6 marker:text-purple" />,
  ol: (props) => <ol {...clean(props)} className="mb-6 list-decimal space-y-2 pl-6 marker:text-purple" />,
  blockquote: (props) => (
    <blockquote
      {...clean(props)}
      className="my-8 rounded-r-card border-l-4 border-purple bg-purple/5 py-4 pl-6 pr-4 font-display text-2xl italic leading-snug text-ink"
    />
  ),
  a: Anchor,
  img: ({ alt = "", ...props }) => (
    <img {...clean(props)} alt={alt} loading="lazy" className="my-8 w-full rounded-card" />
  ),
  hr: () => <hr className="my-10 border-ink/10" />,
  strong: (props) => <strong {...clean(props)} className="font-bold text-ink" />,
};

/**
 * Markdown article body. Reading width is capped near 68ch, the first paragraph gets a drop cap.
 */
export default function ArticleBody({ content }) {
  return (
    <div
      className={[
        "leading-[1.85] text-ink-700 md:leading-[1.9]",
        "[&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:mt-1",
        "[&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-[4.5rem] [&>p:first-child]:first-letter:leading-[0.8]",
        "[&>p:first-child]:first-letter:text-purple",
      ].join(" ")}
    >
      <ReactMarkdown components={components}>{content || ""}</ReactMarkdown>
    </div>
  );
}
