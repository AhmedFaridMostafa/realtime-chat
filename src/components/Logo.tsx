import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizeClasses = {
  xs: { icon: "h-6 w-6", text: "text-sm" },
  sm: { icon: "h-6 w-6", text: "text-sm" },
  md: { icon: "h-8 w-8", text: "text-lg" },
  lg: { icon: "h-10 w-10", text: "text-xl" },
  xl: { icon: "h-12 w-12", text: "text-2xl" },
};

export function Logo({
  size = "md",
  showText = true,
  href,
  className,
}: LogoProps) {
  const sizes = sizeClasses[size];

  const logoElement = (
    <div className={cn("flex items-center space-x-2", className)}>
      <MessageCircle className={cn("text-primary", sizes.icon)} />
      {showText && (
        <span
          className={cn(
            "font-bold whitespace-nowrap text-slate-900 dark:text-white",
            sizes.text,
          )}
        >
          AL-Fared
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-80">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
