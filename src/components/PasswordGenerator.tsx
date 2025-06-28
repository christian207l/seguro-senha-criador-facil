
import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateSecurePassword } from '@/utils/passwordGenerator';
import PasswordDisplay from './PasswordDisplay';
import PasswordOptions from './PasswordOptions';
import SecurityTips from './SecurityTips';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    try {
      const newPassword = generateSecurePassword(
        length[0],
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
      );
      setPassword(newPassword);
      setCopied(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um tipo de caractere!",
        variant: "destructive",
      });
    }
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Image Section */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-4">
          <img 
            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop&crop=center" 
            alt="Código colorido de software em monitor"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&crop=center" 
            alt="MacBook com linhas de código na tela"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>

        {/* Main Generator Card */}
        <div className="lg:col-span-2">
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
              <PasswordDisplay
                password={password}
                copied={copied}
                onCopy={copyToClipboard}
              />

              <PasswordOptions
                length={length}
                onLengthChange={setLength}
                includeUppercase={includeUppercase}
                includeLowercase={includeLowercase}
                includeNumbers={includeNumbers}
                includeSymbols={includeSymbols}
                onUppercaseChange={setIncludeUppercase}
                onLowercaseChange={setIncludeLowercase}
                onNumbersChange={setIncludeNumbers}
                onSymbolsChange={setIncludeSymbols}
              />

              <Button
                onClick={generatePassword}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Gerar Nova Senha
              </Button>

              <SecurityTips />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
