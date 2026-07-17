import { useState } from 'react';
import { Download, WifiOff, Wifi, CheckCircle2, Trash2, Dumbbell, Video } from 'lucide-react';
import { useFitness } from '@/lib/FitnessContext';
import { generateRoutine } from '@/lib/fitnessData';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const OFFLINE_KEY = 'fitroutine_offline';

export default function ProOffline() {
  const { goal, level, seed } = useFitness();
  const { toast } = useToast();
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(OFFLINE_KEY)) || { mode: false, routine: null, videos: [] }; }
    catch { return { mode: false, routine: null, videos: [] }; }
  });

  const persist = (d) => { localStorage.setItem(OFFLINE_KEY, JSON.stringify(d)); setData(d); };

  const downloadRoutine = () => {
    const routine = generateRoutine(goal, level, seed);
    persist({ ...data, routine });
    toast({ title: 'Scheda scaricata ✓', description: 'Disponibile anche senza connessione.' });
  };

  const downloadVideos = () => {
    const videos = [
      { name: 'Coaching Push Up', url: 'offline' },
      { name: 'Coaching Squat', url: 'offline' },
      { name: 'Coaching Plank', url: 'offline' },
    ];
    persist({ ...data, videos });
    toast({ title: 'Video scaricati ✓', description: 'Coaching disponibile offline.' });
  };

  const clear = () => { persist({ mode: false, routine: null, videos: [] }); toast({ title: 'Contenuti offline rimossi' }); };

  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <WifiOff className="h-6 w-6 text-blue-600" /> Modalità Offline
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Scarica schede e video per allenarti anche senza connessione internet.</p>

      <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-blue-600 to-emerald-500 p-5 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data.mode ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
            <span className="font-semibold">Modalità Offline</span>
          </div>
          <button
            onClick={() => persist({ ...data, mode: !data.mode })}
            className={cn('relative h-7 w-12 rounded-full transition-colors', data.mode ? 'bg-white' : 'bg-white/30')}
            aria-label="Toggle offline"
          >
            <span className={cn('absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform', data.mode ? 'translate-x-5' : 'translate-x-0.5')} />
          </button>
        </div>
        <p className="mt-2 text-xs text-white/80">
          {data.mode ? 'Attiva: l\'app userà i contenuti scaricati quando sei offline.' : 'Disattivata. Attiva per usare i contenuti scaricati senza connessione.'}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Scheda attuale</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Salva la routine settimanale per consultarla offline.</p>
          <button onClick={downloadRoutine} className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            <Download className="h-4 w-4" /> Scarica scheda
          </button>
          {data.routine && (
            <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> {data.routine.filter((d) => d.type === 'workout').length} allenamenti salvati
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold">Video coaching</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Scarica i video dei fondamentali per la libreria offline.</p>
          <button onClick={downloadVideos} className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            <Download className="h-4 w-4" /> Scarica video
          </button>
          {data.videos.length > 0 && (
            <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> {data.videos.length} video salvati
            </p>
          )}
        </div>
      </div>

      {(data.routine || data.videos.length > 0) && (
        <button onClick={clear} className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:border-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" /> Rimuovi contenuti offline
        </button>
      )}
    </div>
  );
}