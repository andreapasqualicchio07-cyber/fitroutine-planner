import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Loader2, Flame } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { useFitness } from '@/lib/FitnessContext';
import { cn } from '@/lib/utils';

const PERIODS = [
  { id: 'tutte', label: 'Tutte' },
  { id: 'giornaliera', label: 'Giornaliere' },
  { id: 'settimanale', label: 'Settimanali' },
  { id: 'mensile', label: 'Mensili' },
];

export default function ProSfide() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('tutte');
  const { toast } = useToast();
  const { stats } = useFitness();

  const load = () => base44.entities.Challenge.filter({ active: true }).then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const join = async (c) => {
    await base44.entities.Challenge.update(c.id, { participants: (c.participants || 0) + 1 });
    toast({ title: `Iscritto a ${c.title}! 🎯` });
    try {
      const me = await base44.auth.me();
      if (me?.email) {
        await base44.integrations.Core.SendEmail({
          to: me.email,
          subject: `Iscrizione alla sfida: ${c.title}`,
          body: `Ciao!\n\nTi sei iscritto alla sfida "${c.title}".\n\n${c.description}\n\nObiettivo: ${c.target_workouts} allenamenti in ${c.duration_days} giorni.\n\nBuona fortuna! 💪`
        });
      }
    } catch (e) { /* notifica email facoltativa */ }
    load();
  };

  const filtered = useMemo(
    () => period === 'tutte' ? items : items.filter((c) => (c.period || 'settimanale') === period),
    [items, period]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Sfide</h1>
      <p className="mt-1 text-sm text-muted-foreground">Giornaliere, settimanali e mensili. Sfida te stesso.</p>

      <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-sm">
        <div className="flex items-center gap-2"><Flame className="h-5 w-5" /><h3 className="font-bold">La tua sfida personale</h3></div>
        <p className="mt-1 text-sm text-white/90">{stats.workouts} allenamenti completati · {stats.streak} giorni consecutivi 🔥</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {PERIODS.map((p) => (
          <button key={p.id} onClick={() => setPeriod(p.id)}
            className={cn('rounded-xl px-4 py-2 text-sm font-medium transition-colors', period === p.id ? 'bg-blue-600 text-white shadow-sm' : 'border border-border bg-card text-muted-foreground hover:border-blue-400')}>
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          <Trophy className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-2">Nessuna sfida in questa categoria.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((c, i) => {
            const pct = Math.min(100, Math.round((Math.min(stats.workouts, c.target_workouts) / c.target_workouts) * 100));
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{c.emoji}</span>
                    <div>
                      <h3 className="font-semibold">{c.title}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{c.period || 'settimanale'} · {c.duration_days} giorni</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"><Users className="h-3 w-3" /> {c.participants || 0}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Target className="h-3.5 w-3.5" /> {c.target_workouts} workout</span>
                  <span className="font-semibold">{pct}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <button onClick={() => join(c)} className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Partecipa
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}