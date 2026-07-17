import { motion } from 'framer-motion';
import { Check, Crown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GOALS, ADVANCED_GOALS } from '@/lib/fitnessData';
import { useFitness } from '@/lib/FitnessContext';
import { usePro } from '@/lib/ProContext';
import { cn } from '@/lib/utils';

export default function GoalSelector() {
  const { goal, setGoal } = useFitness();
  const { isPro } = usePro();
  const navigate = useNavigate();
  const allGoals = [...GOALS, ...ADVANCED_GOALS];

  return (
    <section id="obiettivo" className="scroll-mt-20">
      <div className="text-center">
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
          Step 1
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Qual è il tuo obiettivo?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Scegli il tuo goal e la routine si adatta automaticamente. Gli obiettivi avanzati sono riservati PRO.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {allGoals.map((g, i) => {
          const active = goal === g.id;
          const locked = g.pro && !isPro;
          return (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => (locked ? navigate('/pricing') : setGoal(g.id))}
              className={cn(
                'group relative overflow-hidden rounded-2xl border p-6 text-left transition-colors',
                active
                  ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/40'
                  : 'border-border bg-card hover:border-blue-300'
              )}
            >
              {g.pro && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                  {locked ? <Lock className="h-2.5 w-2.5" /> : <Crown className="h-2.5 w-2.5" />} PRO
                </span>
              )}
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl shadow-sm', g.gradient)}>
                {g.emoji}
              </div>
              <h3 className="mt-4 text-base font-bold">{g.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
              <div
                className={cn(
                  'absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full transition-all',
                  active ? 'scale-100 bg-blue-600 text-white' : 'scale-0 bg-muted'
                )}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}