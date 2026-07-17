import { motion } from 'framer-motion';
import { useFitness } from '@/lib/FitnessContext';
import { cn } from '@/lib/utils';

const TIER_STYLE = {
  Bronzo: 'from-amber-600 to-amber-800',
  Argento: 'from-slate-400 to-slate-600',
  Oro: 'from-yellow-400 to-amber-500',
  Platino: 'from-cyan-400 to-blue-500',
};

const REWARDS = [
  { label: 'Primo Passo', emoji: '🎯', tier: 'Bronzo', desc: 'Completa 1 allenamento', check: (s) => s.workouts >= 1 },
  { label: 'Costanza', emoji: '🔥', tier: 'Bronzo', desc: '3 giorni consecutivi', check: (s) => s.streak >= 3 },
  { label: 'Dieci Sessioni', emoji: '💪', tier: 'Argento', desc: '10 allenamenti totali', check: (s) => s.workouts >= 10 },
  { label: 'Settimana Perfetta', emoji: '🏆', tier: 'Argento', desc: '7 giorni consecutivi', check: (s) => s.streak >= 7 },
  { label: 'Esperto', emoji: '⭐', tier: 'Oro', desc: 'Raggiungi 500 XP', check: (s) => s.xp >= 500 },
  { label: 'Atleta', emoji: '🥇', tier: 'Oro', desc: 'Raggiungi 1000 XP', check: (s) => s.xp >= 1000 },
  { label: 'Maratoneta', emoji: '🏃', tier: 'Platino', desc: '30 allenamenti totali', check: (s) => s.workouts >= 30 },
  { label: 'Leggenda', emoji: '👑', tier: 'Platino', desc: 'Raggiungi 2500 XP', check: (s) => s.xp >= 2500 },
];

export default function ProRicompense() {
  const { stats } = useFitness();
  const unlocked = REWARDS.filter((r) => r.check(stats)).length;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Ricompense Virtuali</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sblocca badge e ricompense man mano che progredisci.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Sbloccate</p>
          <p className="mt-1 text-2xl font-bold">{unlocked}<span className="text-base text-muted-foreground">/{REWARDS.length}</span></p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Allenamenti</p>
          <p className="mt-1 text-2xl font-bold">{stats.workouts}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">XP totali</p>
          <p className="mt-1 text-2xl font-bold">{stats.xp}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REWARDS.map((r, i) => {
          const got = r.check(stats);
          return (
            <motion.div key={r.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
              className={cn('relative overflow-hidden rounded-2xl border p-5 text-center shadow-sm', got ? 'border-border bg-card' : 'border-dashed border-border bg-muted/30')}>
              <div className={cn('mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-sm', got ? TIER_STYLE[r.tier] : 'bg-muted grayscale')}>
                <span className={got ? '' : 'opacity-40'}>{r.emoji}</span>
              </div>
              <p className="mt-3 text-sm font-semibold">{r.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
              <span className={cn('mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', got ? `bg-gradient-to-r ${TIER_STYLE[r.tier]} text-white` : 'bg-muted text-muted-foreground')}>
                {r.tier}
              </span>
              {!got && <span className="mt-2 block text-[11px] font-medium text-muted-foreground">🔒 Bloccata</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}