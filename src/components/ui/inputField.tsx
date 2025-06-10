import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  error?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  isTextArea = false,
  error,
  readOnly = false,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full rounded-lg border px-4 py-2 text-sm ${
            error
              ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          rows={4}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full rounded-lg border px-4 py-2 text-sm ${
            error
              ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">⚠️ {error}</p>}
    </div>
  );
};

export default InputField;
