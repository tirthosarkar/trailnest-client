import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 ${className}`}
      {...props}
    />
  );
};

export default Input;
