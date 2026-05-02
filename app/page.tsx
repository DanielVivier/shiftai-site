import NavDropdown from '@/components/NavDropdown';
import FrameworkSection from '@/components/sections/FrameworkSection';
import GallerySection from '@/components/sections/GallerySection';
import DiagnosticTool from '@/components/DiagnosticTool';
import ContactForm from '@/components/ContactForm';
import { getAllEmployees } from '@/lib/employees';

const WHATSAPP_LINK =
  'https://wa.me/27695371805?text=Hi%20Daniel%2C%20I%27d%20like%20to%20talk%20about%20building%20an%20AI%20employee.';

export default function Home() {
  const employees = getAllEmployees();

  return (
    <main>
      <NavDropdown />

      {/* ── SEC 01 · HERO ────────────────────────────────────── */}
      <section id="sec-01" className="px-8 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Photo placeholder */}
          <div className="shrink-0">
            <div
              className="overflow-hidden border-2 border-ink placeholder"
              style={{ width: 200, height: 200, borderRadius: '50%' }}
            >
              <span className="text-xs text-grey-3 font-mono text-center">daniel.jpg</span>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <div className="tiny-mono mb-6">01 · Hi, I'm Daniel</div>
            <h1 className="headline text-4xl md:text-5xl lg:text-[56px] mb-8 max-w-2xl">
              I spent 12 years as a knowledge worker in luxury goods and banking.{' '}
              <span className="text-grey-3">
                I know what it feels like to waste your time on work that doesn&apos;t move the needle but still has to get done.
              </span>{' '}
              Now I build{' '}
              <span className="scribble">AI employees</span>{' '}
              for founder-led businesses so they can focus on the work that matters.
            </h1>
            <div className="flex flex-wrap gap-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-sketch">
                Build me an AI employee →
              </a>
              <a href="#sec-05" className="btn-sketch-ghost">
                Where can AI help me most?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEC 02 · FRAMEWORK ──────────────────────────────── */}
      <FrameworkSection />

      {/* ── SEC 03 · HOW TO THINK ABOUT IT ─────────────────── */}
      <section id="sec-03" className="border-t-2 border-ink px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="tiny-mono mb-4">03 · How to think about it</div>
          <h2 className="headline text-4xl md:text-5xl lg:text-[56px] mb-12 max-w-2xl">
            Think of it like hiring a junior. Train them. Check their work. Trust them more as they prove themselves.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-2 border-ink">
            {[
              { step: 'STEP 01', title: 'Train', body: 'You show them how the work gets done.' },
              { step: 'STEP 02', title: 'Supervise', body: 'Outputs reviewed before use. 2 to 4 weeks.' },
              { step: 'STEP 03', title: 'Trust', body: 'Quality consistent, they run on their own.' },
              { step: 'STEP 04', title: 'Free up', body: 'You focus on the work only you can do.' },
            ].map((card, i) => (
              <div
                key={card.step}
                className={`p-6 flex flex-col gap-3 ${i > 0 ? 'border-t-2 sm:border-t-0 sm:border-l-2 border-ink' : ''}`}
              >
                <div className="font-mono text-[10px] font-semibold tracking-widest uppercase text-grey-3">
                  {card.step}
                </div>
                <div className="font-sans font-bold text-lg">{card.title}</div>
                <div className="font-sans text-sm text-grey-3 leading-relaxed">{card.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEC 04 · GALLERY ─────────────────────────────────── */}
      <GallerySection employees={employees} />

      {/* ── SEC 05 · DIAGNOSTIC ──────────────────────────────── */}
      <section id="sec-05" className="bg-ink text-paper">
        <div className="px-8 md:px-16 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[11px] font-semibold tracking-widest uppercase text-grey-3 mb-4">
              05 · Where can AI help me most?
            </div>
            <h2 className="headline text-4xl md:text-5xl lg:text-[56px] mb-3 text-paper">
              Map your work. See where AI fits.
            </h2>
            <p className="font-sans text-base text-grey-2 mb-12 max-w-xl">
              List a handful of things your team did this week. Two questions per task. The quadrant fills itself in on the right.
            </p>
            <DiagnosticTool />
          </div>
        </div>
      </section>

      {/* ── SEC 06 · CONTACT ─────────────────────────────────── */}
      <section id="sec-06" className="border-t-2 border-ink px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="tiny-mono mb-4">06 · Get in touch</div>
          <h2 className="headline text-4xl md:text-5xl lg:text-[56px] mb-12 max-w-xl">
            Got an AI employee in mind? Tell me about it.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left — direct */}
            <div>
              <div className="font-sans font-bold text-base mb-6">Direct</div>
              <div className="flex flex-col gap-5 mb-8">
                <div>
                  <div className="tiny-mono mb-1.5">Email</div>
                  <a href="mailto:daniel@shiftai.co.za" className="font-sans font-semibold text-ink text-base">
                    daniel@shiftai.co.za
                  </a>
                </div>
                <div>
                  <div className="tiny-mono mb-1.5">WhatsApp</div>
                  <span className="font-sans font-semibold text-base">+27 69 537 1805</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sketch"
                >
                  Open WhatsApp →
                </a>
                <a href="mailto:daniel@shiftai.co.za" className="btn-sketch-ghost">
                  Email me
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="font-sans font-bold text-base mb-6">Or drop a line</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEC 07 · CLOSING CTA ─────────────────────────────── */}
      <section id="sec-07" className="bg-highlight border-t-2 border-ink px-8 md:px-16 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="headline text-4xl md:text-5xl lg:text-[56px] mb-4">
            Your next hire{' '}
            <em className="not-italic italic font-black">shouldn&apos;t be human.</em>
          </h2>
          <p className="font-sans text-base text-grey-3 mb-10 max-w-lg mx-auto">
            Most of what you&apos;d hire someone to do, an AI employee can already do, without sick days.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-sketch">
              Build me an AI employee →
            </a>
            <a href="#sec-05" className="btn-sketch-ghost">
              Where can AI help me most?
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t-2 border-ink px-8 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="font-sans font-black text-base">
            ShiftAI<span className="text-accent-red">.</span>
          </span>
          <span className="font-mono text-xs text-grey-3">
            Built by Daniel in Cape Town ·{' '}
            <a href="mailto:daniel@shiftai.co.za" className="text-grey-3 hover:text-ink">
              daniel@shiftai.co.za
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
