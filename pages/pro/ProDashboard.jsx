import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, TrendingUp, Trophy, Flame, Bot, Crown, ArrowRight, Mail, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useFitness } from '@/lib/FitnessContext';
import { useToast } from '@/components/ui/use-toast';

export default function ProDashboard() {
  const { stats } = useFitness();
  const [counts, setCounts] = useState({ workouts: 0, progress: 0, challenges: 0 });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const sendWeekly = async () => {
    setSending(true);
    try {
      const me = await base44.auth.me();
      const body = `Il tuo riepilogo settimanale FitRoutine:\n\n• Allenamenti completati: ${stats.workouts}\n• Giorni consecutivi: ${stats.streak}\n• XP totali: ${stats.xp}\n• Routine completata: ${stats.routinePercent}%\n\nContinua così e non perdere il ritmo! 💪`;
      await base44.integrations.Core.SendEmail({ to: me.email, subject: 'Il tuo riepilogo settimanale', body });
      toast({ title: 'Riepilogo inviato via email' });
    } catch (e) {
      toast({ title: 'Invio non riuscito', description: 'Verifica di essere registrato con un\'email valida.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    Promise.all([
      base44.entities.Workout.list().catch(() => []),
      base44.entities.ProgressEntry.list().catch(() => []),
      base44.entities.Challenge.filter({ active: true }).catch(() => []),
    ]).then(([w, p, c]) => setCounts({ workouts: w.length, progress: p.length, challenges: c.length }));
  }, []);

  const cards = [
    { label: 'Workout salvati', value: counts.workouts, icon: Dumbbell, to: '/pro/workout', accent: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300' },
    { label: 'Registrazioni progressi', value: counts.progress, icon: TrendingUp, to: '/pro/progressi', accent: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300' },
    { label: 'Sfide attive', value: counts.challenges, icon: Trophy, to: '/pro/sfide', accent: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300' },
    { label: 'Allenamenti totali', value: stats.workouts, icon: Flame, to: '/pro/progressi', accent: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-300' },
  ];

  const links = [
    { to: '/pro/bot', label: 'Parla con il Coach IA', icon: Bot, desc: 'Motivazione e consigli personalizzati' },
    { to: '/pro/calendario', label: 'Calendario allenamenti', icon: TrendingUp, desc: 'Pianifica la tua settimana' },
    { to: '/pro/feedback', label: 'Lascia un feedback', icon: Crown, desc: 'Aiutaci a migliorare' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-950 dark:text-amber-300">
          <Crown className="h-3.5 w-3.5" /> Area PRO
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Bentornato! 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ecco la tua dashboard dedicata. Continua così, ogni allenamento conta.</p>
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <Link to={c.to} className="block">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.accent}`}><c.icon className="h-5 w-5" /></div>
              <p className="mt-3 text-2xl font-bold">{c.value}</p>
              <p className="text-sm text-muted-foreground">{c.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {links.map((l) => (
          <Link key={l.to} to={l.to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-blue-400">
            <div className="flex items-center justify-between">
              <l.icon className="h-6 w-6 text-blue-600" />
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="mt-3 font-semibold">{l.label}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{l.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-gradient-to-br from-blue-600 to-emerald-500 p-6 text-white shadow-sm">
        <h3 className="text-lg font-bold">Il tuo momento</h3>
        <div className="mt-3 flex flex-wrap gap-6 text-sm">
          <div><span className="text-2xl font-bold">{stats.streak}</span> 🔥 giorni consecutivi</div>
          <div><span className="text-2xl font-bold">{stats.xp}</span> ⭐ XP</div>
          <div><span className="text-2xl font-bold">{stats.routinePercent}%</span> 🎯 routine</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Riepilogo settimanale via email</h3>
            <p className="mt-1 text-sm text-muted-foreground">Ricevi un riepilogo dei tuoi progressi della settimana direttamente nella tua email.</p>
            <button onClick={sendWeekly} disabled={sending}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60">
              {sending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Invio...</>) : (<><Mail className="h-4 w-4" /> Ricevi riepilogo</>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}