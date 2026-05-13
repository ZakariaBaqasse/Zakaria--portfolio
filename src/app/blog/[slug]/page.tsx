import db from "@/lib/db";
import { articlesTable } from "@/lib/db/schema";
import { Article } from "@/lib/utils/types";
import TransitionEffect from "@/lib/components/shared/TransitionEffect";
import ArticleDetailContent from "@/lib/components/pages/blog/ArticleDetailContent";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

async function getPublishedArticle(slug: string) {
  const [article] = await db
    .select()
    .from(articlesTable)
    .where(and(eq(articlesTable.slug, slug), eq(articlesTable.published, true)));

  return article;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Zakaria BAQASSE`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  const typedArticle: Article = {
    ...article,
    tags: article.tags ?? [],
  };

  return (
    <>
      <TransitionEffect />
      <ArticleDetailContent article={typedArticle} />
    </>
  );
}
