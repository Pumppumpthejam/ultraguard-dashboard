import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const base = "px-4 py-2 rounded font-medium focus:outline-none";
  const styles =
    variant === "ghost"
      ? "bg-transparent text-white border border-gray-500 hover:bg-gray-700"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
};

export default Button;
