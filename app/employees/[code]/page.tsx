import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllEmployeeSlugs, getEmployee } from '@/lib/employees';
import QuadrantMini from '@/components/QuadrantMini';
import StatusBadge from '@/components/StatusBadge';

export async function generateStaticParams() {
  const slugs = getAllEmployeeSlugs();
  return slugs.map((code) => ({ code }));
}

const WHATSAPP_LINK =
  'https://wa.me/27695371805?text=Hi%20Daniel%2C%20I%27d%20like%20to%20talk%20about%20building%20an%20AI%20employee.';

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-sans font-bold text-xl mt-10 mb-3 border-b-2 border-ink pb-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-sans font-semibold text-base mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-sans text-base leading-relaxed text-grey-3 mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="flex flex-col gap-2 mb-4 pl-0 list-none" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-sans text-sm flex items-start gap-2 before:content-['✓'] before:text-highlight before:font-bold before:shrink-0" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="font-hand text-2xl text-ink leading-snug border-l-4 border-highlight pl-5 my-8"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-ink" {...props} />
  ),
};

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const employee = getEmployee(code);
  if (!employee) notFound();

  return (
    <main className="min-h-screen bg-paper">
      {/* Back */}
      <div className="border-b-2 border-ink px-8 md:px-16 py-4 flex items-center justify-between">
        <Link
          href="/#sec-04"
          className="font-mono text-xs text-grey-3 hover:text-ink uppercase tracking-wider no-underline flex items-center gap-2"
        >
          ← Back to workshop floor
        </Link>
        <span className="font-sans font-black text-base">
          ShiftAI<span className="text-accent-red">.</span>
        </span>
      </div>

      {/* Hero band */}
      <div className="border-b-2 border-ink px-8 md:px-16 py-16">
        <div className="max-w-4xl">
          {/* Code + mini quadrant + status */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-grey-3 uppercase tracking-widest">{employee.code}</span>
            <QuadrantMini zone={employee.zone} sz={28} />
            <StatusBadge status={employee.status} />
          </div>

          {/* Name */}
          <h1
            className="font-sans font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            {employee.name}
          </h1>

          {/* Role + employer */}
          <div className="font-sans text-base text-grey-3 mb-1">{employee.role}</div>
          <div className="font-mono text-xs text-grey-3 uppercase tracking-widest mb-8">
            For {employee.employer}
          </div>

          {/* Savings */}
          <div className="flex flex-col gap-1">
            <div className="tiny-mono">Projected savings</div>
            <div className="font-sans font-extrabold text-3xl">{employee.savings}</div>
          </div>
        </div>
      </div>

      {/* MDX body */}
      <div className="px-8 md:px-16 py-16 max-w-3xl">
        <MDXRemote source={employee.content} components={mdxComponents} />
      </div>

      {/* CTA band */}
      <div className="border-t-2 border-ink bg-highlight px-8 md:px-16 py-16">
        <div className="max-w-4xl flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div>
            <h2 className="font-sans font-black text-2xl mb-1">Want one of these for your business?</h2>
            <p className="font-sans text-sm text-grey-3">Tell Daniel what you want to automate.</p>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-sketch shrink-0">
            Build me an AI employee →
          </a>
        </div>
      </div>
    </main>
  );
}
