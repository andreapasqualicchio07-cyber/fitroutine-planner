import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { STRIPE_PAYMENT_LINK } from './stripeConfig';

const LS_KEY = 'fitroutine_pro';
const Ctx = createContext(null);

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(() => localStorage.getItem(LS_KEY) === '1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.auth.isAuthenticated().then((ok) => {
      if (!ok) { if (active) setLoading(false); return; }
      base44.auth.me().then((u) => {
        if (!active) return;
        const pro = !!u?.is_pro;
        setIsPro(pro);
        localStorage.setItem(LS_KEY, pro ? '1' : '0');
      }).catch(() => {}).finally(() => { if (active) setLoading(false); });
    }).catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const activatePro = useCallback(async () => {
    setIsPro(true);
    localStorage.setItem(LS_KEY, '1');
    try {
      const ok = await base44.auth.isAuthenticated();
      if (ok) await base44.auth.updateMe({ is_pro: true });
    } catch (e) { /* ignore */ }
  }, []);

  const checkout = useCallback(() => {
    if (!STRIPE_PAYMENT_LINK) return false;
    window.location.href = STRIPE_PAYMENT_LINK;
    return true;
  }, []);

  return (
    <Ctx.Provider value={{ isPro, loading, activatePro, checkout }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePro() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePro must be used within ProProvider');
  return ctx;
}