import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shuffle, Check, CheckCircle2, Sparkles, Crown } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import { LEVELS } from '@/lib/fitnessData';
import { useFitness } from '@/lib/FitnessContext';
import { usePro } from '@/lib/ProContext';
import Paywall from './Paywall';
import { useToast } from '@/components/ui/use-toast';
import { MOTIVATIONS } from '@/lib/fitnessData';
import { cn } from '@/lib/utils';

export default function WeeklyRoutine() {
  const { routine, level, setLevel, regenerate, isDayCompleted, completeWorkout } = useFitness();
  const { isPro } = usePro();
  const [query, setQuery] = useState('');
  const [paywall, setPaywall] = useState(null);
  const { toast } = useToast();

  const handleLevel = (l) => {
    if (l.id === 'avanzato' && !isPro) { setPaywall('Livello Avanzato'); return; }
    setLevel(l.id);
  };
  const handleRegenerate = () => {
    if (!isPro) { setPaywall('Generazione di routine personalizzate'); return; }
    regenerate();
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return routine;
    const q = query.toLowerCase();
    return routine.map((d) => {
      if (d.type !== 'workout') return d;
      const exs = d.exercises.filter((e) => e.name.toLowerCase().includes(q));
      return { ...d, exercises: exs };
    });
  }, [routine, query]);

  const handleComplete = (dayName) => {
    const res = completeWorkout(dayName);
    if (res.alreadyDone) {
      toast({ title: 'Già completato', description: 'Hai già registrato questo allenamento oggi.' });
    } else {
      const msg = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
      toast({
        title: 'Allenamento completato! 🎉',
        description: `${msg}  +${res.xp} XP`,
      });
    }
  };

  return (
    <section id="routine" className="scroll-mt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            Step 2
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Routine Settimanale</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sette giorni bilanciati tra lavoro, recupero e riposo.</p>
        </div>
        <button
          onClick={handleRegenerate}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600"
        >
          <Shuffle className="h-4 w-4" /> Genera nuova routine
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca un esercizio..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500"
          />
        </div>
        <div className="flex rounded-xl border border-border bg-card p-1">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleLevel(l)}
              className={cn(
                'relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                level === l.id ? 'bg-blue-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {l.label}
              {l.id === 'avanzato' && !isPro && (
                <span className="ml-1 inline-flex items-center gap-0.5 rounded bg-amber-100 px-1 text-[9px] font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  <Crown className="h-2.5 w-2.5" />PRO
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filtered.map((d, idx) => {
          const completedToday = isDayCompleted(d.day);
          const empty = d.type === 'workout' && d.exercises.length === 0;
          return (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="rounded-2xl border border-border bg-background/50 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold">{d.day}</h3>
                  {completedToday && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <Check className="h-3 w-3" /> Fatto
                    </span>
                  )}
                </div>
                {d.type === 'workout' && !empty && (
                  <button
                    onClick={() => handleComplete(d.day)}
                    disabled={completedToday}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                      completedToday
                        ? 'cursor-default bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    )}
                  >
                    {completedToday ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                    {completedToday ? 'Completato' : 'Completa'}
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {d.type === 'workout' ? (
                  empty ? (
                    <p className="mt-3 text-sm text-muted-foreground">Nessun esercizio trovato per la ricerca.</p>
                  ) : (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {d.exercises.map((e) => (
                        <ExerciseCard key={e.name} exercise={e} />
                      ))}
                    </div>
                  )
                ) : (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                    <span className="text-2xl">{d.type === 'rest' ? '😴' : '🧘'}</span>
                    <div>
                      <p className="font-semibold">{d.label}</p>
                      <p className="text-sm text-muted-foreground">{d.desc}</p>
                      <button
                        onClick={() => handleComplete(d.day)}
                        disabled={completedToday}
                        className={cn(
                          'mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                          completedToday
                            ? 'cursor-default bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        )}
                      >
                        {completedToday ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                        {completedToday ? 'Completato' : 'Segna come fatto'}
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <Paywall open={!!paywall} feature={paywall} onClose={() => setPaywall(null)} />
    </section>
  );
}