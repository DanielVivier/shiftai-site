'use client';

export type Zone = 'tl' | 'tr' | 'bl' | 'br';

export interface QuadrantCell {
  zone: Zone;
  label: string;
  title: string;
  subtitle: string;
  body: string;
  build: string;
  defaultYellow?: boolean;
}

export const QUADRANT_DATA: QuadrantCell[] = [
  {
    zone: 'tl',
    label: 'TL',
    title: 'Human-Led',
    subtitle: 'Low repetition · High judgment',
    body: 'Strategy, creative direction, relationships, negotiation. AI assists; the human owns the work.',
    build: 'No AI employee built here.',
  },
  {
    zone: 'tr',
    label: 'TR',
    title: 'On-Demand',
    subtitle: 'High repetition · High judgment',
    body: 'Proposals, complex client comms, application reviews, briefs. You send the task; AI does the heavy lifting; you stay in the loop.',
    build: 'On-Demand AI employee.',
  },
  {
    zone: 'bl',
    label: 'BL',
    title: 'On-Demand',
    subtitle: 'Low repetition · Low judgment',
    body: 'One-off formatting, transcribing a recording, summarising a doc. Push the task to the AI when needed.',
    build: 'On-Demand AI employee.',
  },
  {
    zone: 'br',
    label: 'BR',
    title: 'Autonomous',
    subtitle: 'High repetition · Low judgment',
    body: 'Booking reminders, invoice follow-ups, daily reports, review requests. Fully delegated; runs without being asked.',
    build: 'Autonomous AI employee. The sweet spot.',
    defaultYellow: true,
  },
];

interface QuadrantProps {
  size?: number;
  hovered: Zone | null;
  setHovered: (zone: Zone | null) => void;
  showLabels?: boolean;
}

export default function Quadrant({
  size = 460,
  hovered,
  setHovered,
  showLabels = true,
}: QuadrantProps) {
  const cellSize = size / 2;

  const getCellStyle = (cell: QuadrantCell) => {
    const isHovered = hovered === cell.zone;
    if (isHovered) {
      return { background: '#141414', color: '#fafaf7' };
    }
    if (cell.defaultYellow) {
      return { background: '#fff3a3', color: '#141414' };
    }
    return { background: '#fafaf7', color: '#141414' };
  };

  return (
    <div className="relative" style={{ width: size + 40, paddingLeft: 40 }}>
      {/* Y-axis label */}
      <div
        className="absolute left-0 font-mono text-[10px] font-semibold tracking-widest uppercase text-grey-3"
        style={{
          top: size / 2,
          transform: 'rotate(-90deg) translateX(-50%)',
          transformOrigin: 'left center',
          whiteSpace: 'nowrap',
        }}
      >
        ◀ JUDGMENT ▶
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 grid-rows-2 border-2 border-ink"
        style={{ width: size, height: size }}
      >
        {QUADRANT_DATA.map((cell) => (
          <div
            key={cell.zone}
            className="border border-ink p-4 cursor-pointer transition-colors duration-150 relative"
            style={getCellStyle(cell)}
            onMouseEnter={() => setHovered(cell.zone)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Zone label */}
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase opacity-50 mb-1">
              {cell.label}
            </div>
            <div className="font-sans font-bold text-sm leading-tight">
              {cell.title}
            </div>
            {showLabels && (
              <>
                <div className="font-mono text-[9px] tracking-wide uppercase opacity-60 mt-1">
                  {cell.subtitle}
                </div>
                <div className="font-sans text-xs mt-2 leading-relaxed opacity-80">
                  {cell.body}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* X-axis label */}
      <div className="flex justify-end mt-1 pr-0">
        <span className="font-mono text-[10px] font-semibold tracking-widest uppercase text-grey-3">
          ◀ REPETITION ▶
        </span>
      </div>
    </div>
  );
}
