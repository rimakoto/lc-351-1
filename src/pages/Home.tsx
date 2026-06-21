import { useState, useMemo } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import PasswordInput from '@/components/PasswordInput';
import StrengthBar from '@/components/StrengthBar';
import SuggestionList from '@/components/SuggestionList';
import { checkPasswordStrength } from '@/utils/passwordChecker';

export default function Home() {
  const [password, setPassword] = useState('');

  const result = useMemo(() => checkPasswordStrength(password), [password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl shadow-black/50 p-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 mb-2">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              密码强度检测器
            </h1>
            <p className="text-sm text-slate-400">
              实时检测密码安全程度，获得改进建议
            </p>
          </div>

          <div className="space-y-6">
            <PasswordInput value={password} onChange={setPassword} />

            <StrengthBar
              score={result.score}
              level={result.level}
              label={result.label}
              color={result.color}
            />

            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <SuggestionList checks={result.checks} hasInput={password.length > 0} />
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-start gap-3 text-xs text-slate-500">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <p>
                您的密码不会上传到任何服务器，所有检测均在您的浏览器本地完成。关闭页面后不留任何痕迹，请放心使用。
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          所有判断完全在本地执行 · 零数据上传
        </p>
      </div>
    </div>
  );
}
