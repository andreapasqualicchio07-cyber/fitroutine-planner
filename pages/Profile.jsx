import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Star, Flame, Dumbbell, Clock, Save, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import ProgressBar from '@/components/ProgressBar';
import { useFitness } from '@/lib/FitnessContext';
import { GOALS, BADGES } from '@/lib/fitnessData';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

function fmtTime(sec) {
  const m = Math.floor(sec / 60);
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

export default function Profile() {
  const { profile, updateProfile, goal, setGoal, stats, unlockedBadges } = useFitness();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const bmi = form.weight && form.height
    ? (Number(form.weight) / Math.pow(Number(form.height) / 100, 2)).toFixed(1)
    : null;

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    toast({ title: 'Profilo salvato', description: 'Le tue informazioni sono state aggiornate.' });
    setTimeout(() => setSaved(false), 2000);
  };

  const xpForNext = Math.ceil((stats.xp + 1) / 500) * 500;
  const xpPct = ((stats.xp % 500) / 500) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Profilo</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gestisci i tuoi dati e monitora i traguardi.</p>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={handleSave} className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <h2 className="flex items-center gap-2 font-semibold"><User className="h-4 w-4 text-blue-600" /> Dati personali</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Nome</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Il tuo nome"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Obiettivo</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  {GOALS.map((g) => (
                    <option key={g.id} value={g.id}>{g.emoji} {g.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Peso (kg)</label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  placeholder="70"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Altezza (cm)</label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                  placeholder="175"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {bmi && (
              <div className="mt-4 rounded-xl bg-muted/40 p-4 text-sm">
                <span className="font-medium">Indice di massa corporea (IMC):</span>{' '}
                <span className="font-bold text-blue-600">{bmi}</span>
                <span className="text-muted-foreground">
                  {' '}— {bmi < 18.5 ? 'sottopeso' : bmi < 25 ? 'normopeso' : bmi < 30 ? 'sovrappeso' : 'obesità'}
                </span>
              </div>
            )}

            <button
              type="submit"
              className={cn(
                'mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors',
                saved ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
              )}
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? 'Salvato' : 'Salva profilo'}
            </button>
          </form>

          {/* XP card */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-600 to-emerald-500 p-6 text-white shadow-sm">
            <Star className="h-6 w-6" />
            <p className="mt-3 text-3xl font-bold">{stats.xp}</p>
            <p className="text-sm text-white/80">XP totali</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/80">
                <span>Livello {Math.floor(stats.xp / 500) + 1}</span>
                <span>{xpForNext} XP</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatsCard icon={Dumbbell} label="Allenamenti" value={stats.workouts} accent="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300" />
          <StatsCard icon={Flame} label="Giorni consecutivi" value={stats.streak} accent="bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300" />
          <StatsCard icon={Clock} label="Tempo totale" value={fmtTime(stats.totalTime)} accent="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300" />
          <StatsCard icon={Target} label="Routine" value={`${stats.routinePercent}%`} accent="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300" />
        </div>

        {/* Badges */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold">Badge e traguardi</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BADGES.map((b) => {
              const unlocked = unlockedBadges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-xl border p-3 text-center',
                    unlocked
                      ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40'
                      : 'border-border bg-muted/30 opacity-60'
                  )}
                  title={b.desc}
                >
                  <span className="text-2xl">{unlocked ? b.emoji : '🔒'}</span>
                  <span className="text-[10px] font-medium leading-tight">{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}