import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const styles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    ghost: "btn-ghost",
  };

  return (
    <button
      className={`
        ${styles[variant]}
        ${fullWidth ? "btn-full" : ""}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon && !loading && leftIcon}

      {loading ? "Loading..." : children}

      {rightIcon && !loading && rightIcon}
    </button>
  );
}