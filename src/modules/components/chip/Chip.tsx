import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const chipVariant = cva(
  "flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105",
  {
    variants: {
      variant: {
        primary: "px-3 py-1 border rounded-md hover:cursor-pointer",
        active:
          "px-3 py-1 border rounded-md hover:cursor-pointer bg-orange-500 text-white",
        disabled: "bg-gray-400 opacity-50 cursor-not-allowed",
      },
      rounded: {
        full: "rounded-full",
        default: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: "default",
    },
  },
);

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariant> {
  text: string;
}

const Chip: React.FC<ChipProps> = ({
  text,
  variant,
  size,
  rounded,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(chipVariant({ variant, size, rounded }), className)}
    >
      {text}
    </button>
  );
};

export default Chip;
