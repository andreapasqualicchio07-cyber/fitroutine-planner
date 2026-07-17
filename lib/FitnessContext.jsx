import React, { createContext, useContext } from 'react';
import { useFitnessStore } from './useFitnessStore';

const Ctx = createContext(null);

export function FitnessProvider({ children }) {
  const store = useFitnessStore();
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useFitness() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFitness must be used within FitnessProvider');
  return ctx;
}