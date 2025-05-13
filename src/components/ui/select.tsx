import React from "react";

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ children }) => {
  return <div className="relative">{children}</div>;
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <button className={`w-full bg-gray-800 text-white px-4 py-2 rounded ${className}`}>
    {children}
  </button>
);

export const SelectValue: React.FC<{ placeholder: string; className?: string }> = ({
  placeholder,
  className = "",
}) => <span className={`text-gray-400 ${className}`}>{placeholder}</span>;

export const SelectContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`absolute z-10 mt-2 bg-white text-black rounded shadow ${className}`}>
    {children}
  </div>
);

export const SelectItem: React.FC<{
  children: React.ReactNode;
  value: string;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer ${className}`}
  >
    {children}
  </div>
);

export default Select;
