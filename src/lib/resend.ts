import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConsultationEmail({
  to,
  name,
  date,
  time,
  projectType,
}: {
  to: string;
  name: string;
  date: string;
  time: string;
  projectType: string;
}) {
  try {
    const data = await resend.emails.send({
      from: 'G3 Architects Studio <onboarding@resend.dev>',
      to: [to],
      subject: `Confirmed: G3 Architectural Consultation for ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px;">
          <div style="margin-bottom: 24px; border-bottom: 2px solid #1c1917; padding-bottom: 12px;">
            <h1 style="font-size: 24px; letter-spacing: -0.5px; color: #1c1917; margin: 0;">G3 ARCHITECTS</h1>
            <p style="font-size: 13px; color: #78716c; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Studio Consultation Confirmation</p>
          </div>
          <p style="font-size: 16px; color: #292524; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
          <p style="font-size: 15px; color: #44403c; line-height: 1.6;">
            Your architectural consultation session with our design principals has been recorded.
          </p>
          <div style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 6px; padding: 20px; margin: 24px 0;">
            <p style="margin: 6px 0; font-size: 14px; color: #78716c;">Project Category: <strong style="color: #1c1917;">${projectType}</strong></p>
            <p style="margin: 6px 0; font-size: 14px; color: #78716c;">Preferred Date: <strong style="color: #1c1917;">${date}</strong></p>
            <p style="margin: 6px 0; font-size: 14px; color: #78716c;">Time Slot: <strong style="color: #1c1917;">${time}</strong></p>
          </div>
          <p style="font-size: 14px; color: #57534e; line-height: 1.5;">
            Our team is preparing initial zoning analyses and precedent references ahead of our meeting. If you need to attach CAD drawings or sketches, you can access your client portal.
          </p>
          <p style="font-size: 14px; color: #1c1917; font-weight: 600; margin-top: 32px;">G3 Architecture & Urban Research Studio</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send consultation email:', error);
    return { success: false, error };
  }
}
