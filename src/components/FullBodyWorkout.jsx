import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, RefreshCw, ChevronDown } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import { useFitness } from '@/lib/FitnessContext';
import { generateFullBodyRoutine, estimateDayDuration } from '@/lib/fitnessData';

export default function FullBodyWorkout() {
  const { goal, level, seed, regenerate } = useFitness();
  const [open, setOpen] = useState(false);
  const routine = generateFullBodyRoutine(goal, level, seed);
  const durSec = routine.reduce((a, e) => {
    const work = e.unit === 'sec' ? e.reps : e.reps * 2;
    return a + e.sets * (work + e.rest);
  }, 0);
  const durMin = Math.round(durSec / 60);

  return (
    <section id="fullbody">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Dumbbell className="h-6 w-6 text-blue-600" /> Allenamento per tutto il corpo
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Una sessione completa che attiva ogni gruppo muscolare · {routine.length} esercizi · ~{durMin} min</p>
        </div>
        <button onClick={regenerate} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-blue-400">
          <RefreshCw className="h-4 w-4" /> Rigenera
        </button>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        {open ? 'Nascondi esercizi' : 'Mostra esercizi'}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {routine.map((ex) => (
                <ExerciseCard key={ex.name} exercise={ex} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}