import { NextRequest, NextResponse } from 'next/server';
import { sendWhitepaperEmail, sendInternalNotification, type WhitepaperLead } from '@/app/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, industry } = body;

    // Validate required fields
    if (!name || !email || !company || !role || !industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate lead ID
    const leadId = `lead_${Date.now()}`;

    // Create lead object
    const lead: WhitepaperLead = {
      name,
      email,
      company,
      role,
      industry,
      leadId,
    };

    // Log the lead data
    console.log('Lead captured:', {
      ...lead,
      timestamp: new Date().toISOString(),
    });

    // Send emails in parallel
    const [emailSent, notificationSent] = await Promise.allSettled([
      sendWhitepaperEmail(lead),
      sendInternalNotification(lead),
    ]);

    // Log results
    if (emailSent.status === 'fulfilled' && emailSent.value) {
      console.log(`✅ Whitepaper email sent to ${email}`);
    } else {
      console.error(`❌ Failed to send whitepaper email to ${email}:`, emailSent.status === 'rejected' ? emailSent.reason : 'Unknown error');
    }

    if (notificationSent.status === 'fulfilled' && notificationSent.value) {
      console.log(`✅ Internal notification sent for lead ${leadId}`);
    } else {
      console.error(`❌ Failed to send internal notification for lead ${leadId}:`, notificationSent.status === 'rejected' ? notificationSent.reason : 'Unknown error');
    }

    // Return success even if email sending fails (to not break user experience)
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId,
      emailSent: emailSent.status === 'fulfilled' && emailSent.value,
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
