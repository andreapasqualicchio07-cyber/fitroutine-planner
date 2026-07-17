import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function StatsCard({ icon: Icon, label, value, sub, accent = 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300' }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accent)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground/70">{sub}</p>}
    </motion.div>
  );
}