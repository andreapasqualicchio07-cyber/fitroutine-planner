import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Moon, Sun, Volume2, VolumeX, User, Crown, LogOut, Menu } from 'lucide-react';
import { useFitness } from '@/lib/FitnessContext';
import { usePro } from '@/lib/ProContext';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { theme, toggleTheme, soundEnabled, toggleSound } = useFitness();
  const { isPro } = usePro();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (to, label) => (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium transition-colors hover:text-blue-600',
        pathname === to ? 'text-blue-600' : 'text-muted-foreground'
      )}
    >
      {label}
    </Link>
  );

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

        <nav className="hidden items-center gap-6 md:flex">
          {navItem('/app', 'Home')}
          {navItem('/pricing', 'Prezzi')}
          {navItem('/profilo', 'Profilo')}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Apri menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={toggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to={isPro ? '/pro/dashboard' : '/pricing'}
            className={cn(
              'flex h-9 items-center justify-center gap-1 rounded-lg px-2.5 text-xs font-semibold transition-colors',
              isPro ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' : 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950'
            )}
            aria-label="PRO"
          >
            <Crown className="h-4 w-4" />
            {isPro ? 'Area PRO' : 'Passa a PRO'}
          </Link>
          <Link
            to="/profilo"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Profile"
          >
            <User className="h-4 w-4" />
          </Link>
          <button
            onClick={() => base44.auth.logout('/')}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-16 z-30 border-b border-border bg-background shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            <Link to="/app" onClick={() => setMenuOpen(false)} className={cn('rounded-lg px-3 py-3 text-sm font-medium', pathname === '/app' ? 'text-blue-600' : 'text-foreground')}>Home</Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)} className={cn('rounded-lg px-3 py-3 text-sm font-medium', pathname === '/pricing' ? 'text-blue-600' : 'text-foreground')}>Prezzi</Link>
            <Link to="/profilo" onClick={() => setMenuOpen(false)} className={cn('rounded-lg px-3 py-3 text-sm font-medium', pathname === '/profilo' ? 'text-blue-600' : 'text-foreground')}>Profilo</Link>
          </nav>
        </div>
      )}
      {menuOpen && <div className="fixed inset-0 top-16 z-20 bg-black/40 md:hidden" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}