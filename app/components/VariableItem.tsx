// components/VariableItem.tsx
'use client';

import { useState } from 'react';

interface VariableItemProps {
  name: string;
  value?: string;
  isSecret?: boolean;
}

export function VariableItem({ name, value, isSecret = false }: VariableItemProps) {
  const [showSecret, setShowSecret] = useState(false);
  
  const displayValue = value || '❌ No configurado';
  const isConfigured = !!value;

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {name}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          isConfigured 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isConfigured ? '✅ Cargado' : '❌ No cargado'}
        </span>
      </div>
      
      <div className="mt-2">
        {isSecret && isConfigured ? (
          <div className="flex items-center gap-2">
            <input 
              type={showSecret ? "text" : "password"}
              value={displayValue}
              readOnly 
              className="w-full p-2 border rounded bg-gray-50 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              {showSecret ? '👁️ Ocultar' : '👁️ Mostrar'}
            </button>
          </div>
        ) : (
          <code className="block w-full p-2 border rounded bg-gray-50 font-mono text-sm overflow-x-auto">
            {displayValue}
          </code>
        )}
      </div>
      
      {!isConfigured && (
        <p className="text-xs text-red-500 mt-2">
          Esta variable no está configurada en Azure
        </p>
      )}
    </div>
  );
}