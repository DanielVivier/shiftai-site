'use client';

import { useState } from 'react';
import Quadrant, { QUADRANT_DATA, type Zone, type QuadrantCell } from '@/components/Quadrant';

export default function FrameworkSection() {
  const [hovered, setHovered] = useState<Zone | null>(null);

  const hoveredCell: QuadrantCell | undefined = QUADRANT_DATA.find((c) => c.zone === hovered);

  return (
    <section id="sec-02" className="border-t-2 border-ink px-8 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="tiny-mono mb-4">02 · The Framework</div>
        <h2 className="font-sans text-2xl md:text-3xl font-bold leading-snug mb-2 max-w-xl">
          Every task in your business sits in one of four boxes.
        </h2>
        <p className="font-sans text-base text-grey-3 mb-12 max-w-lg">
          The AI Employee Quadrant. Two axes — repetition and judgment — and four zones. Hover any zone to see what kind of AI employee belongs there.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Quadrant */}
          <div className="shrink-0 overflow-x-auto">
            <Quadrant
              size={440}
              hovered={hovered}
              setHovered={setHovered}
              showLabels={true}
            />
          </div>

          {/* Side panel */}
          <div className="flex-1 border-2 border-ink p-6 min-h-[200px] lg:self-start">
            {hoveredCell ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-grey-3">
                    {hoveredCell.label}
                  </span>
                  <span className="font-sans font-bold text-xl">{hoveredCell.title}</span>
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-grey-3">
                  {hoveredCell.subtitle}
                </div>
                <p className="font-sans text-sm leading-relaxed text-ink">
                  {hoveredCell.body}
                </p>
                <div className="border-t border-dashed border-grey-2 pt-4">
                  <div className="tiny-mono mb-1">What I build here</div>
                  <div className="font-sans font-semibold text-sm">{hoveredCell.build}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <p className="font-sans text-sm text-grey-3 leading-relaxed">
                  Hover a zone to see what kind of AI employee belongs there, or who belongs there instead.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="tiny-mono">Type 01</div>
                    <div className="font-sans font-bold text-sm">On-Demand AI Employee</div>
                    <div className="font-sans text-xs text-grey-3">You send a task; they produce; you review.</div>
                  </div>
                  <div className="border-t border-dashed border-grey-2 pt-4 flex flex-col gap-1">
                    <div className="tiny-mono">Type 02</div>
                    <div className="font-sans font-bold text-sm">Autonomous AI Employee</div>
                    <div className="font-sans text-xs text-grey-3">Set up once; runs on schedule; you monitor.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
