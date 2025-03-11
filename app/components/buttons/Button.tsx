"use client";

import React from "react";

export type ButtonVariant = "primary" | "secondary" | "destructive";
export type ButtonSize = "regular" | "small";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "regular",
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size styles
  const sizeStyles = {
    regular: "pl-[8px] pr-[12px] py-2 text-sm h-10 rounded-md",
    small: "px-3 py-1.5 text-xs h-8 rounded-md",
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  // Icon spacing
  const iconSpacing = size === "small" ? "mr-1.5" : "mr-2";
  const trailingIconSpacing = size === "small" ? "ml-1.5" : "ml-2";

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {leadingIcon && (
        <span className={children ? iconSpacing : ""}>{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && (
        <span className={children ? trailingIconSpacing : ""}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
