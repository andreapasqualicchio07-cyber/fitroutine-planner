import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, ArrowRight } from 'lucide-react';
import { usePro } from '@/lib/ProContext';

export default function BotPopup() {
  const [show, setShow] = useState(false);
  const { isPro } = usePro();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      if (!sessionStorage.getItem('fitroutine_botpopup')) setShow(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem('fitroutine_botpopup', '1');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
        >
          <button onClick={close} className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground hover:bg-muted" aria-label="Chiudi">
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Coach IA</p>
              <p className="inline-flex items-center gap-1 text-[11px] text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online ora</p>
            </div>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Ciao! Sono il tuo personal trainer virtuale. Ti aiuto con routine, motivazione e consigli personalizzati. Vuoi provare?
          </p>

          <div className="mt-3 space-y-2 rounded-xl bg-muted/60 p-3">
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-card px-3 py-2 text-xs shadow-sm">Quante calorie ho bruciato oggi?</div>
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 px-3 py-2 text-xs text-white shadow-sm">
              Ottima domanda! In base ai tuoi allenamenti hai bruciato circa 320 kcal 🔥
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={close} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-muted">Più tardi</button>
            <button
              onClick={() => navigate(isPro ? '/pro/bot' : '/pricing')}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4" /> Prova ora <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}