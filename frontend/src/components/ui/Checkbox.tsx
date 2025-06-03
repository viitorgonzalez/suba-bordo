interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function Checkbox({ label, id, ...props }: CheckboxProps) {
    return (
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <input
                id={id}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                {...props}
            />
            <label htmlFor={id} className="text-sm font-medium text-gray-800">
                {label}
            </label>
        </div>
    )
}