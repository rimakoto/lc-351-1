export interface PasswordCheckItem {
  id: string;
  label: string;
  passed: boolean;
}

export interface PasswordCheckResult {
  score: number;
  level: 'empty' | 'weak' | 'medium' | 'strong';
  label: string;
  color: string;
  checks: PasswordCheckItem[];
}

const SPECIAL_CHARS = /[!@#$%^&*()_+\-=\[\]{}|;':",./<>?`~\\]/;

export function checkPasswordStrength(password: string): PasswordCheckResult {
  if (!password) {
    return {
      score: 0,
      level: 'empty',
      label: '请输入密码',
      color: '#6b7280',
      checks: getInitialChecks(),
    };
  }

  const checks: PasswordCheckItem[] = [
    {
      id: 'length',
      label: '长度至少 8 位',
      passed: password.length >= 8,
    },
    {
      id: 'lengthExtra',
      label: '长度达到 12 位以上更佳',
      passed: password.length >= 12,
    },
    {
      id: 'uppercase',
      label: '包含大写字母 (A-Z)',
      passed: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: '包含小写字母 (a-z)',
      passed: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: '包含数字 (0-9)',
      passed: /[0-9]/.test(password),
    },
    {
      id: 'special',
      label: '包含特殊符号 (!@#$%^&* 等)',
      passed: SPECIAL_CHARS.test(password),
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = calculateScore(password, checks, passedCount);
  const { level, label, color } = getLevelInfo(score, password);

  return { score, level, label, color, checks };
}

function getInitialChecks(): PasswordCheckItem[] {
  return [
    { id: 'length', label: '长度至少 8 位', passed: false },
    { id: 'lengthExtra', label: '长度达到 12 位以上更佳', passed: false },
    { id: 'uppercase', label: '包含大写字母 (A-Z)', passed: false },
    { id: 'lowercase', label: '包含小写字母 (a-z)', passed: false },
    { id: 'number', label: '包含数字 (0-9)', passed: false },
    { id: 'special', label: '包含特殊符号 (!@#$%^&* 等)', passed: false },
  ];
}

function calculateScore(
  password: string,
  checks: PasswordCheckItem[],
  passedCount: number
): number {
  let score = 0;

  const baseChecks = checks.filter(
    (c) => c.id !== 'lengthExtra' && c.passed
  ).length;
  score += baseChecks * 18;

  if (checks.find((c) => c.id === 'lengthExtra')?.passed) {
    score += 10;
  }

  if (password.length >= 16) {
    score += 8;
  }

  if (password.length >= 20) {
    score += 5;
  }

  const varietyBonus = calculateVarietyBonus(password);
  score += varietyBonus;

  return Math.min(100, Math.max(0, score));
}

function calculateVarietyBonus(password: string): number {
  const types = new Set<string>();
  for (const char of password) {
    if (/[A-Z]/.test(char)) types.add('uppercase');
    else if (/[a-z]/.test(char)) types.add('lowercase');
    else if (/[0-9]/.test(char)) types.add('number');
    else if (SPECIAL_CHARS.test(char)) types.add('special');
  }
  if (types.size >= 4) return 5;
  if (types.size === 3) return 2;
  return 0;
}

function getLevelInfo(
  score: number,
  password: string
): { level: 'weak' | 'medium' | 'strong'; label: string; color: string } {
  if (!password || score < 30) {
    return { level: 'weak', label: '弱', color: '#ef4444' };
  }
  if (score < 70) {
    return { level: 'medium', label: '中', color: '#eab308' };
  }
  return { level: 'strong', label: '强', color: '#22c55e' };
}
