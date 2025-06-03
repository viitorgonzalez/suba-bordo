import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  icon?: LucideIcon;
}

export function Textarea({ label, id, icon: Icon, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {/* O ícone é posicionado no topo para melhor alinhamento com o textarea */}
        {Icon && <Icon className="absolute top-3 left-3 w-5 h-5 text-gray-400 pointer-events-none" />}
        <textarea
          id={id}
          // A classe de padding 'pl-10' é aplicada se houver um ícone
          className={`w-full text-gray-700 border border-gray-300 rounded-lg py-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
          {...props}
        />
      </div>
    </div>
  );
}