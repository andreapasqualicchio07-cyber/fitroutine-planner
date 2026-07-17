import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFitness } from '@/lib/FitnessContext';
import { cn } from '@/lib/utils';

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export default function Calendar() {
  const { completed } = useFitness();
  const [cursor, setCursor] = useState(new Date());
  const dateSet = new Set(completed.map((c) => c.date));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = new Date(year, month, d).toISOString().slice(0, 10);
    cells.push({ day: d, ds });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">
          {cursor.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {DAYS.map((d) => (
          <div key={d} className="text-[10px] font-semibold uppercase text-muted-foreground">{d}</div>
        ))}
        {cells.map((c, i) => {
          if (!c) return <div key={i} />;
          const done = dateSet.has(c.ds);
          const isToday = c.ds === today;
          return (
            <div
              key={i}
              className={cn(
                'flex aspect-square items-center justify-center rounded-lg text-xs font-medium transition-colors',
                done
                  ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white'
                  : 'text-muted-foreground hover:bg-muted',
                isToday && !done && 'ring-1 ring-blue-400'
              )}
            >
              {c.day}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-3 w-3 rounded bg-gradient-to-br from-blue-600 to-emerald-500" />
        Giorno completato
      </div>
    </div>
  );
}