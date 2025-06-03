import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

// Define o formato esperado para cada opção
interface SelectOption {
  value: string | number;
  label: string;
}

// Define as props para o componente Select
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  icon?: LucideIcon;
  options: SelectOption[];
}

export function Select({ label, id, icon: Icon, options, ...props }: SelectProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />}
        <select
          id={id}
          // Usamos as mesmas classes de estilo do outro select para consistência
          className={`w-full text-gray-700 border border-gray-300 rounded-lg p-2.5 transition-colors focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${Icon ? 'pl-10' : 'pl-3'}`}
          {...props}
        >
          {/* Opção padrão desabilitada */}
          <option value="" disabled>Selecione...</option>
          
          {/* Mapeia a lista de opções para elementos <option> */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Adiciona uma seta para indicar que é um dropdown */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
}