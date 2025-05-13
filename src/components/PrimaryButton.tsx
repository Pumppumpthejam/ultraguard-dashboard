import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<Props> = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded shadow text-white font-medium"
  >
    {children}
  </button>
);

export default PrimaryButton;
