import Link from 'next/link';
import QuadrantMini from './QuadrantMini';
import StatusBadge from './StatusBadge';

export interface Employee {
  code: string;
  name: string;
  role: string;
  employer: string;
  type: 'On-Demand' | 'Autonomous';
  zone: 'tl' | 'tr' | 'bl' | 'br';
  status: 'In design' | 'In build' | 'In trial' | 'Live';
  savings: string;
  comingSoon?: boolean;
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  if (employee.comingSoon) {
    return (
      <div className="border-2 border-dashed border-grey-2 rounded p-5 flex flex-col gap-2 min-h-[280px] items-center justify-center opacity-50">
        <div className="font-mono text-xs text-grey-3 uppercase tracking-widest">{employee.code}</div>
        <div className="font-sans text-sm text-grey-3">Coming soon</div>
      </div>
    );
  }

  return (
    <Link
      href={`/employees/${employee.code.toLowerCase()}`}
      className="group border-2 border-ink rounded p-5 flex flex-col gap-0 min-h-[280px] bg-paper no-underline text-ink transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-grey-3 uppercase tracking-wider">{employee.code}</span>
        <QuadrantMini zone={employee.zone} sz={32} />
      </div>

      {/* Name */}
      <div className="font-sans font-extrabold text-xl leading-tight">{employee.name}</div>

      {/* Role */}
      <div className="font-sans text-sm text-grey-3 mt-1">{employee.role}</div>

      <div className="flex-1" />

      {/* Employer */}
      <div className="border-t border-dashed border-grey-2 pt-3 mt-3">
        <div className="tiny-mono mb-1">For</div>
        <div className="font-sans font-semibold text-sm">{employee.employer}</div>
      </div>

      {/* Status + Type */}
      <div className="flex items-center gap-2 mt-3">
        <StatusBadge status={employee.status} />
        <span className="font-mono text-[10px] text-grey-3 uppercase tracking-wider">{employee.type}</span>
      </div>

      {/* Savings */}
      <div className="border-t-2 border-ink pt-3 mt-3">
        <div className="tiny-mono mb-1">Savings</div>
        <div className="font-sans font-extrabold text-lg leading-tight">{employee.savings}</div>
      </div>
    </Link>
  );
}
