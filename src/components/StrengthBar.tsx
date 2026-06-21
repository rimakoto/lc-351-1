import { Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

interface StrengthBarProps {
  score: number;
  level: 'empty' | 'weak' | 'medium' | 'strong';
  label: string;
  color: string;
}

export default function StrengthBar({
  score,
  level,
  label,
  color,
}: StrengthBarProps) {
  const IconComponent =
    level === 'empty'
      ? ShieldX
      : level === 'weak'
        ? ShieldAlert
        : level === 'medium'
          ? Shield
          : ShieldCheck;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconComponent
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: level === 'empty' ? '#6b7280' : color }}
          />
          <span className="text-sm font-medium text-slate-300">密码强度</span>
        </div>
        <span
          className="text-sm font-semibold transition-colors duration-300"
          style={{ color: level === 'empty' ? '#6b7280' : color }}
        >
          {label} {level !== 'empty' && `· ${score}%`}
        </span>
      </div>
      <div className="h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${score}%`,
            backgroundColor: level === 'empty' ? '#475569' : color,
            boxShadow:
              level !== 'empty'
                ? `0 0 10px ${color}80, 0 0 20px ${color}40`
                : 'none',
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>弱</span>
        <span>中</span>
        <span>强</span>
      </div>
    </div>
  );
}
