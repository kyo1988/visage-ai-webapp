import { NextResponse } from "next/server";
import { getDbOrNull } from "@/app/lib/firebaseAdmin";
import { fetchResultByShortPath } from "@/app/lib/result-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || "test1234";

    const db = getDbOrNull();
    const envStatus = {
        hasDb: !!db,
        hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        hasKey: !!process.env.FIREBASE_PRIVATE_KEY,
        keyShape: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.substring(0, 30) + "..." : "none",
    };

    if (!db) {
        return NextResponse.json({ error: "Failed to initialize db", envStatus }, { status: 500 });
    }

    try {
        const result = await fetchResultByShortPath(code);
        const rawQuery = await db
            .collection("results")
            .where("short_path", "==", `r/${code}`)
            .get();

        return NextResponse.json({
            envStatus,
            inputCode: code,
            parsedQueryVal: `r/${code}`,
            rawDocsCount: rawQuery.size,
            rawDocsExists: rawQuery.empty === false,
            resultObj: result,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, envStatus }, { status: 500 });
    }
}
