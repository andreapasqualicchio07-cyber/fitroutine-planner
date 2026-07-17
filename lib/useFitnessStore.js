import { useState, useEffect, useMemo, useCallback } from 'react';
import { generateRoutine, BADGES, estimateDayDuration } from './fitnessData';

const KEY = 'fitroutine_state_v1';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function computeStreak(dates) {
  if (!dates.length) return 0;
  const set = new Set(dates);
  let streak = 0;
  const d = new Date();
  if (!set.has(formatDate(d))) d.setDate(d.getDate() - 1);
  while (set.has(formatDate(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function useFitnessStore() {
  const [state, setState] = useState(() => {
    const s = load();
    return {
      goal: s.goal || 'dimagrimento',
      level: s.level || 'intermedio',
      seed: s.seed || 0,
      soundEnabled: s.soundEnabled ?? true,
      theme: s.theme || 'light',
      profile: s.profile || { name: '', weight: '', height: '' },
      completed: s.completed || [],
      exerciseNotes: s.exerciseNotes || {},
    };
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const routine = useMemo(
    () => generateRoutine(state.goal, state.level, state.seed),
    [state.goal, state.level, state.seed]
  );

  const stats = useMemo(() => {
    const workouts = state.completed.length;
    const dates = state.completed.map((c) => c.date);
    const streak = computeStreak(dates);
    const totalTime = state.completed.reduce((a, c) => a + c.durationSec, 0);
    const uniqueDays = new Set(state.completed.map((c) => c.day)).size;
    const routinePercent = Math.min(100, Math.round((uniqueDays / 7) * 100));
    const xp = state.completed.reduce((a, c) => a + c.xp, 0);
    return { workouts, streak, totalTime, routinePercent, xp };
  }, [state.completed]);

  const unlockedBadges = useMemo(
    () => BADGES.filter((b) => b.check(stats)).map((b) => b.id),
    [stats]
  );

  const isDayCompleted = useCallback(
    (dayName) => {
      const today = formatDate(new Date());
      return state.completed.some((c) => c.day === dayName && c.date === today);
    },
    [state.completed]
  );

  const completeWorkout = useCallback(
    (dayName) => {
      const today = formatDate(new Date());
      let result = { alreadyDone: false, xp: 0 };
      setState((prev) => {
        if (prev.completed.some((c) => c.day === dayName && c.date === today)) {
          result.alreadyDone = true;
          return prev;
        }
        const day = generateRoutine(prev.goal, prev.level, prev.seed).find((d) => d.day === dayName);
        const dur = estimateDayDuration(day);
        const xp = 50 + (day && day.type === 'workout' ? 50 : 20);
        result.xp = xp;
        return {
          ...prev,
          completed: [...prev.completed, { date: today, day: dayName, durationSec: dur, xp }],
        };
      });
      return result;
    },
    []
  );

  const actions = {
    setGoal: (goal) => setState((p) => ({ ...p, goal })),
    setLevel: (level) => setState((p) => ({ ...p, level })),
    regenerate: () => setState((p) => ({ ...p, seed: Math.floor(Math.random() * 100000) })),
    toggleSound: () => setState((p) => ({ ...p, soundEnabled: !p.soundEnabled })),
    toggleTheme: () => setState((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' })),
    updateProfile: (profile) => setState((p) => ({ ...p, profile })),
    setExerciseNote: (name, note) => setState((p) => ({ ...p, exerciseNotes: { ...p.exerciseNotes, [name]: note } })),
    completeWorkout,
  };

  return { ...state, routine, stats, unlockedBadges, isDayCompleted, ...actions };
}