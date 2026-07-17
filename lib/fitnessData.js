export const GOALS = [
  { id: 'dimagrimento', label: 'Dimagrimento', emoji: '🔥', gradient: 'from-orange-400 to-red-500', desc: 'Brucia grassi e aumenta la resistenza cardiovascolare' },
  { id: 'flessibilita', label: 'Flessibilità', emoji: '🤸', gradient: 'from-emerald-400 to-teal-500', desc: 'Migliora mobilità, elasticità e controllo del corpo' },
  { id: 'massa', label: 'Aumento massa muscolare', emoji: '💪', gradient: 'from-blue-500 to-indigo-600', desc: 'Costruisci forza e volume muscolare' },
];

export const LEVELS = [
  { id: 'principiante', label: 'Principiante', mult: 0.7 },
  { id: 'intermedio', label: 'Intermedio', mult: 1 },
  { id: 'avanzato', label: 'Avanzato', mult: 1.35 },
];

export const ADVANCED_LEVELS = [
  { id: 'elite', label: 'Elite', mult: 1.6, pro: true },
  { id: 'atleta', label: 'Atleta', mult: 1.85, pro: true },
];

export const ADVANCED_GOALS = [
  { id: 'resistenza', label: 'Resistenza', emoji: '🏃', gradient: 'from-amber-400 to-orange-500', desc: 'Aumenta capacità cardiovascolare e resistenza muscolare', pro: true },
  { id: 'potenza', label: 'Potenza', emoji: '⚡', gradient: 'from-yellow-400 to-amber-500', desc: 'Sviluppa esplosività e forza esplosiva', pro: true },
  { id: 'postura', label: 'Postura', emoji: '🧍', gradient: 'from-teal-400 to-cyan-500', desc: 'Migliora postura e stabilità del core', pro: true },
];

const IMG = 'https://media.base44.com/images/public/6a53b70a11cacb5e38a874ee';

