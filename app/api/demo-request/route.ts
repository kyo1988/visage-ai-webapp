import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDbOrNull } from "@/app/lib/firebaseAdmin";
import {
  sendDemoRequestEmail,
  sendDemoRequestInternalNotification,
  type DemoRequestLead,
} from "@/app/lib/email";

type Body = {
  locale?: string;
  name?: string;
  storeName?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;

    if (!body.name || !body.storeName || !body.email || !body.industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const locale = body.locale === "en" ? "en" : "ja";
    const leadId = `demo_${Date.now()}`;
    const lead: DemoRequestLead = {
      name: body.name.trim(),
      storeName: body.storeName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      industry: body.industry.trim(),
      message: body.message?.trim(),
      locale,
      leadId,
      utmSource: body.utmSource?.trim(),
      utmMedium: body.utmMedium?.trim(),
      utmCampaign: body.utmCampaign?.trim(),
    };

    const db = getDbOrNull();
    if (db) {
      await db.collection("demo_requests").doc(leadId).set({
        ...lead,
        createdAt: FieldValue.serverTimestamp(),
      });
    } else {
      console.warn("[demo-request] Firestore unavailable, skipping persistence");
    }

    const [emailResult, internalResult] = await Promise.allSettled([
      sendDemoRequestEmail(lead),
      sendDemoRequestInternalNotification(lead),
    ]);

    const calendlyUrl =
      process.env.NEXT_PUBLIC_CAL_URL ||
      process.env.CALCOM_URL ||
      `https://www.visageaiconsulting.com/${locale}/contact`;

    return NextResponse.json({
      success: true,
      leadId,
      emailSent: emailResult.status === "fulfilled" && emailResult.value,
      internalSent: internalResult.status === "fulfilled" && internalResult.value,
      calendlyUrl,
    });
  } catch (error) {
    console.error("[demo-request] failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
