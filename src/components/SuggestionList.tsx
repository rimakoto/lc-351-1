import { CheckCircle2, Circle } from 'lucide-react';
import type { PasswordCheckItem } from '@/utils/passwordChecker';

interface SuggestionListProps {
  checks: PasswordCheckItem[];
  hasInput: boolean;
}

export default function SuggestionList({
  checks,
  hasInput,
}: SuggestionListProps) {
  return (
    <div className="w-full space-y-3">
      <div className="text-sm font-medium text-slate-300">安全建议</div>
      <div className="space-y-2">
        {checks.map((check) => {
          const isPassed = check.passed;
          return (
            <div
              key={check.id}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 ${
                isPassed
                  ? 'bg-emerald-500/10'
                  : hasInput
                    ? 'bg-slate-700/30'
                    : 'bg-slate-700/20'
              }`}
            >
              {isPassed ? (
                <CheckCircle2
                  className="w-5 h-5 text-emerald-400 shrink-0 transition-all duration-300"
                  strokeWidth={2}
                />
              ) : (
                <Circle
                  className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                    hasInput ? 'text-slate-500' : 'text-slate-600'
                  }`}
                  strokeWidth={1.5}
                />
              )}
              <span
                className={`text-sm transition-all duration-300 ${
                  isPassed
                    ? 'text-emerald-400 line-through opacity-70'
                    : hasInput
                      ? 'text-slate-300'
                      : 'text-slate-500'
                }`}
              >
                {check.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
