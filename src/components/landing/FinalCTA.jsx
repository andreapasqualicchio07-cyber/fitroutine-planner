import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const POINTS = ['Nessun personal trainer da pagare', 'Allenati dove e quando vuoi', 'Progressi salvati automaticamente'];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-500 p-8 text-center text-white shadow-xl sm:p-14"
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Inizia il tuo primo allenamento oggi
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-white/85">
            Scegli l'obiettivo, ricevi la tua routine settimanale e allena il primo esercizio in meno di 60 secondi.
          </p>

          <ul className="relative mx-auto mt-6 flex max-w-md flex-col gap-2 text-left text-sm">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <Link
            to="/app"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:scale-105"
          >
            Apri FitRoutine Planner
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="relative mt-3 text-xs text-white/70">Gratis · Nessuna registrazione richiesta</p>
        </motion.div>
      </div>
    </section>
  );
}