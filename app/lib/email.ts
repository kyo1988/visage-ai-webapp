import nodemailer from 'nodemailer';

const EMAIL_USER =
  process.env.EMAIL_USER ||
  process.env.GMAIL_USER;
const EMAIL_APP_PASSWORD =
  process.env.EMAIL_APP_PASSWORD ||
  process.env.GMAIL_APP_PASSWORD;
const EMAIL_FROM_NAME =
  process.env.EMAIL_FROM_NAME ||
  'Visage AI Consulting';
const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  'admin@visageaiconsulting.com';
const WHITEPAPER_PDF_URL =
  process.env.WHITEPAPER_V02_PDF_URL ||
  process.env.NEXT_PUBLIC_WHITEPAPER_V02_PDF_URL ||
  'https://www.visageaiconsulting.com/whitepapers/ebm-2025-v0.2.pdf';
const WHITEPAPER_REVISION_NOTICE_URL =
  process.env.WHITEPAPER_V02_NOTICE_URL ||
  process.env.NEXT_PUBLIC_WHITEPAPER_V02_NOTICE_URL ||
  'https://www.visageaiconsulting.com/whitepapers/ebm-2025-v0.2.html#revision-notice';
const CALENDLY_URL =
  process.env.CALENDLY_URL ||
  process.env.CALCOM_URL ||
  process.env.NEXT_PUBLIC_CAL_URL;

// Nodemailer transporterの設定
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD, // Gmail App Password
    },
  });
};

export interface WhitepaperLead {
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  leadId: string;
}

export interface DemoRequestLead {
  name: string;
  storeName: string;
  email: string;
  phone?: string;
  industry: string;
  message?: string;
  locale: "ja" | "en";
  leadId: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  landingPage?: string; // hs_analytics_first_url 相当
  referrer?: string;    // document.referrer — channel attribution fallback
}

