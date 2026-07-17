import { cn } from '@/lib/utils';

export default function ProgressBar({ value, className, barClassName }) {
  const v = Math.min(100, Math.max(0, value || 0));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className={cn('h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-700 ease-out', barClassName)}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}