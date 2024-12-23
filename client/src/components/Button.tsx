import { ButtonHTMLAttributes } from "react";

export const Button = ({
  isLoading,
  children,
  disabled,
  ...rest
}: Readonly<
  ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }
>) => {
  return (
    <button
      className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
