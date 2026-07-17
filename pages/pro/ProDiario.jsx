import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Flame, Loader2, Sparkles, Utensils, Droplets, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const MEALS = [
  { id: 'colazione', label: 'Colazione', emoji: '🥣' },
  { id: 'pranzo', label: 'Pranzo', emoji: '🍝' },
  { id: 'cena', label: 'Cena', emoji: '🍽️' },
  { id: 'spuntino', label: 'Spuntino', emoji: '🍎' },
];
const DAILY_TARGET = 2000;
const WATER_TARGET = 2000;
const SUGGESTED_FOODS = [
  { food: 'Pasta al pomodoro', meal: 'pranzo', calories: 380, quantity: 1, unit: 'porzione' },
  { food: 'Petto di pollo grigliato', meal: 'cena', calories: 165, quantity: 1, unit: '100g' },
  { food: 'Yogurt greco', meal: 'colazione', calories: 100, quantity: 1, unit: 'vasetto' },
  { food: 'Banana', meal: 'spuntino', calories: 90, quantity: 1, unit: 'media' },
  { food: 'Insalata mista', meal: 'pranzo', calories: 80, quantity: 1, unit: 'piatto' },
  { food: 'Uova strapazzate', meal: 'colazione', calories: 220, quantity: 2, unit: 'uova' },
  { food: 'Riso bianco', meal: 'pranzo', calories: 130, quantity: 1, unit: '100g' },
  { food: 'Frutta secca', meal: 'spuntino', calories: 180, quantity: 1, unit: '30g' },
];
const dayKey = (d) => d.toISOString().slice(0, 10);

