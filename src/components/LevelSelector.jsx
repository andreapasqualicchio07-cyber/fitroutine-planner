import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LEVELS, ADVANCED_LEVELS } from '@/lib/fitnessData';
import { useFitness } from '@/lib/FitnessContext';
import { usePro } from '@/lib/ProContext';
import { cn } from '@/lib/utils';

export default function LevelSelector() {
  const { level, setLevel } = useFitness();
  const { isPro } = usePro();
  const navigate = useNavigate();
  const all = [...LEVELS.map((l) => ({ ...l, pro: false })), ...ADVANCED_LEVELS];

  return (
    <section id="livello" className="scroll-mt-20">
      <div className="text-center">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
          Step 2
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Scegli il livello</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          I livelli Elite e Atleta sono riservati agli utenti PRO.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {all.map((l, i) => {
          const active = level === l.id;
          const locked = l.pro && !isPro;
          return (
            <motion.button
              key={l.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => (locked ? navigate('/pricing') : setLevel(l.id))}
              className={cn(
                'relative rounded-2xl border p-5 text-center transition-colors',
                active
                  ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/40'
                  : 'border-border bg-card hover:border-blue-300'
              )}
            >
              {locked && (
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                  <Lock className="h-2.5 w-2.5" /> PRO
                </span>
              )}
              <p className="text-base font-bold">{l.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Intensità x{l.mult}</p>
              <div className={cn('mx-auto mt-3 flex h-6 w-6 items-center justify-center rounded-full transition-all', active ? 'scale-100 bg-blue-600 text-white' : 'scale-0 bg-muted')}>
                <Check className="h-3.5 w-3.5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}