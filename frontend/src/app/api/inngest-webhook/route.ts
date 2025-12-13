// src/app/api/inngest-webhook/route.ts
import { inngest } from "~/inngest/client";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function POST(req: Request) {
  try {
    console.log("🔔 Webhook received!");

    const body = await req.json();
    console.log("📦 Webhook payload:", body);

    const { uploaded_file_id, status } = body;

    // Verify the request is from Modal (security check)
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${env.PROCESS_VIDEO_ENDPOINT_AUTH}`) {
      console.error("❌ Unauthorized webhook attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`✅ Sending event to Inngest for file: ${uploaded_file_id}`);

    // Send event to Inngest to wake up the waiting function
    await inngest.send({
      name: "video/processing.completed",
      data: {
        uploadedFileId: uploaded_file_id,
        status: status,
      },
    });

    console.log(`✅ Event sent to Inngest successfully`);

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 },
    );
  }
}

// Add GET method for testing
export async function GET() {
  return NextResponse.json({
    status: "Webhook endpoint is working",
    method: "POST required",
  });
}
