import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X, Loader2, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { EXERCISE_LIST } from '@/lib/fitnessData';
import { useToast } from '@/components/ui/use-toast';

const CACHE_KEY = 'fitroutine_coaching_cache';

export default function ProVideo() {
  const [selected, setSelected] = useState(null);
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const open = async (ex) => {
    setSelected(ex);
    setTips(null);
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (cache[ex.name]) { setTips(cache[ex.name]); return; }
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Sei un coach fitness esperto. Per l'esercizio a corpo libero "${ex.name}" (${ex.desc}), fornisci: 1) tecnica corretta (3 punti chiave brevi), 2) errori comuni da evitare (2), 3) un consiglio per progredire. Rispondi in italiano, conciso.`,
        response_json_schema: {
          type: 'object',
          properties: {
            tecnica: { type: 'array', items: { type: 'string' } },
            errori: { type: 'array', items: { type: 'string' } },
            consiglio: { type: 'string' },
          },
          required: ['tecnica', 'errori', 'consiglio'],
        },
      });
      cache[ex.name] = res;
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      setTips(res);
    } catch {
      toast({ title: 'Coaching non disponibile', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <PlayCircle className="h-6 w-6 text-blue-600" /> Libreria Coaching
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Tecnica, errori comuni e consigli per ogni esercizio, generati dal coach IA.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXERCISE_LIST.map((ex) => (
          <motion.button key={ex.name} onClick={() => open(ex)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md">
            <div className="relative h-40 overflow-hidden">
              <img src={ex.image} alt={ex.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <PlayCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold">{ex.emoji} {ex.name}</p>
              <p className="text-xs text-muted-foreground">{ex.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card shadow-2xl">
              <div className="relative">
                <img src={selected.image} alt={selected.name} className="h-48 w-full object-cover" />
                <button onClick={() => setSelected(null)} className="absolute right-3 top-3 rounded-lg bg-black/40 p-1.5 text-white hover:bg-black/60"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{selected.emoji} {selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.desc} · {selected.sets}×{selected.reps} {selected.unit} · recupero {selected.rest}s</p>
                {loading ? (
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Il coach sta preparando i consigli…</div>
                ) : tips ? (
                  <div className="mt-4 space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-emerald-600">✓ Tecnica corretta</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5">{tips.tecnica?.map((t, i) => <li key={i}>{t}</li>)}</ul>
                    </div>
                    <div>
                      <p className="font-semibold text-rose-600">✕ Errori comuni</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5">{tips.errori?.map((t, i) => <li key={i}>{t}</li>)}</ul>
                    </div>
                    <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
                      <p className="inline-flex items-center gap-1.5 font-semibold text-blue-600"><Sparkles className="h-4 w-4" /> Consiglio per progredire</p>
                      <p className="mt-1">{tips.consiglio}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}