import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { DashboardHeader } from "~/components/DashboardHeader";
import { Toaster } from "~/components/ui/sonner";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export const metadata: Metadata = {
  title: "Dashboard - ViralAI",
  description:
    "Manage your podcast clips and generate viral content with AI. Upload podcasts, track processing status, and access your AI-generated clips.",
  keywords: [
    "podcast clipper",
    "AI podcast editor",
    "viral clips",
    "podcast to clips",
    "TikTok clips",
    "Instagram Reels",
    "YouTube Shorts",
    "podcast editing",
    "automated video clips",
    "ViralAI",
    "dashboard",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viralai.com/dashboard",
    title: "Dashboard - ViralAI",
    description: "Manage your podcast clips and generate viral content with AI",
    siteName: "ViralAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard - ViralAI",
    description: "Manage your podcast clips and generate viral content with AI",
    creator: "@viralai",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { credits: true, email: true },
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#EAEEFE]">
      <DashboardHeader credits={user.credits} email={user.email} />
      <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
