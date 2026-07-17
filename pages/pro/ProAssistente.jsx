import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Send, Wand2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';

const AGENT = 'comandi';
const SUGGESTIONS = [
  'Aggiungi un workout di 30 min domani',
  'Crea una routine per 3 giorni questa settimana',
  'Registra 350 kcal a pranzo (pasta)',
  'Iscrivimi a una sfida',
];

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const status = toolCall.status || 'pending';
  const failed = status === 'failed' || status === 'error';
  const label = toolCall.display_projection?.label || toolCall.name || 'azione';
  return (
    <div className="mt-2 text-xs">
      <button onClick={() => setExpanded((e) => !e)} className="inline-flex items-center gap-1.5 rounded-lg bg-background/60 px-2 py-1">
        <span className={cn('h-1.5 w-1.5 rounded-full', failed ? 'bg-destructive' : status === 'completed' || status === 'success' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')} />
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">· {status}</span>
      </button>
      {expanded && toolCall.arguments_string && (
        <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-background/60 p-2 text-[11px] text-muted-foreground">{toolCall.arguments_string}</pre>
      )}
    </div>
  );
}

export default function ProAssistente() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const convs = await base44.agents.listConversations({ agent_name: AGENT });
        let convId = convs && convs.length ? convs[0].id : null;
        if (!convId) {
          const c = await base44.agents.createConversation({ agent_name: AGENT, metadata: { name: 'Assistente' } });
          convId = c.id;
        }
        const conv = await base44.agents.getConversation(convId);
        if (!active) return;
        setConversation(conv);
        setMessages(conv.messages || []);
      } catch (e) {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!conversation?.id) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      setSending(false);
    });
    return unsub;
  }, [conversation?.id]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, sending]);

  const send = async (text) => {
    const t = (text ?? input).trim();
    if (!t || !conversation || sending) return;
    setInput('');
    setSending(true);
    try {
      await base44.agents.addMessage(conversation, { role: 'user', content: t });
    } catch {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Wand2 className="h-6 w-6 text-blue-600" /> Assistente IA
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Digita un comando: aggiungi workout, crea routine, registra pasti o progressi.</p>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">Scrivi un comando per iniziare. Es: «Aggiungi un workout di 30 min domani»</p>
        )}
        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm', isUser ? 'bg-blue-600 text-white' : 'bg-muted text-foreground')}>
                {m.content && (isUser
                  ? <p className="whitespace-pre-wrap">{m.content}</p>
                  : <ReactMarkdown className="text-sm">{m.content}</ReactMarkdown>)}
                {m.tool_calls?.map((tc, k) => <FunctionDisplay key={k} toolCall={tc} />)}
              </div>
            </motion.div>
          );
        })}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">Elaborazione… ⚙️</div>
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
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Es: aggiungi un workout di 40 min venerdì"
          className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
        <button type="submit" disabled={sending || !input.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}