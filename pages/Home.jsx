import { motion } from 'framer-motion';
import { Activity, Flame, TrendingUp, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoalSelector from '@/components/GoalSelector';
import LevelSelector from '@/components/LevelSelector';
import WeeklyRoutine from '@/components/WeeklyRoutine';
import FullBodyWorkout from '@/components/FullBodyWorkout';
import ProgressDashboard from '@/components/ProgressDashboard';
import { useFitness } from '@/lib/FitnessContext';
import { GOALS } from '@/lib/fitnessData';

export default function Home() {
  const { goal } = useFitness();
  const current = GOALS.find((g) => g.id === goal) || GOALS[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 pt-4">
        <a href="/export.zip" download
          className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
          <Download className="h-4 w-4" /> Scarica il codice del progetto (ZIP, ~761 KB)
        </a>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:from-blue-950/30 dark:via-background dark:to-emerald-950/30" />
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Activity className="h-3.5 w-3.5 text-emerald-500" /> Allenamento a corpo libero
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Costruisci la tua <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">routine perfetta</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Scegli il tuo obiettivo, ricevi una scheda settimanale personalizzata e monitora ogni progresso.
              Allenati ovunque, senza attrezzi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#obiettivo" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
                Inizia ora
              </a>
              <a href="#routine" className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:border-blue-400">
                Vedi la routine
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Flame className="h-4 w-4 text-orange-500" /> 7 giorni</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-emerald-500" /> 3 livelli</span>
              <span className="flex items-center gap-1.5"><Activity className="h-4 w-4 text-blue-500" /> Obiettivo: {current.label}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-16 px-4 py-12 sm:py-16">
        <GoalSelector />
        <LevelSelector />
        <WeeklyRoutine />
        <FullBodyWorkout />
        <ProgressDashboard />
      </main>

      <Footer />
    </div>
  );
}