"use client";

import { useDropzone } from "react-dropzone";
import type { Clip } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Loader2,
  UploadCloud,
  Sparkles,
  RefreshCw,
  FileAudio,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { generateUploadUrl } from "~/actions/s3";
import { toast } from "sonner";
import { processVideo } from "~/actions/generation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { ClipDisplay } from "./ClipDisplay";
import { motion } from "framer-motion";
import { Footer } from "./Footer";
import { ProcessingLoader } from "./ProcessingLoader";

const DEMO_PODCAST = {
  filename: "BillGatesPodcast.mp4",
  path: `https://res.cloudinary.com/dume4rw5s/video/upload/v1765561809/billGatesPodcast_eovdxo.mp4`,
  displayName: "Bill Gates | Raj Shamani (6 min demo)",
};

export function DashboardClient({
  uploadedFiles,
  clips,
}: {
  uploadedFiles: {
    id: string;
    s3Key: string;
    filename: string;
    status: string;
    clipsCount: number;
    createdAt: Date;
  }[];
  clips: Clip[];
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<Set<string>>(
    new Set(),
  );
  const router = useRouter();

  // Add handleProcessingComplete function
  const handleProcessingComplete = (fileId: string) => {
    setProcessingFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
    handleRefresh().catch(console.error);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    accept: {
      "video/mp4": [".mp4"],
    },
    maxSize: 500 * 1024 * 1024,
    maxFiles: 1,
    disabled: uploading,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    const file = files[0]!;
    setUploading(true);

    try {
      const { success, signedUrl, uploadedFileId } = await generateUploadUrl({
        filename: file.name,
        contentType: file.type,
      });

      if (!success) throw new Error("Failed to get upload URL");

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok)
        throw new Error(`Upload filed with status: ${uploadResponse.status}`);

      await processVideo(uploadedFileId);

      setFiles([]);

      // Add file to processing set
      setProcessingFiles((prev) => new Set(prev).add(uploadedFileId));

      toast.success("Video uploaded successfully", {
        description:
          "Your video has been scheduled for processing. Check the status below.",
        duration: 5000,
      });

      await handleRefresh();
    } catch (error) {
      toast.error("Upload failed", {
        description:
          "There was a problem uploading your video. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  
  const handleTryDemo = async () => {
    try {
      setUploading(true);
      
      toast.loading("Loading demo podcast...", {
        id: "demo-loading",
        duration: Infinity,
      });

      // Fetch the demo file from S3
      const response = await fetch(DEMO_PODCAST.path);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch demo: ${response.status}`);
      }

      const blob = await response.blob();
      const file = new File([blob], DEMO_PODCAST.filename, {
        type: "video/mp4",
      });
      
      setFiles([file]);

      toast.dismiss("demo-loading");
      
      toast.success("Demo podcast loaded!", {
        description: "Review the file and click 'Generate Clips' to try our AI.",
        duration: 3000,
      });

      // Scroll to the Generate Clips button
      setTimeout(() => {
        const generateButton = document.querySelector(
          "[data-generate-clips-button]",
        );
        if (generateButton) {
          generateButton.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

    } catch (error) {
      console.error("Demo load error:", error);
      
      toast.dismiss("demo-loading");
      
      toast.error("Failed to load demo", {
        description: "Please check your internet connection or try uploading your own file.",
        duration: 5000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handlePreviewDemo = () => {
    window.open(DEMO_PODCAST.path, "_blank");
  };

  return (
    <div
      className="fixed inset-0 w-full overflow-y-auto"
      style={{
        background:
          "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
      }}
    >
      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        {/* Tabs Section */}
        <Tabs defaultValue="upload">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left side: Tabs */}
            <TabsList className="inline-flex h-auto rounded-xl border border-[#F1F1F1] bg-white p-1 shadow-[0_4px_10px_#EAEAEA]">
              <TabsTrigger
                value="upload"
                className="rounded-lg px-4 py-2 text-[15px] font-medium text-[#010D3E]/70 transition-all data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#183EC2] data-[state=active]:to-[#001E80] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-[#183EC2]/25"
              >
                <UploadCloud className="h-4 w-4" />
                Upload
              </TabsTrigger>

              <TabsTrigger
                value="my-clips"
                className="rounded-lg px-4 py-2 text-[17px] font-medium text-[#010D3E]/70 transition-all data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#183EC2] data-[state=active]:to-[#001E80] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-[#183EC2]/25"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                My Clips
              </TabsTrigger>
            </TabsList>

            {/* Right side: Buy Credits button */}
            <Link href="/dashboard/billing">
              <Button
                className="btn btn-primary gap-2 text-[15px] shadow-lg shadow-[#183EC2]/25"
                size="lg"
              >
                <Sparkles className="h-5 w-5" />
                Buy Credits
              </Button>
            </Link>
          </motion.div>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="rounded-2xl border-[#F1F1F1] bg-white shadow-[0_20px_60px_rgba(24,62,194,0.15)]">
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Left side - Title and Description */}
                    <div className="flex-1">
                      <CardTitle className="text-3xl font-bold text-[#001E80]">
                        Upload Podcast
                      </CardTitle>
                      <CardDescription className="mt-2 text-lg leading-relaxed text-[#000000]">
                        Upload your audio or video file to generate viral clips
                        automatically
                      </CardDescription>
                    </div>

                    {/* Right side - Try Demo Section */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={handleTryDemo}
                        disabled={uploading}
                        className="group flex w-fit items-center gap-2 rounded-lg border border-[#183EC2]/20 bg-gradient-to-br from-[#EAEEFE]/50 to-[#EAEEFE]/30 px-4 py-2.5 text-sm font-semibold text-[#183EC2] shadow-sm transition-all duration-300 hover:border-[#183EC2] hover:from-[#183EC2]/10 hover:to-[#001E80]/5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FileAudio className="h-4 w-4" />
                        Try demo podcast
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={handlePreviewDemo}
                        className="group flex w-fit items-center justify-end gap-1.5 text-xs font-medium text-[#183EC2]/70 transition-colors hover:text-[#183EC2]"
                      >
                        <span className="underline decoration-[#183EC2]/30 underline-offset-2 group-hover:decoration-[#183EC2]">
                          {DEMO_PODCAST.displayName}
                        </span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    className={`relative flex min-h-[100px] cursor-pointer flex-col items-center justify-center space-y-6 rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                      isDragActive
                        ? "border-[#183EC2] bg-gradient-to-br from-[#183EC2]/10 to-[#001E80]/5 shadow-lg shadow-[#183EC2]/20"
                        : "border-[#183EC2]/20 bg-gradient-to-br from-[#EAEEFE]/50 to-[#EAEEFE]/30 hover:border-[#183EC2]/40 hover:from-[#EAEEFE]/70 hover:to-[#EAEEFE]/50 hover:shadow-md"
                    } ${uploading ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <input {...getInputProps()} />

                    {/* Icon with gradient glow */}
                    <div className="relative">
                      <UploadCloud className="h-12 w-12 text-[#010D3E]" />
                    </div>

                    {/* Text Content */}
                    {isDragActive ? (
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-[#183EC2]">
                          Drop the file here
                        </p>
                        <p className="text-base text-[#183EC2]/70">
                          Release to upload your podcast
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-2xl font-bold text-[#010D3E]">
                          Drop your podcast here
                        </p>
                        <p className="max-w-md text-base text-[#010D3E]/60">
                          or click to browse files
                        </p>
                        <p className="text-sm font-medium text-[#010D3E]/50">
                          ( Supports MP4 files up to 500MB )
                        </p>
                      </div>
                    )}
                  </div>
                  {/* File Info and Upload Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1 rounded-2xl border border-[#F1F1F1] bg-gradient-to-br from-[#EAEEFE]/50 to-[#EAEEFE]/30 p-6">
                      {files.length > 0 ? (
                        <>
                          <p className="mb-3 text-sm font-semibold text-[#010D3E]/70">
                            Selected file:
                          </p>
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="flex items-center gap-3"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#183EC2]/10 to-[#001E80]/5">
                                <svg
                                  className="h-5 w-5 text-[#183EC2]"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-semibold text-[#010D3E]">
                                  {file.name}
                                </p>
                                <p className="text-sm text-[#010D3E]/60">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Please upload a podcast file or try our demo.
                        </p>
                      )}
                    </div>

                    <Button
                      disabled={files.length === 0 || uploading}
                      onClick={handleUpload}
                      data-generate-clips-button
                      className="btn btn-primary h-auto px-8 py-4 text-base font-semibold whitespace-nowrap shadow-lg shadow-[#183EC2]/25"
                      size="lg"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Clips
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* In the Queue Status section, add the loader before thetable: */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-10 space-y-8 border-t border-[#183EC2]/10 bg-gradient-to-br from-[#EAEEFE]/40 to-[#EAEEFE]/20 p-8 shadow-[0_10px_40px_rgba(24,62,194,0.08)] transition-all hover:shadow-[0_12px_50px_rgba(24,62,194,0.15)]">
                      {/* Header Row */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-[#010D3E]">
                            Processing Queue
                          </h3>
                          <p className="mt-1 text-base text-[#010D3E]">
                            Track your uploads and generated clips in real-time
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRefresh}
                          disabled={refreshing}
                          className="gap-2 rounded-lg border-[#183EC2]/30 bg-white px-4 py-2 text-sm font-medium text-[#010D3E] shadow-sm transition-all duration-300 hover:border-[#183EC2] hover:bg-[#183EC2]/10 hover:text-[#183EC2]"
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                          />
                          Refresh
                        </Button>
                      </div>

                      {/* Processing Loaders */}
                      <div className="space-y-4">
                        {uploadedFiles
                          .filter(
                            (file) =>
                              file.status === "queued" ||
                              file.status === "processing" ||
                              processingFiles.has(file.id),
                          )
                          .map((file) => (
                            <ProcessingLoader
                              key={file.id}
                              fileId={file.id}
                              filename={file.filename}
                              status={file.status} // No type assertion needed!
                              onComplete={() =>
                                handleProcessingComplete(file.id)
                              }
                            />
                          ))}
                      </div>

                      {/* Table Container */}
                      <div className="overflow-hidden rounded-2xl border border-[#F1F1F1] bg-white shadow-sm">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gradient-to-br from-[#EAEEFE]/70 to-[#EAEEFE]/50 hover:from-[#EAEEFE]/80 hover:to-[#EAEEFE]/60">
                              <TableHead className="text-sm font-semibold tracking-wide text-[#010D3E] uppercase">
                                File
                              </TableHead>
                              <TableHead className="text-sm font-semibold tracking-wide text-[#010D3E] uppercase">
                                Uploaded
                              </TableHead>
                              <TableHead className="text-sm font-semibold tracking-wide text-[#010D3E] uppercase">
                                Status
                              </TableHead>
                              <TableHead className="text-sm font-semibold tracking-wide text-[#010D3E] uppercase">
                                Clips Created
                              </TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {uploadedFiles.map((item, index) => (
                              <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                                className="border-b border-[#F1F1F1] transition-all hover:bg-[#EAEEFE]/25"
                              >
                                <TableCell className="max-w-xs truncate py-5 text-[15px] font-medium text-[#010D3E]">
                                  {item.filename}
                                </TableCell>
                                <TableCell className="py-5 text-[15px] text-[#010D3E]/70">
                                  {new Date(item.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </TableCell>
                                <TableCell className="py-5">
                                  {item.status === "queued" && (
                                    <Badge
                                      variant="outline"
                                      className="rounded-md border-yellow-200 bg-yellow-50 px-3 py-1 text-[14px] font-semibold text-yellow-700"
                                    >
                                      Queued
                                    </Badge>
                                  )}
                                  {item.status === "processing" && (
                                    <Badge
                                      variant="outline"
                                      className="rounded-md border-blue-200 bg-blue-50 px-3 py-1 text-[14px] font-semibold text-blue-700"
                                    >
                                      Processing
                                    </Badge>
                                  )}
                                  {item.status === "processed" && (
                                    <Badge className="rounded-md bg-gradient-to-br from-[#183EC2] to-[#001E80] px-3 py-1 text-[14px] font-semibold text-white shadow-sm">
                                      Processed
                                    </Badge>
                                  )}
                                  {item.status === "no credits" && (
                                    <Badge
                                      variant="destructive"
                                      className="rounded-md px-3 py-1 text-[14px] font-semibold"
                                    >
                                      No Credits
                                    </Badge>
                                  )}
                                  {item.status === "failed" && (
                                    <Badge
                                      variant="destructive"
                                      className="rounded-md px-3 py-1 text-[14px] font-semibold"
                                    >
                                      Failed
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="py-5 text-[16px]">
                                  {item.clipsCount > 0 ? (
                                    <span className="font-semibold text-[#183EC2]">
                                      {item.clipsCount} clip
                                      {item.clipsCount !== 1 ? "s" : ""}
                                    </span>
                                  ) : (
                                    <span className="text-[#000000]">
                                      No clips yet
                                    </span>
                                  )}
                                </TableCell>
                              </motion.tr>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* My Clips Tab */}
          <TabsContent value="my-clips">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="rounded-2xl border-[#F1F1F1] bg-white shadow-[0_20px_60px_rgba(24,62,194,0.15)]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold text-[#001E80]">
                    My Clips
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-[#000000]">
                    View and manage your AI-generated clips. Processing may take
                    a few minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClipDisplay clips={clips} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
