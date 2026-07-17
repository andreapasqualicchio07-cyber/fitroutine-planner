import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Crown, Sparkles, Dumbbell, ShieldCheck, CalendarDays } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePro } from '@/lib/ProContext';
import { STRIPE_PAYMENT_LINK_MONTHLY, STRIPE_PAYMENT_LINK_ANNUAL } from '@/lib/stripeConfig';

const FREE_FEATURES = [
  'Routine settimanale base',
  'Livelli Principiante e Intermedio',
  'Timer e cronometro allenamenti',
  'Tracking progressi e XP',
];

const PRO_FEATURES = [
  'Tutto ciò che è incluso nel piano Free',
  'Livello Avanzato sbloccato',
  'Routine personalizzate illimitate',
  'Diario alimentazione con contacalorie IA',
  'Sfide giornaliere, settimanali e mensili',
  'Assistente IA a comandi',
  'Esercizi premium esclusivi',
  'Nessuna pubblicità',
];

function PlanCard({ children, featured, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={featured
        ? 'relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-600 to-emerald-500 p-7 text-white shadow-lg'
        : 'rounded-2xl border border-border bg-card p-7 shadow-sm'}
    >
      {children}
    </motion.div>
  );
}

function CheckList({ items, featured }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm">
          {featured
            ? <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            : <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />}
          {f}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const { isPro } = usePro();
  const linkCta = (to, label) => (
    <Link to={to} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold transition-colors hover:border-blue-400">
      {label}
    </Link>
  );
  const stripeCta = (link, label, featured) => (
    <a href={link} target="_blank" rel="noreferrer" className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
      featured ? 'bg-white text-blue-700 hover:bg-white/90'
      : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
      <Crown className="h-4 w-4" /> {label}
    </a>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Crown className="h-3.5 w-3.5 text-amber-500" /> Piani & Prezzi
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Scegli il tuo piano</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Inizia gratis. Passa a PRO quando vuoi per sbloccare routine avanzate e funzionalità premium.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Free */}
          <PlanCard>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <Dumbbell className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">Free</h2>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-sm text-muted-foreground">/mese</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Per iniziare il tuo percorso fitness.</p>
            <CheckList items={FREE_FEATURES} />
            {linkCta('/auth', 'Inizia gratis')}
          </PlanCard>

          {/* PRO Mensile */}
          <PlanCard>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
                <Crown className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">PRO Mensile</h2>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">€9,99</span>
              <span className="text-sm text-muted-foreground">/mese</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Flessibile, cancelli quando vuoi.</p>
            <CheckList items={PRO_FEATURES} />
            {isPro ? (
              <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                <Check className="h-4 w-4" /> Sei già PRO
              </div>
            ) : stripeCta(STRIPE_PAYMENT_LINK_MONTHLY, 'Diventa PRO mensile')}
          </PlanCard>

          {/* PRO Annuale */}
          <PlanCard featured delay={0.05}>
            <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
              Risparmi 50%
            </span>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <CalendarDays className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold">PRO Annuale</h2>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">€59,94</span>
              <span className="text-sm text-white/80">/anno</span>
            </div>
            <p className="mt-1 text-sm text-white/80">≈ €4,99/mese · il più conveniente.</p>
            <CheckList items={PRO_FEATURES} featured />
            {isPro ? (
              <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-sm font-semibold">
                <Check className="h-4 w-4" /> Sei già PRO
              </div>
            ) : stripeCta(STRIPE_PAYMENT_LINK_ANNUAL, 'Diventa PRO annuale', true)}
          </PlanCard>
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" /> Pagamenti sicuri tramite Stripe · Cancella quando vuoi
        </p>
      </main>
      <Footer />
    </div>
  );
}