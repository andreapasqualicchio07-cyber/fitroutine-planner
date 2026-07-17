import { motion } from 'framer-motion';
import { UserPlus, Target, Dumbbell } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    n: '01',
    title: 'Iscrizione',
    desc: 'Accedi all\'app in un secondo, senza abbonamento. Il tuo profilo resta salvato sul dispositivo.',
  },
  {
    icon: Target,
    n: '02',
    title: 'Scelta obiettivi',
    desc: 'Dimagrimento, flessibilità o massa muscolare. La routine si adatta automaticamente in serie, ripetizioni e recupero.',
  },
  {
    icon: Dumbbell,
    n: '03',
    title: 'Allenamento',
    desc: 'Segui la scheda settimanale, usa i timer di recupero e completa le sessioni. I progressi si tracciano da soli.',
  },
];

export default function HowItWorks() {
  return (
    <section id="come-funziona" className="scroll-mt-20 border-y border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            Semplice come 1-2-3
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Come funziona</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Tre passi per passare dal divano al primo allenamento. Nessuna competenza richiesta.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-sm">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-muted/40">{s.n}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}