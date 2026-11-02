import { Link } from "@/core/i18n/navigation";
import { ButtonProps } from "./button-props";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color,filter] duration-150 motion-safe:active:scale-[0.97]";

const variants: Record<ButtonProps["variant"], string> = {
  red: "bg-red text-white hover:brightness-90",
  white: "bg-white text-blue hover:bg-ivory",
  blue: "bg-blue text-white hover:bg-blue-deep",
  "outline-light":
    "border border-white text-white hover:bg-white hover:text-blue",
};

export default function Button({
  children,
  href,
  external = false,
  onClick,
  variant,
  type = "button",
  className,
}: ButtonProps) {
  const classes = [base, variants[variant], className]
    .filter(Boolean)
    .join(" ");

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
