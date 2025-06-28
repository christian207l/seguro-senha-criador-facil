
import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPasswordStrength } from '@/utils/passwordStrength';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  onCopy: () => void;
}

const PasswordDisplay = ({ password, copied, onCopy }: PasswordDisplayProps) => {
  const strength = getPasswordStrength(password);
  const StrengthIcon = strength.icon;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Senha Gerada</label>
        {password && StrengthIcon && (
          <div className={`flex items-center gap-1 text-sm ${strength.color}`}>
            <StrengthIcon size={16} />
            {strength.text}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 p-3 bg-gray-50 border rounded-lg font-mono text-lg break-all min-h-[50px] flex items-center">
          {password || "Clique em 'Gerar Senha' para começar"}
        </div>
        <Button
          onClick={onCopy}
          disabled={!password}
          variant="outline"
          size="icon"
          className="h-[50px] w-[50px]"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default PasswordDisplay;
