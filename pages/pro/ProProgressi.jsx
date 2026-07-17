import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileDown, Loader2, Plus } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { useFitness } from '@/lib/FitnessContext';

export default function ProProgressi() {
  const { stats } = useFitness();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), weight_kg: '', workouts_done: 0, calories_burned: 0, notes: '' });
  const { toast } = useToast();

  const load = () => base44.entities.ProgressEntry.list('-date').then(setEntries).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await base44.entities.ProgressEntry.create({
      date: form.date,
      weight_kg: Number(form.weight_kg) || 0,
      workouts_done: Number(form.workouts_done) || 0,
      calories_burned: Number(form.calories_burned) || 0,
      notes: form.notes,
    });
    setForm({ date: new Date().toISOString().slice(0, 10), weight_kg: '', workouts_done: 0, calories_burned: 0, notes: '' });
    toast({ title: 'Progresso registrato 📈' });
    load();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18); doc.text('Progressi FitRoutine PRO', 14, 20);
    doc.setFontSize(11); doc.text(`Generato il ${new Date().toLocaleDateString('it-IT')}`, 14, 30);
    let y = 46;
    doc.setFontSize(12); doc.text('Riepilogo', 14, y); y += 8;
    doc.setFontSize(10);
    doc.text(`Allenamenti totali: ${stats.workouts}`, 14, y); y += 7;
    doc.text(`Giorni consecutivi: ${stats.streak}`, 14, y); y += 7;
    doc.text(`XP totali: ${stats.xp}`, 14, y); y += 7;
    doc.text(`Routine completata: ${stats.routinePercent}%`, 14, y); y += 12;
    doc.setFontSize(12); doc.text('Storico registrazioni', 14, y); y += 8;
    doc.setFontSize(9);
    entries.forEach((e) => {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.text(`${e.date}  |  ${e.weight_kg} kg  |  ${e.workouts_done} allenamenti  |  ${e.calories_burned} kcal`, 14, y);
      y += 6;
    });
    doc.save('progressi-fitroutine-pro.pdf');
    toast({ title: 'PDF esportato 📄' });
  };

  const chartData = [...entries].reverse().map((e) => ({ date: e.date.slice(5), peso: e.weight_kg, workouts: e.workouts_done }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Progressi</h1>
          <p className="mt-1 text-sm text-muted-foreground">Traccia peso, allenamenti e calorie nel tempo.</p>
        </div>
        <button onClick={exportPDF} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-sm transition-colors hover:border-blue-400">
          <FileDown className="h-4 w-4" /> Esporta PDF
        </button>
      </div>

      <form onSubmit={add} className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" step="0.1" value={form.weight_kg} onChange={(e) => setForm({ ...form, weight_kg: e.target.value })} placeholder="Peso (kg)" className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={form.workouts_done} onChange={(e) => setForm({ ...form, workouts_done: e.target.value })} placeholder="Allenamenti" className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={form.calories_burned} onChange={(e) => setForm({ ...form, calories_burned: e.target.value })} placeholder="Calorie" className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Registra
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : entries.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          <TrendingUp className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-2">Nessun dato. Registra il tuo primo progresso.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-semibold">Peso nel tempo</h3>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', fontSize: 12 }} />
                    <Line type="monotone" dataKey="peso" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-semibold">Allenamenti per registrazione</h3>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', fontSize: 12 }} cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Bar dataKey="workouts" radius={[6, 6, 0, 0]} fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {entries.map((e) => (
              <motion.div key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm">
                <span className="font-semibold">{e.date}</span>
                <span className="text-muted-foreground">⚖️ {e.weight_kg} kg</span>
                <span className="text-muted-foreground">💪 {e.workouts_done} allenamenti</span>
                <span className="text-muted-foreground">🔥 {e.calories_burned} kcal</span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}