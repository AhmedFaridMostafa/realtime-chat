import { clsx, type ClassValue } from "clsx";
import { format, isToday, isYesterday } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatDateSeparator = (timestamp: number) => {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "EEEE, MMMM d, yyyy");
  }
};

export const formatMessageTime = (timestamp: number) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, "hh:mm aa");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "MMM d");
  }
};
