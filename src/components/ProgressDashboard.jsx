import { Flame, Dumbbell, Clock, Target, Star } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import StatsCard from './StatsCard';
import ProgressBar from './ProgressBar';
import Calendar from './Calendar';
import Badges from './Badges';
import { useFitness } from '@/lib/FitnessContext';

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m`;
  return `${m}m`;
}

export default function ProgressDashboard() {
  const { stats, completed, routine } = useFitness();

  const weekData = routine.map((d) => {
    const count = completed.filter((c) => c.day === d.day).length;
    return { day: d.day.slice(0, 3), completati: count };
  });

  return (
    <section id="dashboard" className="scroll-mt-20">
      <div>
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
          Step 3
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">La tua Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">Monitora i progressi e resta costante.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard icon={Dumbbell} label="Allenamenti completati" value={stats.workouts} accent="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300" />
        <StatsCard icon={Flame} label="Giorni consecutivi" value={stats.streak} accent="bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300" />
        <StatsCard icon={Clock} label="Tempo totale" value={fmtTime(stats.totalTime)} accent="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300" />
        <StatsCard icon={Star} label="XP totali" value={stats.xp} accent="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Routine completata</h4>
            <span className="text-sm font-bold text-blue-600">{stats.routinePercent}%</span>
          </div>
          <ProgressBar value={stats.routinePercent} className="mt-3 h-3" />
          <p className="mt-2 text-xs text-muted-foreground">
            {stats.routinePercent === 100
              ? 'Hai completato tutta la routine settimanale! 🏆'
              : 'Completa tutti i 7 giorni per chiudere la settimana.'}
          </p>

          <div className="mt-6">
            <h4 className="font-semibold">Allenamenti per giorno</h4>
            <div className="mt-3 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', fontSize: 12 }}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Bar dataKey="completati" radius={[6, 6, 0, 0]}>
                    {weekData.map((entry, i) => (
                      <Cell key={i} fill={entry.completati > 0 ? '#16a34a' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <Calendar />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Badges />
        <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-600 to-emerald-500 p-5 text-white shadow-sm">
          <Target className="h-6 w-6" />
          <h4 className="mt-3 text-lg font-bold">Obiettivo settimanale</h4>
          <p className="mt-1 text-sm text-white/80">
            Cerca di completare almeno 5 sessioni a settimana per mantenere i progressi costanti.
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-white/80">Sessioni questa settimana</span>
            <span className="font-bold">{Math.min(stats.workouts, 7)}/7</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${Math.min(100, (Math.min(stats.workouts, 7) / 7) * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}