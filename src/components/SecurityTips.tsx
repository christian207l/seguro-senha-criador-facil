
import React from 'react';

const SecurityTips = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
      <h4 className="font-medium text-blue-800 mb-2">💡 Dicas de Segurança</h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• Use senhas com pelo menos 12 caracteres</li>
        <li>• Inclua diferentes tipos de caracteres</li>
        <li>• Nunca reutilize senhas importantes</li>
        <li>• Use um gerenciador de senhas confiável</li>
      </ul>
    </div>
  );
};

export default SecurityTips;
