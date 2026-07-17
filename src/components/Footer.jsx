import { Dumbbell, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span>FitRoutine Planner · MVP</span>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          Creato con <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> per il tuo benessere
        </p>
      </div>
    </footer>
  );
}