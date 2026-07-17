import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { BADGES } from '@/lib/fitnessData';
import { useFitness } from '@/lib/FitnessContext';
import { cn } from '@/lib/utils';

export default function Badges() {
  const { unlockedBadges } = useFitness();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h4 className="font-semibold">Badge</h4>
      <p className="text-xs text-muted-foreground">{unlockedBadges.length} di {BADGES.length} sbloccati</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {BADGES.map((b, i) => {
          const unlocked = unlockedBadges.includes(b.id);
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-colors',
                unlocked
                  ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40'
                  : 'border-border bg-muted/30 opacity-60'
              )}
              title={b.desc}
            >
              <span className={cn('text-2xl', !unlocked && 'grayscale')}>{unlocked ? b.emoji : '🔒'}</span>
              <span className="text-[10px] font-medium leading-tight">{b.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}