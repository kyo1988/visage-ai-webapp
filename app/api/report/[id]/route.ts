import { db } from '../../../../firebase-admin.js';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    // request.urlを手動でパースしてidを抽出
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    // IDが取得できなかった場合の安全確認
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // 抜き出した安全な 'id' を使ってデータベースに問い合わせ
    const docRef = db.collection('diagnostics').doc(id);

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const data = docSnap.data();

    // ★★★★★ これが最後の安全確認です ★★★★★
    // dataがundefinedでないことをTypeScriptに教えます
    if (!data) {
      return NextResponse.json({ error: 'Document is empty' }, { status: 404 });
    }
    // ★★★★★★★★★★★★★★★★★★★★★★★★★

    // この行以降、TypeScriptはdataが安全であることを確信します
    const responseData = {
      skinAge: data.skinAge,
      skinType: data.skinType,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? '',
      scores: {
        wrinkles: data.wrinklesScore,
        texture: data.textureScore,
        pores: data.poresScore,
        brightening: data.brighteningScore,
        transparency: data.transparencyScore,
        spots: data.spotsScore,
      }
    };

    return NextResponse.json(responseData);

  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    // params.id を参照しないように修正
    console.error(`API Error`, errorMessage);
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}