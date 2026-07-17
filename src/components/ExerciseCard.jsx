import { useState } from 'react';
import { motion } from 'framer-motion';
import { StickyNote } from 'lucide-react';
import Timer from './Timer';
import { useFitness } from '@/lib/FitnessContext';

export default function ExerciseCard({ exercise }) {
  const { soundEnabled, exerciseNotes, setExerciseNote } = useFitness();
  const [showNote, setShowNote] = useState(false);
  const unitLabel = exercise.unit === 'sec' ? 'secondi' : 'ripetizioni';
  const note = exerciseNotes?.[exercise.name] || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted shadow-sm">
            <img
              src={exercise.image}
              alt={exercise.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold leading-tight">{exercise.name}</h4>
            <p className="text-xs text-muted-foreground">{exercise.desc}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-blue-50 py-2 dark:bg-blue-950/50">
          <p className="text-base font-bold text-blue-600 dark:text-blue-400">{exercise.sets}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">serie</p>
        </div>
        <div className="rounded-lg bg-emerald-50 py-2 dark:bg-emerald-950/50">
          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{exercise.reps}</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{unitLabel}</p>
        </div>
        <div className="rounded-lg bg-amber-50 py-2 dark:bg-amber-950/50">
          <p className="text-base font-bold text-amber-600 dark:text-amber-400">{exercise.rest}s</p>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">recupero</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <span className="text-xs font-medium text-muted-foreground">⏱ Timer recupero</span>
        <Timer seconds={exercise.rest} soundEnabled={soundEnabled} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <button onClick={() => setShowNote((s) => !s)} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-blue-600">
          <StickyNote className="h-3.5 w-3.5" /> {note ? 'Modifica nota' : 'Aggiungi nota'}
        </button>
        {note && !showNote && <span className="max-w-[60%] truncate text-xs text-muted-foreground/70">"{note}"</span>}
      </div>
      {showNote && (
        <textarea
          defaultValue={note}
          onBlur={(e) => setExerciseNote(exercise.name, e.target.value)}
          placeholder="Sensazione, tecnica, tempo percepito..."
          rows={2}
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-blue-500"
        />
      )}
    </motion.div>
  );
}