import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Crown, Sparkles, X } from 'lucide-react';

const BENEFITS = [
  'Livello di allenamento Avanzato',
  'Routine personalizzate illimitate',
  'Esercizi premium esclusivi',
  'Statistiche avanzate e badge PRO',
];

export default function Paywall({ open, onClose, feature }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
          >
            <div className="relative bg-gradient-to-br from-blue-600 to-emerald-500 p-6 text-white">
              <button onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/20">
                <X className="h-4 w-4" />
              </button>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-xl font-bold">Passa a FitRoutine PRO</h3>
              <p className="mt-1 text-sm text-white/80">
                {feature ? `«${feature}» è disponibile con PRO.` : 'Sblocca tutte le funzionalità premium.'}
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-2.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-emerald-500" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold">€4,99</span>
                <span className="text-sm text-muted-foreground">/mese</span>
              </div>
              <Link
                to="/pro"
                onClick={onClose}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Lock className="h-4 w-4" /> Sblocca con PRO
              </Link>
              <button onClick={onClose} className="mt-2 w-full rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted">
                Magari più tardi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}