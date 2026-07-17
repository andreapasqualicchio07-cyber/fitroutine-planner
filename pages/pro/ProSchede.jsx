import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ExerciseCard from '@/components/ExerciseCard';
import { EXERCISE_LIST } from '@/lib/fitnessData';

const PROGRAMS = [
  { id: 'hiit', name: 'HIIT', emoji: '🔥', desc: 'Alta intensità a intervalli per bruciare grassi', gradient: 'from-orange-500 to-red-500', exercises: ['Burpees', 'Jump Squat', 'Mountain Climbers', 'Tuck Jump', 'Jumping Jacks', 'Plank'] },
  { id: 'forza', name: 'Forza', emoji: '💪', desc: 'Costruisci forza e volume muscolare', gradient: 'from-blue-600 to-indigo-600', exercises: ['Push Up', 'Diamond Push Up', 'Pike Push Up', 'Tricep Dip', 'Squat', 'Wall Sit', 'Cossack Squat'] },
  { id: 'mobilita', name: 'Mobilità', emoji: '🤸', desc: 'Migliora flessibilità e controllo articolare', gradient: 'from-emerald-400 to-teal-500', exercises: ['Inchworm', 'Cossack Squat', 'Side Lunge', 'Bird Dog', 'Superman', 'Plank'] },
  { id: 'perdita_peso', name: 'Perdita Peso', emoji: '📉', desc: 'Cardio e tonificazione per il dimagrimento', gradient: 'from-pink-500 to-rose-500', exercises: ['Burpees', 'Jump Squat', 'Mountain Climbers', 'Jumping Jacks', 'Russian Twist', 'Crunch'] },
  { id: 'corsa', name: 'Corsa', emoji: '🏃', desc: 'Resistenza ed esplosività per i runner', gradient: 'from-amber-400 to-orange-500', exercises: ['Affondi', 'Jumping Jacks', 'Mountain Climbers', 'Burpees', 'Calf Raise', 'Tuck Jump'] },
  { id: 'yoga', name: 'Yoga', emoji: '🧘', desc: 'Equilibrio, respiro e stabilità', gradient: 'from-violet-500 to-purple-600', exercises: ['Plank', 'Side Plank', 'Bird Dog', 'Superman', 'Glute Bridge', 'Hollow Body Hold'] },
  { id: 'pilates', name: 'Pilates', emoji: '🧘‍♀️', desc: 'Core profondo e postura', gradient: 'from-cyan-500 to-blue-500', exercises: ['Plank', 'Side Plank', 'Hollow Body Hold', 'Leg Raise', 'Flutter Kick', 'Glute Bridge'] },
];

const byName = Object.fromEntries(EXERCISE_LIST.map((e) => [e.name, e]));

export default function ProSchede() {
  const [active, setActive] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Schede Speciali</h1>
      <p className="mt-1 text-sm text-muted-foreground">Programmi dedicati: HIIT, forza, mobilità, perdita peso, corsa, yoga e pilates.</p>

      <div className="mt-6 space-y-4">
        {PROGRAMS.map((p, i) => {
          const open = active === p.id;
          const exercises = p.exercises.map((n) => byName[n]).filter(Boolean);
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <button onClick={() => setActive(open ? null : p.id)} className="flex w-full items-center gap-4 p-5 text-left">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-2xl shadow-sm`}>{p.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{exercises.length} esercizi</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="grid gap-4 border-t border-border bg-muted/20 p-5 sm:grid-cols-2 lg:grid-cols-3">
                      {exercises.map((ex) => (
                        <ExerciseCard key={ex.name} exercise={ex} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}