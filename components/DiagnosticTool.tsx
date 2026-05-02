'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Zone } from '@/components/Quadrant';

interface Task {
  id: string;
  name: string;
  hours: number | '';
  repeats: boolean | null;
  judgment: boolean | null;
}

function getZone(task: Task): Zone | null {
  if (task.repeats === null || task.judgment === null) return null;
  if (task.repeats && !task.judgment) return 'br';
  if (task.repeats && task.judgment) return 'tr';
  if (!task.repeats && !task.judgment) return 'bl';
  return 'tl';
}

function getHoursSaved(task: Task): number {
  const zone = getZone(task);
  const hours = typeof task.hours === 'number' ? task.hours : 0;
  if (zone === 'br') return hours;
  if (zone === 'tr' || zone === 'bl') return hours * 0.5;
  return 0;
}

function isComplete(task: Task): boolean {
  return (
    task.name.trim() !== '' &&
    task.hours !== '' &&
    task.repeats !== null &&
    task.judgment !== null
  );
}

function newTask(): Task {
  return { id: Math.random().toString(36).slice(2), name: '', hours: '', repeats: null, judgment: null };
}

const STORAGE_KEY = 'shiftai-diagnostic-v1';
const MAX_TASKS = 8;

const ZONE_LABELS: Record<Zone, string> = {
  br: 'Autonomous',
  tr: 'On-Demand',
  bl: 'On-Demand',
  tl: 'Human-Led',
};

const ZONE_COLORS: Record<Zone, string> = {
  br: '#fff3a3',
  tr: '#e8e8e4',
  bl: '#e8e8e4',
  tl: '#fafaf7',
};

