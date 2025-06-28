
import React, { useState, useCallback } from 'react';
import { RefreshCw, Copy, Check, Shield, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const generatePassword = useCallback(() => {
    let charset = '';
    let generatedPassword = '';

    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (charset === '') {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um tipo de caractere!",
        variant: "destructive",
      });
      return;
    }

    // Garantir que pelo menos um caractere de cada tipo selecionado seja incluído
    if (includeUppercase) {
      const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * uppercaseChars.length);
      generatedPassword += uppercaseChars[randomIndex];
    }
    if (includeLowercase) {
      const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * lowercaseChars.length);
      generatedPassword += lowercaseChars[randomIndex];
    }
    if (includeNumbers) {
      const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * numberChars.length);
      generatedPassword += numberChars[randomIndex];
    }
    if (includeSymbols) {
      const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * symbolChars.length);
      generatedPassword += symbolChars[randomIndex];
    }

    // Preencher o resto da senha
    for (let i = generatedPassword.length; i < length[0]; i++) {
      const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * charset.length);
      generatedPassword += charset[randomIndex];
    }

    // Embaralhar a senha para que os caracteres garantidos não fiquem no início
    const passwordArray = generatedPassword.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * (i + 1));
      [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    setPassword(passwordArray.join(''));
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Senha copiada para a área de transferência",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar a senha",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: '', color: '' };
    
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

  const strength = getPasswordStrength();
  const StrengthIcon = strength.icon;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gerador de Senhas Seguras
          </CardTitle>
          <p className="text-muted-foreground">
            Crie senhas fortes e personalizadas
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campo da senha gerada */}
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
                onClick={copyToClipboard}
                disabled={!password}
                variant="outline"
                size="icon"
                className="h-[50px] w-[50px]"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Controle de comprimento */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Comprimento da Senha</label>
              <span className="text-sm text-muted-foreground">{length[0]} caracteres</span>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              max={50}
              min={4}
              step={1}
              className="w-full"
            />
          </div>

          {/* Opções de caracteres */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Tipos de Caracteres</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
                <label htmlFor="uppercase" className="text-sm cursor-pointer">
                  Maiúsculas (A-Z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
                <label htmlFor="lowercase" className="text-sm cursor-pointer">
                  Minúsculas (a-z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
                <label htmlFor="numbers" className="text-sm cursor-pointer">
                  Números (0-9)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
                <label htmlFor="symbols" className="text-sm cursor-pointer">
                  Símbolos (!@#$...)
                </label>
              </div>
            </div>
          </div>

          {/* Botão de gerar */}
          <Button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            size="lg"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Gerar Nova Senha
          </Button>

          {/* Dicas de segurança */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-medium text-blue-800 mb-2">💡 Dicas de Segurança</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use senhas com pelo menos 12 caracteres</li>
              <li>• Inclua diferentes tipos de caracteres</li>
              <li>• Nunca reutilize senhas importantes</li>
              <li>• Use um gerenciador de senhas confiável</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
