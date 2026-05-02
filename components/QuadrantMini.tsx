type Zone = 'tl' | 'tr' | 'bl' | 'br';

export default function QuadrantMini({
  zone,
  sz = 36,
}: {
  zone: Zone;
  sz?: number;
}) {
  const cellSize = sz / 2;

  const cells: Zone[] = ['tl', 'tr', 'bl', 'br'];

  return (
    <div
      style={{ width: sz, height: sz }}
      className="border border-ink grid grid-cols-2 grid-rows-2 shrink-0"
    >
      {cells.map((cell) => (
        <div
          key={cell}
          style={{ width: cellSize, height: cellSize }}
          className={`border border-ink ${cell === zone ? 'bg-ink' : 'bg-paper'}`}
        />
      ))}
    </div>
  );
}
