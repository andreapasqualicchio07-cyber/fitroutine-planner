import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function ProRoute({ children }) {
  const [state, setState] = useState('loading');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const me = await base44.auth.me();
        if (!me?.email) { if (active) setState('no'); return; }
        const records = await base44.entities.ProUser.filter({ email: me.email });
        if (active) setState(records.length > 0 ? 'ok' : 'no');
      } catch {
        if (active) setState('no');
      }
    })();
    return () => { active = false; };
  }, []);

  if (state === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }
  if (state === 'no') return <Navigate to="/pricing" replace />;
  return children;
}