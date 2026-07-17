import { Link } from 'react-router-dom';
import { Dumbbell, Menu } from 'lucide-react';
import { useState } from 'react';

export default function LandingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-sm">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            FitRoutine <span className="text-blue-600">Planner</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#come-funziona" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Come funziona</a>
          <a href="#vantaggi" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Vantaggi</a>
          <a href="#mockup" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Anteprima</a>
          <Link to="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Prezzi</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/register"
            className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:inline-flex"
          >
            Inizia gratis
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <a href="#come-funziona" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">Come funziona</a>
          <a href="#vantaggi" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">Vantaggi</a>
          <a href="#mockup" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">Anteprima</a>
          <Link to="/pricing" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">Prezzi</Link>
          <Link to="/register" className="mt-2 block rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white">Inizia gratis</Link>
        </div>
      )}
    </header>
  );
}