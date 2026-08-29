import type { Metadata } from "next";
import { Suspense } from "react";
import InsightsPage from "@/components/insights/InsightsPage";
import { getInsightPosts } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives, trends and strategies from the intersection of media, technology, creativity and data.",
};

export const revalidate = 3600;

export default async function Page() {
  const posts = await getInsightPosts();
  return (
    <Suspense fallback={null}>
      <InsightsPage posts={posts} />
    </Suspense>
  );
}
