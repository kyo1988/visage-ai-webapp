import nodemailer from 'nodemailer';

// Nodemailer transporterの設定
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD, // Gmail App Password
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
}

export async function sendWhitepaperEmail(lead: WhitepaperLead): Promise<boolean> {
  try {
    if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD) {
      console.error('Email credentials not configured');
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_USER;
    const fromName = process.env.NEXT_PUBLIC_EMAIL_FROM_NAME || 'Visage AI Consulting';
    const pdfUrl = process.env.NEXT_PUBLIC_WHITEPAPER_PDF_URL || 'https://www.visageaiconsulting.com/whitepapers/ebm-2025-v0.1.pdf';

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: lead.email,
      subject: 'Your Evidence-Based Marketing Playbook is Ready! 📊',
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
            <p style="color: #6b7280; font-size: 18px;">Executive Preview v0.1</p>
          </div>

          <!-- Greeting -->
          <div style="margin-bottom: 30px;">
            <p>Hi ${lead.name},</p>
            <p>Thank you for your interest in our Evidence-Based Marketing Playbook! Your copy is ready for download.</p>
          </div>

          <!-- Key Findings Preview -->
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #1e40af; margin-bottom: 15px;">What's Inside:</h2>
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>Entry Situations:</strong> 38% → 52% improvement in weak moments</li>
              <li><strong>Heavy Buyers:</strong> Correlation analysis reveals operational signals</li>
              <li><strong>Top Quarter Response:</strong> ~47% of repeat purchase explained</li>
              <li><strong>Repertoire Behavior:</strong> Near-pass validation for market dynamics</li>
            </ul>
          </div>

          <!-- Download Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}" 
               style="display: inline-block; background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              📥 Download Your Whitepaper
            </a>
          </div>

          <!-- Next Steps -->
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #059669; margin-bottom: 15px;">Next Steps:</h3>
            <ol style="margin: 0; padding-left: 20px;">
              <li>Review the 14-day implementation checklist</li>
              <li>Focus on your five weakest entry situations</li>
              <li>Set up measurement for the top quarter of buyers</li>
              <li>Monitor heavy-buyer behavior changes</li>
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
Evidence-Based Marketing Playbook - Executive Preview v0.1

Hi ${lead.name},

Thank you for your interest in our Evidence-Based Marketing Playbook! Your copy is ready for download.

What's Inside:
- Entry Situations: 38% → 52% improvement in weak moments
- Heavy Buyers: Correlation analysis reveals operational signals  
- Top Quarter Response: ~47% of repeat purchase explained
- Repertoire Behavior: Near-pass validation for market dynamics

Download your whitepaper: ${pdfUrl}

Next Steps:
1. Review the 14-day implementation checklist
2. Focus on your five weakest entry situations
3. Set up measurement for the top quarter of buyers
4. Monitor heavy-buyer behavior changes

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
    if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD) {
      console.error('Email credentials not configured');
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_USER;
    const fromName = process.env.NEXT_PUBLIC_EMAIL_FROM_NAME || 'Visage AI Consulting';
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@visageaiconsulting.com';

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
    if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD) {
      console.error("Email credentials not configured");
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_USER;
    const fromName = process.env.NEXT_PUBLIC_EMAIL_FROM_NAME || "Visage AI Consulting";
    const scheduleUrl =
      process.env.NEXT_PUBLIC_CAL_URL ||
      process.env.CALCOM_URL ||
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
    if (!process.env.NEXT_PUBLIC_EMAIL_USER || !process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD) {
      console.error("Email credentials not configured");
      return false;
    }

    const transporter = createTransporter();
    const fromEmail = process.env.NEXT_PUBLIC_EMAIL_USER;
    const fromName = process.env.NEXT_PUBLIC_EMAIL_FROM_NAME || "Visage AI Consulting";
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@visageaiconsulting.com";

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
