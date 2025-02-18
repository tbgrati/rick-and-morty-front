import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const iconButtonVariant = cva(
  "flex items-center justify-center transition-transform duration-200 ease-in-out",
  {
    variants: {
      variant: {
        primary:
          "border-black bg-ram-blue-600 hover:scale-110 hover:bg-ram-blue-700 hover:cursor-pointer",
        secondary:
          "bg-primary-600 hover:scale-110 hover:bg-primary-700 hover:cursor-pointer",
        disabled: "bg-gray-400 opacity-50 cursor-not-allowed",
      },
      size: {
        small: "w-8 h-8",
        medium: "w-12 h-12",
        large: "w-16 h-16",
      },
      rounded: {
        full: "rounded-full",
        default: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      rounded: "full",
    },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariant> {
  icon: React.ReactElement;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant,
  size,
  rounded,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(iconButtonVariant({ variant, size, rounded }), className)}
    >
      {icon}
    </button>
  );
};

export default IconButton;
