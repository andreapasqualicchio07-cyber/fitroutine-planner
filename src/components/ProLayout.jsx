import { useState, Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, Utensils, TrendingUp, Calendar, Trophy, Bot, MessageSquare, Crown, Menu, X, ArrowLeft, Wand2, Layers, Gift, WifiOff, PlayCircle } from 'lucide-react';
import AnimatedOutlet from '@/components/AnimatedOutlet';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/pro/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/pro/workout', label: 'Workout', icon: Dumbbell },
  { to: '/pro/diario', label: 'Diario', icon: Utensils },
  { to: '/pro/schede', label: 'Schede', icon: Layers },
  { to: '/pro/progressi', label: 'Progressi', icon: TrendingUp },
  { to: '/pro/calendario', label: 'Calendario', icon: Calendar },
  { to: '/pro/sfide', label: 'Sfide', icon: Trophy },
  { to: '/pro/video', label: 'Video', icon: PlayCircle },
  { to: '/pro/ricompense', label: 'Ricompense', icon: Gift },
  { to: '/pro/offline', label: 'Offline', icon: WifiOff },
  { to: '/pro/bot', label: 'Coach IA', icon: Bot },
  { to: '/pro/assistente', label: 'Assistente', icon: Wand2 },
  { to: '/pro/feedback', label: 'Feedback', icon: MessageSquare },
];

function Loader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
    </div>
  );
}

export default function ProLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <Link to="/pro/dashboard" className="flex items-center gap-2 font-bold">
          <Crown className="h-5 w-5 text-amber-500" /> Area PRO
        </Link>
        <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-muted"><Menu className="h-5 w-5" /></button>
      </div>

      <div className="flex">
        <aside className={cn('fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-background transition-transform lg:static lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Link to="/pro/dashboard" className="flex items-center gap-2 font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><Crown className="h-4 w-4" /></div>
              Area PRO
            </Link>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-muted lg:hidden"><X className="h-5 w-5" /></button>
          </div>
          <nav className="space-y-1 p-3">
            {NAV.map((n) => {
              const active = n.end ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors', active ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground')}>
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-full border-t border-border p-3">
            <Link to="/app" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted">
              <ArrowLeft className="h-4 w-4" /> Torna all'app
            </Link>
          </div>
        </aside>
        {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

        <main className="min-h-screen flex-1 px-4 py-6 sm:px-8 lg:px-10">
          <Suspense fallback={<Loader />}>
            <AnimatedOutlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}