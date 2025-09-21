"use client";
import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface AvatarImageWithFallbackProps {
  src?: string;
  name?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  fill?: boolean;
}

const sizeConfig = {
  sm: { pixels: 32, className: "h-8 w-8", text: "text-xs" },
  md: { pixels: 40, className: "h-10 w-10", text: "text-sm" },
  lg: { pixels: 48, className: "h-12 w-12", text: "text-base" },
};

const AvatarImageWithFallback = ({
  src,
  name = "User",
  alt,
  className = "",
  size = "md",
  priority = false,
  fill = false,
}: AvatarImageWithFallbackProps) => {
  const [imageError, setImageError] = useState(false);

  const config = sizeConfig[size];

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Avatar className={`${config.className} ${className}`}>
      {src && !imageError ? (
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={src}
            alt={alt || `${name}'s avatar`}
            fill={fill}
            width={fill ? undefined : config.pixels}
            height={fill ? undefined : config.pixels}
            className="object-cover"
            priority={priority}
            onError={handleImageError}
            sizes={fill ? `${config.pixels}px` : undefined}
          />
        </div>
      ) : (
        <AvatarFallback className={config.text}>
          {getInitials(name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarImageWithFallback;
