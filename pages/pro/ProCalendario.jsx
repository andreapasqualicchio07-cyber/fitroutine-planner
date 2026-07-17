import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export default function ProCalendario() {
  const [cursor, setCursor] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => { base44.entities.Workout.list().then(setWorkouts).catch(() => {}); }, []);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().toISOString().slice(0, 10);

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const byDate = {};
  workouts.forEach((w) => { if (w.date) { (byDate[w.date] = byDate[w.date] || []).push(w); } });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Calendario allenamenti</h1>
      <p className="mt-1 text-sm text-muted-foreground">Visualizza i tuoi workout pianificati.</p>

      <div className="mt-6 max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold capitalize">{cursor.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</h2>
          <div className="flex gap-1">
            <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {DAYS.map((d) => <div key={d} className="text-[10px] font-semibold uppercase text-muted-foreground">{d}</div>)}
          {cells.map((c, i) => {
            if (!c) return <div key={i} />;
            const ds = new Date(year, month, c).toISOString().slice(0, 10);
            const ws = byDate[ds] || [];
            const isToday = ds === today;
            return (
              <div key={i} className={cn('flex min-h-[52px] flex-col items-center rounded-lg border p-1 text-xs', ws.length ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40' : 'border-transparent', isToday && 'ring-1 ring-blue-500')}>
                <span className="font-medium">{c}</span>
                {ws.length > 0 && (
                  <div className="mt-auto flex flex-wrap justify-center gap-0.5">
                    {ws.slice(0, 4).map((w, k) => (
                      <span key={k} className={cn('h-1.5 w-1.5 rounded-full', w.completed ? 'bg-emerald-500' : 'bg-blue-500')} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Pianificato</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Completato</span>
        </div>
      </div>

      <div className="mt-6 max-w-2xl">
        <h3 className="flex items-center gap-2 font-semibold"><CalIcon className="h-4 w-4" /> Prossimi workout</h3>
        <div className="mt-3 space-y-2">
          {workouts.filter((w) => w.date && w.date >= today && !w.completed).slice(0, 5).map((w) => (
            <div key={w.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm">
              <span className="font-medium">{w.title}</span>
              <span className="text-muted-foreground">{w.date} · {w.duration_min} min</span>
            </div>
          ))}
          {workouts.filter((w) => w.date && w.date >= today && !w.completed).length === 0 && (
            <p className="text-sm text-muted-foreground">Nessun workout in programma. Aggiungine dalla sezione Workout.</p>
          )}
        </div>
      </div>
    </div>
  );
}