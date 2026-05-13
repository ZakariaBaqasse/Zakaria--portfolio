"use client";

import React from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import MermaidDiagram from "./MermaidDiagram";

type MarkdownRendererProps = {
  content: string;
};

const MarkdownCodeBlock: Components["code"] = ({
  className,
  children,
  ...props
}) => {
  const language = className?.replace("language-", "") ?? "";

  if (language === "mermaid") {
    return <MermaidDiagram code={String(children).trim()} />;
  }

  // Inline code (no language class) — let prose style it
  if (!className) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      style={oneDark}
      language={language}
      PreTag="div"
      customStyle={{ borderRadius: "0.5rem", fontSize: "0.875rem" }}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

const MarkdownPre: Components["pre"] = ({ children, ...props }) => {
  // SyntaxHighlighter and MermaidDiagram both render their own wrapper — skip <pre>
  if (
    React.isValidElement(children) &&
    (children.type === MermaidDiagram ||
      // SyntaxHighlighter renders a div, not a React component we can check by type,
      // but the code block renderer already returns its own element, so the pre
      // child will be a plain element — we pass through as-is.
      (children.props as { className?: string })?.className?.startsWith(
        "language-"
      ))
  ) {
    return <>{children}</>;
  }

  return <pre {...props}>{children}</pre>;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose max-w-none font-mont prose-headings:text-dark prose-a:text-lightBlue prose-code:text-dark prose-strong:text-dark">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ code: MarkdownCodeBlock, pre: MarkdownPre }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
