
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface PasswordOptionsProps {
  length: number[];
  onLengthChange: (value: number[]) => void;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  onUppercaseChange: (checked: boolean) => void;
  onLowercaseChange: (checked: boolean) => void;
  onNumbersChange: (checked: boolean) => void;
  onSymbolsChange: (checked: boolean) => void;
}

const PasswordOptions = ({
  length,
  onLengthChange,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  onUppercaseChange,
  onLowercaseChange,
  onNumbersChange,
  onSymbolsChange,
}: PasswordOptionsProps) => {
  return (
    <>
      {/* Length control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Comprimento da Senha</label>
          <span className="text-sm text-muted-foreground">{length[0]} caracteres</span>
        </div>
        <Slider
          value={length}
          onValueChange={onLengthChange}
          max={50}
          min={4}
          step={1}
          className="w-full"
        />
      </div>

      {/* Character options */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Tipos de Caracteres</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => onUppercaseChange(checked === true)}
            />
            <label htmlFor="uppercase" className="text-sm cursor-pointer">
              Maiúsculas (A-Z)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => onLowercaseChange(checked === true)}
            />
            <label htmlFor="lowercase" className="text-sm cursor-pointer">
              Minúsculas (a-z)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => onNumbersChange(checked === true)}
            />
            <label htmlFor="numbers" className="text-sm cursor-pointer">
              Números (0-9)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => onSymbolsChange(checked === true)}
            />
            <label htmlFor="symbols" className="text-sm cursor-pointer">
              Símbolos (!@#$...)
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordOptions;
