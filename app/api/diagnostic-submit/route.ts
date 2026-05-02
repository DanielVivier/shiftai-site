import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Task {
  name: string;
  hours: number;
  zone: string | null;
  hoursSaved: number;
}

interface DiagnosticPayload {
  tasks: Task[];
  totals: { hoursSaved: number; sweetSpot: string };
  contact: { name?: string; email?: string; whatsapp?: string };
}

const ZONE_LABELS: Record<string, string> = {
  br: 'BR · Autonomous',
  tr: 'TR · On-Demand',
  bl: 'BL · On-Demand',
  tl: 'TL · Human-Led',
};

export async function POST(request: Request) {
  try {
    const payload: DiagnosticPayload = await request.json();
    const { tasks, totals, contact } = payload;

    const displayName = contact?.name || 'anonymous';

    const rows = tasks
      .map(
        (t) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e8e8e4; font-size: 14px;">${t.name}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e8e8e4; font-size: 14px; text-align: center;">${t.hours}h</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e8e8e4; font-size: 14px;">${t.zone ? ZONE_LABELS[t.zone] ?? t.zone : '–'}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e8e8e4; font-size: 14px; text-align: right; font-weight: 600;">${t.hoursSaved.toFixed(1)}h saved</td>
        </tr>
      `
      )
      .join('');

    const html = `
      <div style="font-family: 'Inter', sans-serif; max-width: 680px; padding: 32px; background: #fafaf7; border: 2px solid #141414;">
        <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 8px;">Diagnostic submission</h2>
        <p style="font-size: 14px; color: #8a8a83; margin: 0 0 24px;">
          From: <strong>${displayName}</strong>
          ${contact?.email ? ` · <a href="mailto:${contact.email}">${contact.email}</a>` : ''}
          ${contact?.whatsapp ? ` · WhatsApp: ${contact.whatsapp}` : ''}
        </p>

        <table style="width: 100%; border-collapse: collapse; border: 2px solid #141414; font-size: 14px;">
          <thead>
            <tr style="background: #141414; color: #fafaf7;">
              <th style="padding: 8px 12px; text-align: left; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;">Task</th>
              <th style="padding: 8px 12px; text-align: center; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;">Hrs/wk</th>
              <th style="padding: 8px 12px; text-align: left; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;">Zone</th>
              <th style="padding: 8px 12px; text-align: right; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;">Saved</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #fff3a3; border: 2px solid #141414;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a8a83; margin-bottom: 4px;">Verdict</div>
          <div style="font-size: 18px; font-weight: 800;">
            Sweet spot is ${totals.sweetSpot} AI employees — about ${totals.hoursSaved} hours/week could come back to them.
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'ShiftAI Site <hello@shiftai.co.za>',
      to: 'daniel@shiftai.co.za',
      subject: `Diagnostic: ${displayName} — ${totals.hoursSaved}h/week potential`,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Diagnostic submit error:', err);
    return Response.json({ ok: false, error: 'Failed to send' }, { status: 500 });
  }
}
