'use client';

import { useState } from 'react';
import EmployeeCard, { type Employee } from '@/components/EmployeeCard';

const COMING_SOON: Employee[] = [
  { code: '04', name: '', role: '', employer: '', type: 'Autonomous', zone: 'br', status: 'In design', savings: '', comingSoon: true },
  { code: '05', name: '', role: '', employer: '', type: 'Autonomous', zone: 'br', status: 'In design', savings: '', comingSoon: true },
  { code: '06', name: '', role: '', employer: '', type: 'Autonomous', zone: 'br', status: 'In design', savings: '', comingSoon: true },
];

type Filter = 'All' | 'On-Demand' | 'Autonomous';

export default function GallerySection({ employees }: { employees: Employee[] }) {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = employees.filter((e) => filter === 'All' || e.type === filter);

  return (
    <section id="sec-04" className="border-t-2 border-ink px-8 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="tiny-mono mb-4">04 · The AI employees I'm busy building</div>
        <h2 className="headline text-4xl md:text-5xl lg:text-[56px] mb-2">
          The workshop floor.
        </h2>
        <p className="font-sans text-base text-grey-3 mb-8">
          Every build documented. Click any card for the full story.
        </p>

        {/* Filter row */}
        <div className="flex gap-2 mb-10">
          {(['All', 'On-Demand', 'Autonomous'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs font-semibold tracking-wider uppercase px-4 py-2 border-2 border-ink rounded transition-colors ${
                filter === f ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-grey-1'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((emp) => (
            <EmployeeCard key={emp.code} employee={emp} />
          ))}
          {filter === 'All' && COMING_SOON.map((emp) => (
            <EmployeeCard key={emp.code} employee={emp} />
          ))}
        </div>
      </div>
    </section>
  );
}
