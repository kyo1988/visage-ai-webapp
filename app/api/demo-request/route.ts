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
  utmContent?: string;
  landingPage?: string; // hs_analytics_first_url 相当
};

/** HubSpot Forms API v3 へのサブミット
 *
 * 環境変数 HUBSPOT_PORTAL_ID / HUBSPOT_FORM_ID が設定されていれば送信、
 * 未設定の場合は false を返してリクエスト全体を失敗させない。
 */
async function submitToHubSpot(lead: DemoRequestLead): Promise<boolean> {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    console.log("[hubspot] skipped — HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID not set");
    return false;
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const payload = {
    fields: [
      { name: "email",                  value: lead.email },
      { name: "firstname",              value: lead.name },
      { name: "company",                value: lead.storeName },
      { name: "industry",               value: lead.industry },
      { name: "utm_source",             value: lead.utmSource ?? "" },
      { name: "utm_medium",             value: lead.utmMedium ?? "" },
      { name: "utm_campaign",           value: lead.utmCampaign ?? "" },
      { name: "utm_content",            value: lead.utmContent ?? "" },
      { name: "hs_analytics_first_url", value: lead.landingPage ?? "" },
      { name: "hs_language",            value: lead.locale },
    ],
    context: {
      pageUri: lead.landingPage ?? "",
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error(`[hubspot] submission failed: ${response.status} ${text}`);
    return false;
  }

  console.log(`[hubspot] submitted lead ${lead.leadId} (${lead.email})`);
  return true;
}

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
      utmContent: body.utmContent?.trim(),
      landingPage: body.landingPage?.trim(),
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

    const [emailResult, internalResult, hubspotResult] = await Promise.allSettled([
      sendDemoRequestEmail(lead),
      sendDemoRequestInternalNotification(lead),
      submitToHubSpot(lead),
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
      hubspotSubmitted: hubspotResult.status === "fulfilled" && hubspotResult.value,
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