export async function sendWhitepaperEmail(lead: WhitepaperLead): Promise<boolean> {
  try {
    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      console.error('Email credentials not configured');
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = EMAIL_USER;
    const fromName = EMAIL_FROM_NAME;
    const pdfUrl = WHITEPAPER_PDF_URL;
    const revisionNoticeUrl = WHITEPAPER_REVISION_NOTICE_URL;

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: lead.email,
      subject: 'Evidence-Based Marketing Playbook v0.2 is ready',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Evidence-Based Marketing Playbook</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin-bottom: 10px;">Evidence-Based Marketing Playbook</h1>
            <p style="color: #6b7280; font-size: 18px;">Public-data replication audit · Version 0.2 · Revised July 2026</p>
          </div>

          <!-- Greeting -->
          <div style="margin-bottom: 30px;">
            <p>Hi ${lead.name},</p>
            <p>Thank you for your interest in the Evidence-Based Marketing Playbook. Version 0.2 of the public-data replication audit is ready for download.</p>
            <p><strong>Revision notice:</strong> Version 0.2 withdraws five claims from v0.1 after a code audit. <a href="${revisionNoticeUrl}" style="color: #1e40af;">Read the notice.</a></p>
          </div>

          <!-- Key Findings Preview -->
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #1e40af; margin-bottom: 15px;">What the revision contains:</h2>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Duplication of Purchase:</strong> weighted MAD 0.015863, reported as a failed near-miss against the 0.015 gate</li>
              <li><strong>Double Jeopardy:</strong> Pearson r=0.627, with the failed stationarity check retained</li>
              <li><strong>Buyer frequency:</strong> R²=0.472 in Q4, restricted to a descriptive adjacent-quarter association</li>
              <li><strong>CEP and NBD:</strong> unsupported conclusions withdrawn after code and configuration audit</li>
            </ul>
          </div>

          <!-- Download Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}" 
               style="display: inline-block; background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              📥 Download Version 0.2
            </a>
          </div>

          <!-- Scope -->
          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #92400e; margin-bottom: 15px;">Scope of the report:</h3>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Exploratory replication audit, not a client case study</li>
              <li>No causal marketing or budget-allocation claims</li>
              <li>Methods and failure conditions stated explicitly</li>
              <li>Reproduction and publication checklist included</li>
            </ol>
          </div>

          <!-- Contact Info -->
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 14px; color: #6b7280;">
              Questions? Reply to this email or visit our <a href="https://www.visageaiconsulting.com" style="color: #1e40af;">website</a>.
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 15px;">
              This email was sent to ${lead.email} because you requested our Evidence-Based Marketing Playbook.<br>
              Lead ID: ${lead.leadId}
            </p>
          </div>

        </body>
        </html>
      `,
      text: `
Evidence-Based Marketing Playbook
Public-data replication audit - Version 0.2 - Revised July 2026

Hi ${lead.name},

Thank you for your interest in the Evidence-Based Marketing Playbook. Version 0.2 of the public-data replication audit is ready for download.

Revision notice: Version 0.2 withdraws five claims from v0.1 after a code audit.
Read the notice: ${revisionNoticeUrl}

What the revision contains:
- Duplication of Purchase: weighted MAD 0.015863, a failed near-miss against the 0.015 gate
- Double Jeopardy: Pearson r=0.627, with the failed stationarity check retained
- Buyer frequency: R²=0.472 in Q4, restricted to a descriptive adjacent-quarter association
- CEP and NBD: unsupported conclusions withdrawn after code and configuration audit

Download version 0.2: ${pdfUrl}

Scope:
1. Exploratory replication audit, not a client case study
2. No causal marketing or budget-allocation claims
3. Methods and failure conditions stated explicitly
4. Reproduction and publication checklist included

Questions? Reply to this email or visit our website: https://www.visageaiconsulting.com

This email was sent to ${lead.email} because you requested our Evidence-Based Marketing Playbook.
Lead ID: ${lead.leadId}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Whitepaper email sent to ${lead.email} (Lead ID: ${lead.leadId})`);
    return true;

  } catch (error) {
    console.error('❌ Email sending error:', error);
    return false;
  }
}

export async function sendInternalNotification(lead: WhitepaperLead): Promise<boolean> {
  try {
    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      console.error('Email credentials not configured');
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = EMAIL_USER;
    const fromName = EMAIL_FROM_NAME;
    const adminEmail = ADMIN_EMAIL;

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      subject: `🎯 New Whitepaper Lead: ${lead.company}`,
      html: `
        <h2>New Whitepaper Lead</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Company:</strong> ${lead.company}</p>
        <p><strong>Role:</strong> ${lead.role}</p>
        <p><strong>Industry:</strong> ${lead.industry}</p>
        <p><strong>Lead ID:</strong> ${lead.leadId}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Internal notification sent for lead: ${lead.leadId}`);
    return true;

  } catch (error) {
    console.error('❌ Internal notification error:', error);
    return false;
  }
}

export async function sendDemoRequestEmail(lead: DemoRequestLead): Promise<boolean> {
  try {
    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      console.error("Email credentials not configured");
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = EMAIL_USER;
    const fromName = EMAIL_FROM_NAME;
    const scheduleUrl =
      CALENDLY_URL ||
      "https://www.visageaiconsulting.com/ja/contact";

    const subject =
      lead.locale === "ja"
        ? "【Visage AI】無料デモのお申し込みありがとうございます"
        : "Thanks for your Visage AI demo request";

    const bodyJa = `
${lead.name} 様

Visage AI の無料デモにお申し込みいただきありがとうございます。
以下のリンクから、ご都合の良い日時をお選びください。

${scheduleUrl}

お問い合わせ内容:
${lead.message || "(なし)"}

--
Visage AI Consulting
Lead ID: ${lead.leadId}
`;

    const bodyEn = `
Hi ${lead.name},

Thank you for requesting a Visage AI demo.
Please choose your preferred slot from the link below:

${scheduleUrl}

Your message:
${lead.message || "(none)"}

--
Visage AI Consulting
Lead ID: ${lead.leadId}
`;

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: lead.email,
      subject,
      text: lead.locale === "ja" ? bodyJa : bodyEn,
    });

    return true;
  } catch (error) {
    console.error("❌ Demo request email sending error:", error);
    return false;
  }
}

export async function sendDemoRequestInternalNotification(
  lead: DemoRequestLead,
): Promise<boolean> {
  try {
    if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
      console.error("Email credentials not configured");
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = EMAIL_USER;
    const fromName = EMAIL_FROM_NAME;
    const adminEmail = ADMIN_EMAIL;

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      subject: `📅 New Demo Request: ${lead.storeName}`,
      text: `
Lead ID: ${lead.leadId}
Name: ${lead.name}
Store: ${lead.storeName}
Email: ${lead.email}
Phone: ${lead.phone || "(none)"}
Industry: ${lead.industry}
Locale: ${lead.locale}
UTM Source: ${lead.utmSource || "(none)"}
UTM Medium: ${lead.utmMedium || "(none)"}
UTM Campaign: ${lead.utmCampaign || "(none)"}
Message: ${lead.message || "(none)"}
Timestamp: ${new Date().toISOString()}
`,
    });

    return true;
  } catch (error) {
    console.error("❌ Demo request internal notification error:", error);
    return false;
  }
}
