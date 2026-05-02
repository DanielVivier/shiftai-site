type Status = 'In design' | 'In build' | 'In trial' | 'Live';

const STATUS_STYLES: Record<Status, string> = {
  'In design': 'border-grey-3 text-grey-3 bg-transparent',
  'In build': 'border-ink text-ink bg-highlight',
  'In trial': 'border-ink text-ink bg-paper',
  'Live': 'border-ink text-paper bg-ink',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block border border-[1.5px] rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest uppercase ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
