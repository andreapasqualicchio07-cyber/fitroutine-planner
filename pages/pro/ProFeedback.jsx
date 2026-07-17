import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, MessageSquare } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'generale', label: 'Generale' },
  { id: 'bug', label: 'Bug' },
  { id: 'funzionalita', label: 'Funzionalità' },
  { id: 'elogio', label: 'Elogio' },
];

export default function ProFeedback() {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('generale');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      await base44.entities.FeedbackMsg.create({ rating, category, message: message.trim() });
      toast({ title: 'Grazie per il feedback! 💙' });
      setMessage('');
      setRating(5);
      setCategory('generale');
    } catch {
      toast({ title: 'Errore', description: 'Riprova tra un attimo.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Feedback</h1>
      <p className="mt-1 text-sm text-muted-foreground">La tua opinione ci aiuta a migliorare FitRoutine.</p>

      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium">Valutazione</label>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} onClick={() => setRating(n)} className="p-1">
                <Star className={cn('h-7 w-7 transition-colors', n <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground')} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium">Categoria</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button type="button" key={c.id} onClick={() => setCategory(c.id)}
                className={cn('rounded-lg px-3 py-1.5 text-xs font-medium', category === c.id ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground')}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium">Messaggio</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Scrivi qui il tuo feedback…"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500" />
        </div>

        <button type="submit" disabled={sending || !message.trim()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
          <Send className="h-4 w-4" /> Invia feedback
        </button>
      </motion.form>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4" /> Leggiamo ogni feedback. Grazie per il tuo tempo!
      </div>
    </div>
  );
}