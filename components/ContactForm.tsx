'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, business, message }),
      });
      const data = await res.json();
      setStatus(data.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full border-2 border-ink rounded px-3 py-2.5 font-sans text-sm bg-paper text-ink placeholder-grey-3 focus:outline-none focus:border-pencil';

  if (status === 'ok') {
    return (
      <div className="border-2 border-ink rounded p-6 bg-highlight">
        <div className="font-sans font-bold text-base mb-1">Sent.</div>
        <div className="font-sans text-sm text-grey-3">
          Daniel will get back to you within a day or two.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="tiny-mono block mb-1.5" htmlFor="name">Your name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Jane Smith"
          required
        />
      </div>
      <div>
        <label className="tiny-mono block mb-1.5" htmlFor="business">Business</label>
        <input
          id="business"
          type="text"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          className={inputClass}
          placeholder="Acme Co."
        />
      </div>
      <div>
        <label className="tiny-mono block mb-1.5" htmlFor="message">
          What task should an AI employee take off your plate?
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="e.g. follow up unpaid invoices every Monday"
          required
        />
      </div>

      {status === 'error' && (
        <div className="font-sans text-sm text-accent-red">
          Something went wrong. Try emailing daniel@shiftai.co.za directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-sketch self-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Send →'}
      </button>
    </form>
  );
}
