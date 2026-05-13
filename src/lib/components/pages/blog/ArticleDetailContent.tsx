"use client";

import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/utils/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "@/lib/components/shared/MarkdownRenderer";

function formatPublishedAt(dateValue: string | null) {
  const date = new Date(dateValue ?? "");
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ArticleDetailContent({
  article,
}: {
  article: Article;
}) {
  return (
    <main className="min-h-screen bg-light">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 font-medium text-dark transition-colors duration-200 hover:text-lightBlue"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold leading-tight text-dark md:text-5xl">
            {article.title}
          </h1>
        </div>

        <p className="mb-6 text-gray-500">
          {formatPublishedAt(article.published_at ?? article.createdAt)}
        </p>

        {article.tags?.length ? (
          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-lightBlue text-lightBlue"
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {article.cover_image_url && (
          <div className="mb-10 overflow-hidden rounded-xl shadow-md">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 768px, 100vw"
              unoptimized
            />
          </div>
        )}

        <MarkdownRenderer content={article.body} />
      </div>
    </main>
  );
}
