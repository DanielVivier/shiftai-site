import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, business, message } = await request.json();

    if (!name || !message) {
      return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const html = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; padding: 32px; background: #fafaf7; border: 2px solid #141414;">
        <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 24px;">New contact from ShiftAI site</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a8a83; width: 100px;">Name</td>
            <td style="padding: 8px 0; font-size: 15px;">${name}</td>
          </tr>
          ${business ? `
          <tr>
            <td style="padding: 8px 0; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a8a83;">Business</td>
            <td style="padding: 8px 0; font-size: 15px;">${business}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a8a83; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; font-size: 15px; line-height: 1.6;">${message}</td>
          </tr>
        </table>
      </div>
    `;

    await resend.emails.send({
      from: 'ShiftAI Site <hello@shiftai.co.za>',
      to: 'daniel@shiftai.co.za',
      subject: `Contact form: ${name}`,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return Response.json({ ok: false, error: 'Failed to send' }, { status: 500 });
  }
}
