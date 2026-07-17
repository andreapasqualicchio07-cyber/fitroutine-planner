import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppMockup from './AppMockup';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:from-blue-950/30 dark:via-background dark:to-emerald-950/30" />
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -right-24 top-40 -z-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> 100% a corpo libero · Nessun abbonamento
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            La tua scheda fitness{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">personalizzata</span>,
            <br className="hidden sm:block" /> senza personal trainer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Allenamenti su misura in base al tuo obiettivo, timer integrati per il recupero e progressi tracciati automaticamente — tutto dal browser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
            >
              Crea la mia routine gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#mockup"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-blue-400"
            >
              Vedi l'anteprima
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-xs text-muted-foreground"
          >
            Gratis · Registrati in 30 secondi · Funziona su mobile e desktop
          </motion.p>
        </div>

        <div id="mockup" className="mt-14 scroll-mt-24">
          <AppMockup />
        </div>
      </div>
    </section>
  );
}