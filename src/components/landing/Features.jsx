import { motion } from 'framer-motion';
import { Timer, BarChart3, Calendar, Moon, Shuffle, Trophy } from 'lucide-react';

const FEATURES = [
  { icon: Timer, title: 'Timer di recupero integrati', desc: 'Countdown con start, pausa e reset per ogni esercizio. Bip sonoro alla fine.' },
  { icon: BarChart3, title: 'Progressi tracciati', desc: 'Allenamenti completati, giorni consecutivi, tempo totale e percentuale della routine.' },
  { icon: Calendar, title: 'Calendario visivo', desc: 'Vedi a colpo d\'occhio i giorni in cui ti sei allenato e mantieni la costanza.' },
  { icon: Shuffle, title: 'Routine rigenerabile', desc: 'Un click per generare una nuova scheda e variare gli stimoli.' },
  { icon: Trophy, title: 'XP e badge', desc: 'Guadagna esperienza e sblocca traguardi ad ogni sessione completata.' },
  { icon: Moon, title: 'Dark mode & filtri', desc: 'Tema chiaro/scuro, 3 livelli (principiante, intermedio, avanzato) e ricerca esercizi.' },
];

export default function Features() {
  return (
    <section id="vantaggi" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            Perché FitRoutine
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tutto ciò che serve, niente di superfluo</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Una web app pensata per chi si allena a casa: strumenti utili, zero distrazioni.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-blue-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}