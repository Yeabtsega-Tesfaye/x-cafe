import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
};

export default function Input({
  label,
  error,
  icon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}

      <div className="input-wrapper">
        {icon && (
          <span className="input-icon">
            {icon}
          </span>
        )}

        <input
          className={`input ${icon ? "input-with-icon" : ""} ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}