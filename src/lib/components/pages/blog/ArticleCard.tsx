"use client";

import { Article } from "@/lib/utils/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatPublishedAt(dateValue: string | null) {
  const date = new Date(dateValue ?? "");
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden rounded-xl bg-light shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={article.cover_image_url || "/images/coming-soon-placeholder.avif"}
          alt={article.title}
          width={800}
          height={450}
          className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          unoptimized={Boolean(article.cover_image_url)}
        />
      </CardHeader>

      <CardContent className="p-6">
        <p className="mb-2 text-sm text-gray-500">
          {formatPublishedAt(article.published_at ?? article.createdAt)}
        </p>
        <h3 className="mb-2 text-2xl font-bold text-dark">{article.title}</h3>
        <p className="mb-4 text-gray-600">{article.excerpt}</p>

        {article.tags?.length ? (
          <div className="mb-4 flex flex-wrap gap-2">
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

        <Button asChild className="bg-dark text-light text-base w-36 h-12 hover:bg-lightBlue">
          <Link href={`/blog/${article.slug}`}>Read More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
