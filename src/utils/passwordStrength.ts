
import { Shield, AlertTriangle, X } from 'lucide-react';

export interface PasswordStrength {
  level: number;
  text: string;
  color: string;
  icon: typeof Shield | typeof AlertTriangle | typeof X;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return { level: 0, text: '', color: '', icon: X };
  
  let score = 0;
  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
  };

  score = Object.values(checks).filter(Boolean).length;
  
  if (score <= 2) return { level: 1, text: 'Fraca', color: 'text-red-500', icon: X };
  if (score <= 3) return { level: 2, text: 'Média', color: 'text-yellow-500', icon: AlertTriangle };
  if (score <= 4) return { level: 3, text: 'Forte', color: 'text-green-500', icon: Shield };
  return { level: 4, text: 'Muito Forte', color: 'text-emerald-500', icon: Shield };
};