const EXERCISES = {
  'Push Up': { emoji: '👊', desc: 'Petto, spalle e tricipiti', sets: 3, reps: 12, rest: 60, unit: 'reps', image: `${IMG}/607740bb9_generated_image.png` },
  'Squat': { emoji: '🦵', desc: 'Gambe e glutei', sets: 3, reps: 15, rest: 60, unit: 'reps', image: `${IMG}/80d20398d_generated_image.png` },
  'Plank': { emoji: '🧘', desc: 'Core e stabilità', sets: 3, reps: 30, rest: 45, unit: 'sec', image: `${IMG}/e4108019f_generated_image.png` },
  'Affondi': { emoji: '🚶', desc: 'Gambe e glutei', sets: 3, reps: 12, rest: 60, unit: 'reps', image: `${IMG}/9505b6ac4_generated_image.png` },
  'Mountain Climbers': { emoji: '⛰️', desc: 'Cardio e core', sets: 3, reps: 20, rest: 45, unit: 'reps', image: `${IMG}/cf4145ad1_generated_image.png` },
  'Crunch': { emoji: '🔥', desc: 'Addominali alti', sets: 3, reps: 15, rest: 45, unit: 'reps', image: `${IMG}/65594cf6d_generated_image.png` },
  'Burpees': { emoji: '💥', desc: 'Full body cardio', sets: 3, reps: 10, rest: 75, unit: 'reps', image: `${IMG}/2c867ce61_generated_image.png` },
  'Superman': { emoji: '🦸', desc: 'Bassa schiena', sets: 3, reps: 12, rest: 45, unit: 'reps', image: `${IMG}/61fccbab1_generated_image.png` },
  'Side Plank': { emoji: '↔️', desc: 'Fianchi e core', sets: 3, reps: 25, rest: 45, unit: 'sec', image: `${IMG}/828849f6d_generated_image.png` },
  'Jump Squat': { emoji: '🤸', desc: 'Esplosività gambe', sets: 3, reps: 12, rest: 60, unit: 'reps', image: `${IMG}/1190c6ad3_generated_image.png` },
  'Pike Push Up': { emoji: '🔺', desc: 'Spalle e tricipiti', sets: 3, reps: 10, rest: 60, unit: 'reps', image: `${IMG}/cd34f446e_generated_image.png` },
  'Russian Twist': { emoji: '🌀', desc: 'Obliqui e core', sets: 3, reps: 20, rest: 45, unit: 'reps', image: `${IMG}/562d61b3d_generated_image.png` },
  'Diamond Push Up': { emoji: '🔷', desc: 'Tricipiti e petto interno', sets: 3, reps: 10, rest: 60, unit: 'reps', image: `${IMG}/9d6bcfdc1_generated_image.png` },
  'Wall Sit': { emoji: '🧱', desc: 'Quadricipiti e resistenza', sets: 3, reps: 45, rest: 45, unit: 'sec', image: `${IMG}/0ec0d85b3_generated_image.png` },
  'Glute Bridge': { emoji: '🌉', desc: 'Glutei e catena posteriore', sets: 3, reps: 15, rest: 45, unit: 'reps', image: `${IMG}/7842b650c_generated_image.png` },
  'Reverse Crunch': { emoji: '🔄', desc: 'Addominali bassi', sets: 3, reps: 12, rest: 45, unit: 'reps', image: `${IMG}/19da0fa0d_generated_image.png` },
  'Calf Raise': { emoji: '🦶', desc: 'Polpacci', sets: 3, reps: 20, rest: 30, unit: 'reps', image: `${IMG}/6dbd74cc1_generated_image.png` },
  'Jumping Jacks': { emoji: '⭐', desc: 'Cardio full body', sets: 3, reps: 30, rest: 30, unit: 'reps', image: `${IMG}/464bfc9d9_generated_image.png` },
  'Hollow Body Hold': { emoji: '🛶', desc: 'Core e controllo corporeo', sets: 3, reps: 30, rest: 45, unit: 'sec', image: `${IMG}/ed1310222_generated_image.png` },
  'Inchworm': { emoji: '🐛', desc: 'Full body e mobilità', sets: 3, reps: 10, rest: 45, unit: 'reps', image: `${IMG}/5096a5606_generated_image.png` },
  'Tricep Dip': { emoji: '💪', desc: 'Tricipiti e spalle', sets: 3, reps: 12, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Wide Push Up': { emoji: '🖐️', desc: 'Petto esterno', sets: 3, reps: 12, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Decline Push Up': { emoji: '⬇️', desc: 'Petto alto e spalle', sets: 3, reps: 10, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Leg Raise': { emoji: '🦵', desc: 'Addominali bassi', sets: 3, reps: 12, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Bicycle Crunch': { emoji: '🚴', desc: 'Obliqui e addome', sets: 3, reps: 20, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Bird Dog': { emoji: '🐕', desc: 'Core e stabilità', sets: 3, reps: 12, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Cossack Squat': { emoji: '🦵', desc: 'Gambe e mobilità', sets: 3, reps: 10, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Step Up': { emoji: '🪜', desc: 'Gambe e glutei', sets: 3, reps: 12, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Tuck Jump': { emoji: '🦘', desc: 'Esplosività e cardio', sets: 3, reps: 10, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Plank to Push Up': { emoji: '📊', desc: 'Core e petto', sets: 3, reps: 10, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Bear Crawl': { emoji: '🐻', desc: 'Core e full body', sets: 3, reps: 30, rest: 45, unit: 'sec', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Spiderman Push Up': { emoji: '🕷️', desc: 'Petto e core', sets: 3, reps: 10, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'V-Up': { emoji: '✌️', desc: 'Addome completo', sets: 3, reps: 12, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Flutter Kick': { emoji: '💧', desc: 'Addome basso', sets: 3, reps: 30, rest: 45, unit: 'sec', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Shoulder Tap': { emoji: '👋', desc: 'Spalle e core', sets: 3, reps: 20, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Reverse Lunge': { emoji: '🔙', desc: 'Gambe e glutei', sets: 3, reps: 12, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Side Lunge': { emoji: '↔️', desc: 'Adduttori e gambe', sets: 3, reps: 12, rest: 60, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
  'Donkey Kick': { emoji: '🐴', desc: 'Glutei', sets: 3, reps: 15, rest: 45, unit: 'reps', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80' },
};

const WEEK_BASE = [
  { day: 'Lunedì', type: 'workout', exercises: ['Push Up', 'Squat', 'Plank', 'Diamond Push Up', 'Glute Bridge'] },
  { day: 'Martedì', type: 'workout', exercises: ['Affondi', 'Mountain Climbers', 'Crunch', 'Reverse Crunch', 'Jumping Jacks'] },
  { day: 'Mercoledì', type: 'recovery', label: 'Recupero attivo', desc: 'Stretching, camminata leggera o yoga per 20-30 minuti' },
  { day: 'Giovedì', type: 'workout', exercises: ['Burpees', 'Superman', 'Side Plank', 'Wall Sit', 'Hollow Body Hold'] },
  { day: 'Venerdì', type: 'workout', exercises: ['Jump Squat', 'Pike Push Up', 'Russian Twist', 'Calf Raise', 'Inchworm'] },
  { day: 'Sabato', type: 'light', label: 'Allenamento leggero', desc: 'Jogging leggero, mobilità articolare o passeggiata attiva' },
  { day: 'Domenica', type: 'rest', label: 'Riposo', desc: 'Recupero completo, idratazione e sonno di qualità' },
];

function goalAdjust(goalId) {
  switch (goalId) {
    case 'dimagrimento': return { repsMult: 1.25, restMult: 0.7, setsAdd: 0 };
    case 'flessibilita': return { repsMult: 1.15, restMult: 0.85, setsAdd: 0 };
    case 'massa': return { repsMult: 0.8, restMult: 1.5, setsAdd: 1 };
    case 'resistenza': return { repsMult: 1.3, restMult: 0.6, setsAdd: 1 };
    case 'potenza': return { repsMult: 0.7, restMult: 1.6, setsAdd: 1 };
    case 'postura': return { repsMult: 1.1, restMult: 0.9, setsAdd: 0 };
    default: return { repsMult: 1, restMult: 1, setsAdd: 0 };
  }
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateRoutine(goalId, levelId, seed = 0) {
  const lvl = LEVELS.find((l) => l.id === levelId) || LEVELS[1];
  const adj = goalAdjust(goalId);
  return WEEK_BASE.map((d) => {
    if (d.type !== 'workout') return { ...d };
    let exs = [...d.exercises];
    if (seed) {
      const rng = mulberry32(seed);
      for (let i = exs.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [exs[i], exs[j]] = [exs[j], exs[i]];
      }
    }
    const exercises = exs.map((name) => {
      const e = EXERCISES[name];
      const sets = Math.max(2, Math.round(e.sets + adj.setsAdd));
      const reps = Math.max(5, Math.round(e.reps * adj.repsMult * lvl.mult));
      const rest = Math.max(20, Math.round(e.rest * adj.restMult));
      return { name, emoji: e.emoji, desc: e.desc, sets, reps, rest, unit: e.unit, image: e.image };
    });
    return { ...d, exercises };
  });
}

export const EXERCISE_LIST = Object.entries(EXERCISES).map(([name, v]) => ({ name, ...v }));

export const FULL_BODY_EXERCISES = ['Burpees', 'Squat', 'Push Up', 'Plank', 'Mountain Climbers', 'Affondi', 'Superman', 'Russian Twist'];

export function generateFullBodyRoutine(goalId, levelId, seed = 0) {
  const lvl = LEVELS.find((l) => l.id === levelId) || LEVELS[1];
  const adj = goalAdjust(goalId);
  let exs = [...FULL_BODY_EXERCISES];
  if (seed) {
    const rng = mulberry32(seed);
    for (let i = exs.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [exs[i], exs[j]] = [exs[j], exs[i]];
    }
  }
  return exs.map((name) => {
    const e = EXERCISES[name];
    const sets = Math.max(2, Math.round(e.sets + adj.setsAdd));
    const reps = Math.max(5, Math.round(e.reps * adj.repsMult * lvl.mult));
    const rest = Math.max(20, Math.round(e.rest * adj.restMult));
    return { name, emoji: e.emoji, desc: e.desc, sets, reps, rest, unit: e.unit, image: e.image };
  });
}

export function estimateDayDuration(day) {
  if (!day || day.type !== 'workout') return 0;
  return day.exercises.reduce((acc, e) => {
    const work = e.unit === 'sec' ? e.reps : e.reps * 2;
    return acc + e.sets * (work + e.rest);
  }, 0);
}

export const BADGES = [
  { id: 'first', label: 'Primo Passo', emoji: '🎯', desc: 'Completa il tuo primo allenamento', check: (s) => s.workouts >= 1 },
  { id: 'streak3', label: 'Costanza', emoji: '🔥', desc: '3 giorni consecutivi', check: (s) => s.streak >= 3 },
  { id: 'streak7', label: 'Settimana Perfetta', emoji: '🏆', desc: '7 giorni consecutivi', check: (s) => s.streak >= 7 },
  { id: 'workouts10', label: 'Dieci Sessioni', emoji: '💪', desc: 'Completa 10 allenamenti', check: (s) => s.workouts >= 10 },
  { id: 'xp500', label: 'Esperto', emoji: '⭐', desc: 'Raggiungi 500 XP', check: (s) => s.xp >= 500 },
  { id: 'xp1000', label: 'Atleta', emoji: '🥇', desc: 'Raggiungi 1000 XP', check: (s) => s.xp >= 1000 },
];

export const MOTIVATIONS = [
  'Grande lavoro! Ogni ripetizione conta. 💪',
  'Continua così, stai superando i tuoi limiti! 🚀',
  'Il tuo corpo ti ringrazia. Ottima sessione! 🌟',
  'Disciplina batte motivazione. E tu ce l\u2019hai! 🔥',
  'Un passo alla volta verso il tuo obiettivo! 🎯',
];