function MiniQuadrantLive({ tasks }: { tasks: Task[] }) {
  const completedByZone: Record<Zone, number> = { br: 0, tr: 0, bl: 0, tl: 0 };
  tasks.filter(isComplete).forEach((t) => {
    const z = getZone(t);
    if (z) completedByZone[z]++;
  });

  const maxCount = Math.max(...Object.values(completedByZone), 1);

  const Cell = ({ zone, label }: { zone: Zone; label: string }) => {
    const count = completedByZone[zone];
    const opacity = count === 0 ? 0.15 : 0.2 + (count / maxCount) * 0.8;
    return (
      <div
        className="border border-grey-3 flex flex-col items-center justify-center gap-1 relative"
        style={{ background: zone === 'br' ? `rgba(255,243,163,${opacity})` : `rgba(232,232,228,${opacity})` }}
      >
        <div className="font-mono text-[8px] text-grey-2 uppercase tracking-wider absolute top-1.5 left-2">{label}</div>
        {count > 0 && (
          <div className="font-sans font-bold text-lg text-paper">{count}</div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 border-2 border-grey-3" style={{ width: 200, height: 200 }}>
      <Cell zone="tl" label="TL" />
      <Cell zone="tr" label="TR" />
      <Cell zone="bl" label="BL" />
      <Cell zone="br" label="BR ★" />
    </div>
  );
}

function YesNoToggle({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-1">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={`px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider border transition-colors ${
            value === v
              ? 'bg-paper text-ink border-paper'
              : 'bg-transparent text-grey-2 border-grey-3 hover:border-grey-2'
          }`}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  );
}

export default function DiagnosticTool() {
  const [tasks, setTasks] = useState<Task[]>(() => [newTask()]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
        }
      }
    } catch {}
    setLoaded(true);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks, loaded]);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addTask = useCallback(() => {
    if (tasks.length >= MAX_TASKS) return;
    setTasks((prev) => [...prev, newTask()]);
  }, [tasks.length]);

  const completedTasks = tasks.filter(isComplete);
  const totalHoursSaved = completedTasks.reduce((sum, t) => sum + getHoursSaved(t), 0);
  const canSend = completedTasks.length >= 3;

  // Determine verdict
  const brCount = completedTasks.filter((t) => getZone(t) === 'br').length;
  const trBlCount = completedTasks.filter((t) => ['tr', 'bl'].includes(getZone(t) ?? '')).length;
  const sweetSpot = brCount >= trBlCount ? 'Autonomous' : 'On-Demand';

  const buildWhatsAppMessage = () => {
    const lines = completedTasks.map((t) => {
      const zone = getZone(t);
      const label = zone ? ZONE_LABELS[zone] : '?';
      return `• ${t.name} — ${label} (${getHoursSaved(t).toFixed(1)}hrs saved)`;
    });
    const msg = [
      'Hi Daniel, here is my work map from the ShiftAI diagnostic:',
      '',
      ...lines,
      '',
      `Total potential: ~${Math.round(totalHoursSaved)} hrs/week back to me.`,
    ].join('\n');
    return `https://wa.me/27695371805?text=${encodeURIComponent(msg)}`;
  };

  const handleSend = async () => {
    const waLink = buildWhatsAppMessage();
    window.open(waLink, '_blank');

    // Also POST to API
    try {
      const payload = {
        tasks: completedTasks.map((t) => ({
          name: t.name,
          hours: t.hours,
          zone: getZone(t),
          hoursSaved: getHoursSaved(t),
        })),
        totals: { hoursSaved: Math.round(totalHoursSaved), sweetSpot },
        contact: {},
      };
      await fetch('/api/diagnostic-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {}
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Left — task list */}
      <div className="flex-1 flex flex-col gap-4">
        {tasks.map((task) => {
          const zone = getZone(task);
          return (
            <div key={task.id} className="border border-grey-3 rounded p-4 flex flex-col gap-3">
              {/* Task name + remove */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => updateTask(task.id, { name: e.target.value })}
                  placeholder="Task name (e.g. follow up unpaid invoices)"
                  className="flex-1 bg-transparent border-b border-grey-3 py-1 font-sans text-sm text-paper placeholder-grey-3 focus:outline-none focus:border-grey-2"
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    className="text-grey-3 hover:text-paper font-mono text-lg leading-none"
                    aria-label="Remove task"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-grey-3 uppercase tracking-wider whitespace-nowrap">
                  Hours / week
                </span>
                <input
                  type="number"
                  min={0}
                  max={80}
                  value={task.hours}
                  onChange={(e) => updateTask(task.id, { hours: e.target.value === '' ? '' : Number(e.target.value) })}
                  className="w-20 bg-transparent border-b border-grey-3 py-1 font-mono text-sm text-paper text-center focus:outline-none focus:border-grey-2"
                  placeholder="0"
                />
              </div>

              {/* Does it repeat? */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] text-grey-3 uppercase tracking-wider whitespace-nowrap">
                  Does it repeat?
                </span>
                <YesNoToggle
                  value={task.repeats}
                  onChange={(v) => updateTask(task.id, { repeats: v })}
                />
              </div>

              {/* Does it need judgment? */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] text-grey-3 uppercase tracking-wider whitespace-nowrap">
                  Does it need judgment?
                </span>
                <YesNoToggle
                  value={task.judgment}
                  onChange={(v) => updateTask(task.id, { judgment: v })}
                />
              </div>

              {/* Zone indicator */}
              {zone && (
                <div
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded self-start"
                  style={{ background: ZONE_COLORS[zone] }}
                >
                  <span className="font-mono text-[9px] font-bold text-ink uppercase tracking-widest">{zone.toUpperCase()}</span>
                  <span className="font-sans text-xs text-ink font-semibold">{ZONE_LABELS[zone]}</span>
                  {typeof task.hours === 'number' && task.hours > 0 && (
                    <span className="font-mono text-[9px] text-ink opacity-70">
                      · {getHoursSaved(task).toFixed(1)}h saved
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add task */}
        {tasks.length < MAX_TASKS && (
          <button
            type="button"
            onClick={addTask}
            className="border border-dashed border-grey-3 rounded px-4 py-3 font-mono text-xs text-grey-3 hover:border-grey-2 hover:text-grey-2 transition-colors text-left"
          >
            + Add a task
          </button>
        )}
      </div>

      {/* Right — live quadrant + summary */}
      <div className="lg:w-72 flex flex-col gap-6 lg:sticky lg:top-24">
        <MiniQuadrantLive tasks={tasks} />

        {/* Summary */}
        {completedTasks.length > 0 && (
          <div className="border border-grey-3 rounded p-4 flex flex-col gap-3">
            {canSend ? (
              <>
                <div className="font-sans text-sm text-paper leading-relaxed">
                  Your sweet spot is{' '}
                  <strong>{sweetSpot} AI employees</strong> — about{' '}
                  <strong>{Math.round(totalHoursSaved)} hours/week</strong> could come back to you.
                </div>
                <div className="font-mono text-[9px] text-grey-3 uppercase tracking-wider">
                  Autonomous tasks counted in full · On-Demand at 50% (you still press the button)
                </div>
                <button
                  type="button"
                  onClick={handleSend}
                  className="btn-sketch text-sm self-start"
                  style={{ background: '#fafaf7', color: '#141414', borderColor: '#fafaf7' }}
                >
                  Send my map to Daniel →
                </button>
              </>
            ) : (
              <div className="font-sans text-sm text-grey-3">
                Map at least {3 - completedTasks.length} more task{3 - completedTasks.length !== 1 ? 's' : ''} to send →
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
