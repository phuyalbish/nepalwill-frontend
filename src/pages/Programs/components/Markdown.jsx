import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/cn";

/** react-markdown passes its AST `node` prop to every component; drop it so it never reaches the DOM. */
const withoutNode = (props) => Object.fromEntries(Object.entries(props).filter(([key]) => key !== "node"));

/** Builds a renderer for one tag with fixed typography classes. */
const tag = (Tag, className) =>
  function MarkdownTag(props) {
    return <Tag className={className} {...withoutNode(props)} />;
  };

/** Typography-style rules for rendered program text, written locally (no typography plugin). */
const components = {
  h2: tag("h2", "mb-3 mt-10 font-display text-3xl text-ink first:mt-0"),
  h3: tag("h3", "mb-2 mt-8 text-lg font-bold text-ink"),
  p: tag("p", "mb-5 text-base leading-8 text-ink-700 last:mb-0"),
  ul: tag("ul", "mb-5 list-disc space-y-2 pl-6 text-ink-700 marker:text-purple"),
  ol: tag("ol", "mb-5 list-decimal space-y-2 pl-6 text-ink-700 marker:text-purple"),
  li: tag("li", "leading-7"),
  strong: tag("strong", "font-bold text-ink"),
  em: tag("em", "font-display text-[1.1em] italic"),
  a: tag(
    "a",
    "rounded-sm font-medium text-purple underline underline-offset-4 outline-none hover:text-purple-600 focus-visible:ring-4 focus-visible:ring-mint/60",
  ),
  blockquote: tag(
    "blockquote",
    "mb-5 border-l-4 border-mint-strong bg-mint-50/60 px-5 py-3 font-display text-xl italic text-ink",
  ),
  hr: tag("hr", "my-8 border-line"),
};

/** Renders markdown text. The first paragraph is set slightly larger as a lead. */
export default function Markdown({ children, className }) {
  return (
    <div className={cn("[&>p:first-child]:text-lg [&>p:first-child]:leading-9 [&>p:first-child]:text-ink", className)}>
      <ReactMarkdown components={components}>{children || ""}</ReactMarkdown>
    </div>
  );
}