export default function ProDiario() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ date: dayKey(new Date()), meal: 'colazione', food: '', quantity: 1, unit: 'porzione', calories: '' });
  const [estimating, setEstimating] = useState(false);
  const { toast } = useToast();

  const today = dayKey(new Date());
  const [water, setWater] = useState(() => Number(localStorage.getItem('fitroutine_water_' + dayKey(new Date())) || 0));

  useEffect(() => { localStorage.setItem('fitroutine_water_' + today, String(water)); }, [water, today]);

  const load = () => base44.entities.FoodLog.list('-date').then(setItems).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const estimate = async () => {
    if (!form.food.trim()) return;
    setEstimating(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Stima le calorie totali per: ${form.quantity} ${form.unit} di "${form.food}". Considera alimenti tipici italiani. Rispondi solo con il numero di calorie totali.`,
        response_json_schema: { type: 'object', properties: { calories: { type: 'number' } }, required: ['calories'] },
      });
      const c = Math.round(res?.calories || 0);
      setForm((f) => ({ ...f, calories: c }));
      toast({ title: `Stimato: ${c} kcal 🔥` });
    } catch {
      toast({ title: 'Stima non disponibile', variant: 'destructive' });
    } finally {
      setEstimating(false);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    if (!form.food.trim()) return;
    await base44.entities.FoodLog.create({
      date: form.date, meal: form.meal, food: form.food.trim(),
      quantity: Number(form.quantity) || 1, unit: form.unit, calories: Number(form.calories) || 0,
    });
    setForm({ date: dayKey(new Date()), meal: 'colazione', food: '', quantity: 1, unit: 'porzione', calories: '' });
    toast({ title: 'Alimento aggiunto 🍽️' });
    load();
  };

  const quickAdd = async (f) => {
    await base44.entities.FoodLog.create({ date: today, meal: f.meal, food: f.food, quantity: f.quantity, unit: f.unit, calories: f.calories });
    toast({ title: `${f.food} aggiunto ✅` });
    load();
  };

  const del = async (id) => { await base44.entities.FoodLog.delete(id); load(); };

  const todayTotal = items.filter((i) => i.date === today).reduce((a, i) => a + (i.calories || 0), 0);
  const pct = Math.min(100, Math.round((todayTotal / DAILY_TARGET) * 100));
  const waterPct = Math.min(100, Math.round((water / WATER_TARGET) * 100));

  const byDay = useMemo(() => {
    const map = {};
    items.forEach((i) => { (map[i.date] = map[i.date] || []).push(i); });
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  }, [items]);

  const weekData = useMemo(() => {
    const days = [];
    for (let k = 6; k >= 0; k--) {
      const d = new Date(); d.setDate(d.getDate() - k);
      const key = dayKey(d);
      const tot = items.filter((i) => i.date === key).reduce((a, i) => a + (i.calories || 0), 0);
      days.push({ day: key.slice(5), kcal: tot });
    }
    return days;
  }, [items]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Diario Alimentazione</h1>
      <p className="mt-1 text-sm text-muted-foreground">Traccia pasti, calorie e idratazione. Funzionalità PRO.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-600 to-emerald-500 p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium"><Flame className="h-4 w-4" /> Calorie oggi</span>
            <span className="text-sm font-bold">{todayTotal} / {DAILY_TARGET} kcal</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-white/80">
            {todayTotal >= DAILY_TARGET ? 'Obiettivo calorico raggiunto! 🎯' : `Mancano ${DAILY_TARGET - todayTotal} kcal`}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold"><Droplets className="h-4 w-4 text-blue-500" /> Idratazione</span>
            <span className="text-sm font-bold">{water} / {WATER_TARGET} ml</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-500" style={{ width: `${waterPct}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[250, 500, 1000].map((v) => (
              <button key={v} onClick={() => setWater((w) => w + v)} className="rounded-xl border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-blue-400 hover:text-blue-600">+{v} ml</button>
            ))}
            {water > 0 && <button onClick={() => setWater(0)} className="rounded-xl border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive">Reset</button>}
          </div>
          {water >= WATER_TARGET && <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Obiettivo idratazione raggiunto! 💧</p>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="font-semibold">Cibi consigliati</h3>
        <p className="text-xs text-muted-foreground">Aggiungi al diario con un tap.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SUGGESTED_FOODS.map((f) => {
            const meal = MEALS.find((m) => m.id === f.meal);
            return (
              <button key={f.food} onClick={() => quickAdd(f)} className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-left transition-colors hover:border-blue-400 hover:bg-blue-50/40">
                <span className="text-lg">{meal?.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.food}</p>
                  <p className="text-xs text-muted-foreground">{meal?.label} · {f.quantity} {f.unit}</p>
                </div>
                <span className="text-sm font-semibold text-emerald-600">{f.calories} kcal</span>
                <Plus className="h-4 w-4 text-blue-600" />
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={add} className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="font-semibold">Aggiungi alimento personalizzato</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={form.meal} onChange={(e) => setForm({ ...form, meal: e.target.value })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500">
            {MEALS.map((m) => <option key={m.id} value={m.id}>{m.emoji} {m.label}</option>)}
          </select>
          <input value={form.food} onChange={(e) => setForm({ ...form, food: e.target.value })} placeholder="Alimento (es. pasta al pomodoro)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <div className="flex gap-2">
            <input type="number" step="0.5" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Qtà" className="w-20 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
            <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="unità" className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} placeholder="Calorie" className="w-32 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="button" onClick={estimate} disabled={estimating || !form.food.trim()} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium hover:border-blue-400 disabled:opacity-50">
            {estimating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Stima IA
          </button>
          <button type="submit" className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Aggiungi
          </button>
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="font-semibold">Calorie ultimi 7 giorni</h3>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', fontSize: 12 }} cursor={{ fill: 'hsl(var(--muted))' }} />
              <Bar dataKey="kcal" radius={[6, 6, 0, 0]} fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : byDay.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          <Utensils className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-2">Nessun pasto registrato. Aggiungi il primo alimento.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {byDay.map(([date, list]) => {
            const total = list.reduce((a, i) => a + (i.calories || 0), 0);
            return (
              <div key={date}>
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-sm font-semibold">{date}</h4>
                  <span className="text-xs font-medium text-muted-foreground">{total} kcal</span>
                </div>
                <div className="mt-2 space-y-2">
                  {list.map((i) => {
                    const meal = MEALS.find((m) => m.id === i.meal);
                    return (
                      <motion.div key={i.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm">
                        <span className="text-lg">{meal?.emoji || '🍽️'}</span>
                        <div className="flex-1">
                          <p className="font-medium">{i.food}</p>
                          <p className="text-xs text-muted-foreground">{i.quantity} {i.unit} · {meal?.label}</p>
                        </div>
                        <span className="font-semibold text-emerald-600">{i.calories} kcal</span>
                        <button onClick={() => del(i.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}