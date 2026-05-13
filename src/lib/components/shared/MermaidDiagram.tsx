"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useId, useState } from "react";

type MermaidModule = typeof import("mermaid");

type MermaidDiagramProps = {
  code: string;
};

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = `mermaid-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    void import("mermaid")
      .then((module: MermaidModule) => {
        module.default.initialize({
          startOnLoad: false,
          theme: "neutral",
        });
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(false);
    setSvg(null);

    void import("mermaid")
      .then(async (module: MermaidModule) => {
        try {
          const { svg: renderedSvg } = await module.default.render(id, code);

          if (!cancelled) {
            setSvg(renderedSvg);
            setLoading(false);
          }
        } catch {
          if (!cancelled) {
            setError(true);
            setLoading(false);
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Rendering diagram…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-600">
          Mermaid render failed
        </p>
        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm text-dark">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: svg ?? "" }} />;
}
