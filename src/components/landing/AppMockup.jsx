import { motion } from 'framer-motion';
import { Dumbbell, Timer, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto w-full max-w-4xl"
    >
      {/* Browser frame */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-blue-500/10">
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-background px-3 py-1 text-[10px] text-muted-foreground">fitroutine.app</span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-5">
          {/* Goal selector */}
          <div className="sm:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Obiettivo</p>
            <div className="mt-2 space-y-2">
              {[
                { e: '🔥', t: 'Dimagrimento', a: true },
                { e: '🤸', t: 'Flessibilità', a: false },
                { e: '💪', t: 'Massa muscolare', a: false },
              ].map((g) => (
                <div
                  key={g.t}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs ${g.a ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40' : 'border-border'}`}
                >
                  <span className="text-base">{g.e}</span>
                  <span className="font-medium">{g.t}</span>
                  {g.a && <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-blue-600" />}
                </div>
              ))}
            </div>
          </div>

          {/* Routine */}
          <div className="sm:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Lunedì · Routine</p>
            <div className="mt-2 space-y-2">
              {[
                { e: '👊', n: 'Push Up', s: '3 serie · 12 rep · 60s' },
                { e: '🦵', n: 'Squat', s: '3 serie · 15 rep · 60s' },
                { e: '🧘', n: 'Plank', s: '3 serie · 30s · 45s' },
              ].map((ex) => (
                <div key={ex.n} className="flex items-center gap-2 rounded-xl border border-border bg-background p-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-base">{ex.e}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight">{ex.n}</p>
                    <p className="text-[10px] text-muted-foreground">{ex.s}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-[9px] font-medium text-white">
                    <Timer className="h-2.5 w-2.5" /> Timer
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini dashboard */}
          <div className="sm:col-span-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
            {[
              { i: Dumbbell, v: '12', l: 'Allenamenti' },
              { i: TrendingUp, v: '5', l: 'Giorni consecutivi' },
              { i: Timer, v: '3h 20m', l: 'Tempo totale' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-background p-3 text-center">
                <s.i className="mx-auto h-4 w-4 text-blue-600" />
                <p className="mt-1 text-sm font-bold">{s.v}</p>
                <p className="text-[9px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -right-3 -top-3 hidden rounded-xl bg-white px-3 py-2 shadow-lg sm:block dark:bg-card"
      >
        <p className="text-[10px] font-semibold text-emerald-600">+50 XP</p>
        <p className="text-[9px] text-muted-foreground">Allenamento completato</p>
      </motion.div>
    </motion.div>
  );
}