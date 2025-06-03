import type { LucideIcon } from 'lucide-react';
import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: LucideIcon;
  endIcon?: LucideIcon; 
  onEndIconClick?: () => void; 
}

export function Input({ label, id, icon: Icon, endIcon: EndIcon, onEndIconClick, ...props }: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />}
        <input
          id={id}
          className={`w-full text-gray-700 border border-gray-300 rounded-lg py-2.5 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${Icon ? 'pl-10' : 'px-4'} ${EndIcon ? 'pr-10' : 'pr-4'}`} // Padding ajustado
          {...props}
        />
        {EndIcon && (
          <button type="button" onClick={onEndIconClick} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <EndIcon size={20} />
          </button>
        )}
      </div>
    </div>
  );
}