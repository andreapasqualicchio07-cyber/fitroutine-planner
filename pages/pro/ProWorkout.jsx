import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Check, Dumbbell, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const INTENSITY = ['leggero', 'medio', 'intenso'];

export default function ProWorkout() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', day: 'Lunedì', date: '', duration_min: 30, intensity: 'medio', notes: '' });
  const { toast } = useToast();

  const load = () => base44.entities.Workout.list('-created_date').then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await base44.entities.Workout.create({ ...form, duration_min: Number(form.duration_min) || 0 });
    setForm({ title: '', day: 'Lunedì', date: '', duration_min: 30, intensity: 'medio', notes: '' });
    toast({ title: 'Workout creato 💪' });
    load();
  };

  const toggle = async (w) => { await base44.entities.Workout.update(w.id, { completed: !w.completed }); load(); };
  const del = async (id) => { await base44.entities.Workout.delete(id); load(); };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Workout</h1>
      <p className="mt-1 text-sm text-muted-foreground">Crea e gestisci i tuoi allenamenti personalizzati.</p>

      <form onSubmit={add} className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nome workout" className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500">
            {DAYS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={form.duration_min} onChange={(e) => setForm({ ...form, duration_min: e.target.value })} placeholder="Durata (min)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {INTENSITY.map((i) => (
            <button type="button" key={i} onClick={() => setForm({ ...form, intensity: i })}
              className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize', form.intensity === i ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground')}>{i}</button>
          ))}
          <button type="submit" className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Aggiungi
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            <Dumbbell className="mx-auto h-8 w-8 opacity-40" />
            <p className="mt-2">Nessun workout. Creane uno per iniziare.</p>
          </div>
        ) : items.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={cn('flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm', w.completed && 'opacity-60')}>
            <button onClick={() => toggle(w)} className={cn('flex h-8 w-8 items-center justify-center rounded-lg border', w.completed ? 'bg-emerald-500 text-white border-emerald-500' : 'border-border hover:border-emerald-400')}>
              {w.completed && <Check className="h-4 w-4" />}
            </button>
            <div className="flex-1">
              <p className={cn('font-semibold', w.completed && 'line-through')}>{w.title}</p>
              <p className="text-xs text-muted-foreground">{w.day} · {w.duration_min} min · {w.intensity}{w.date ? ` · ${w.date}` : ''}</p>
            </div>
            <button onClick={() => del(w.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}