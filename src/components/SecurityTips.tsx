
import React from 'react';

const SecurityTips = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <h4 className="font-medium text-blue-800 mb-2">💡 Dicas de Segurança</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use senhas com pelo menos 12 caracteres</li>
          <li>• Inclua diferentes tipos de caracteres</li>
          <li>• Nunca reutilize senhas importantes</li>
          <li>• Use um gerenciador de senhas confiável</li>
        </ul>
      </div>
      
      <div className="flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop&crop=center" 
          alt="Monitor mostrando código de programação"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default SecurityTips;
