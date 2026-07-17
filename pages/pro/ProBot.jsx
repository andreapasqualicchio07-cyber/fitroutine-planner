import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useFitness } from '@/lib/FitnessContext';
import { cn } from '@/lib/utils';

const SUGGESTIONS = ['Non ho voglia oggi 😩', 'Proponi una routine breve', 'Come miglioro la costanza?', 'Spiegami un esercizio'];

export default function ProBot() {
  const { stats } = useFitness();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Ciao! Sono il tuo Coach IA 🤖💪 Sono qui per motivarti e aiutarti a raggiungere i tuoi obiettivi. Ricordo i tuoi progressi e ti propongo esercizi e consigli. Come ti senti oggi?' },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, sending]);

  const send = async (text) => {
    const t = (text ?? input).trim();
    if (!t || sending) return;
    const next = [...messages, { role: 'user', text: t }];
    setMessages(next);
    setInput('');
    setSending(true);
    const convo = next.map((m) => `${m.role === 'user' ? 'Utente' : 'Coach'}: ${m.text}`).join('\n');
    const prompt = `Sei un coach fitness IA empatico, motivante e incoraggiante. Parli in italiano, in modo amichevole, positivo e umano.
Usi i progressi dell'utente per personalizzare le risposte e lo incoraggi.
Progressi attuali dell'utente: ${stats.workouts} allenamenti completati, ${stats.streak} giorni consecutivi, ${stats.xp} XP, routine settimanale completata al ${stats.routinePercent}%, obiettivo: ${stats.goal || 'fitness generale'}.
Rispondi in modo empatico. Se l'utente è giù di morale, incoraggialo. Quando pertinente proponi esercizi, routine o consigli pratici. Risposte concise (massimo 4 frasi).

Cronologia:
${convo}

Coach:`;
    try {
      const res = await base44.integrations.Core.InvokeLLM({ prompt });
      setMessages((m) => [...m, { role: 'bot', text: typeof res === 'string' ? res : String(res) }]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'Ops, in questo momento non riesco a rispondere. Riprova tra un attimo. 💙' }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Bot className="h-6 w-6 text-blue-600" /> Coach IA
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Il tuo assistente motivazionale che ricorda i tuoi progressi.</p>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm',
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-muted text-foreground')}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-pulse" /> sto pensando…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => send(s)} disabled={sending}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-blue-400 hover:text-blue-600 disabled:opacity-50">
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Scrivi al tuo coach…"
          className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
        <button type="submit" disabled={sending || !input.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}