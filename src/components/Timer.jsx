import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { playBeep } from '@/lib/sound';
import { cn } from '@/lib/utils';

export default function Timer({ seconds, soundEnabled }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setRemaining(seconds);
    setRunning(false);
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(ref.current);
          setRunning(false);
          playBeep(soundEnabled);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [running, soundEnabled]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const pct = seconds ? (remaining / seconds) * 100 : 0;
  const done = remaining === 0;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <svg className="absolute h-12 w-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
          <circle
            cx="24" cy="24" r="20" fill="none" strokeWidth="4" strokeLinecap="round"
            className={done ? 'text-emerald-500' : 'text-blue-600'}
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * pct) / 100}
          />
        </svg>
        <span className="text-[10px] font-bold tabular-nums">{mm}:{ss}</span>
      </div>
      <div className="flex gap-1.5">
        <button
          onClick={() => setRunning((r) => !r)}
          disabled={done}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors disabled:opacity-40',
            running ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
          )}
          aria-label={running ? 'Pausa' : 'Start'}
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          onClick={() => { setRunning(false); setRemaining(seconds); }}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-muted/70"
          aria-label="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}