import { getQuizBySlug, getAllQuizSlugs } from "@/lib/registry";
import { notFound } from "next/navigation";
import QuizPlayer from "./QuizPlayer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllQuizSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) return {};
  return {
    title: quiz.title,
    description: quiz.metaDescription,
    openGraph: {
      title: quiz.title,
      description: quiz.metaDescription,
      type: "website",
    },
  };
}

export default async function QuizPage({ params }: Props) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);
  if (!quiz) notFound();

  return <QuizPlayer quiz={JSON.parse(JSON.stringify(quiz))} />;
}
