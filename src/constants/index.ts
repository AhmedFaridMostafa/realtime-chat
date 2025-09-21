import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  Smartphone,
  Globe,
} from "lucide-react";

export const features = [
  {
    icon: Zap,
    title: "Real-time Messaging",
    description:
      "Instant message delivery with WebSocket technology and Pusher integration",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Friend Management",
    description:
      "Add friends, manage requests, and build your network seamlessly",
    iconColor: "text-green-600",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "End-to-end encryption and secure authentication with NextAuth.js",
    iconColor: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Beautiful UI that works perfectly on desktop, tablet, and mobile",
    iconColor: "text-orange-600",
  },
  {
    icon: Globe,
    title: "Modern Tech Stack",
    description:
      "Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui",
    iconColor: "text-cyan-600",
  },
  {
    icon: MessageCircle,
    title: "Rich Features",
    description: "Typing indicators, online status, message history, and more",
    iconColor: "text-pink-600",
  },
];

export const techStack = [
  { name: "Next.js 15", shortName: "Next.js", bgColor: "bg-black" },
  { name: "TypeScript", shortName: "TS", bgColor: "bg-blue-600" },
  { name: "Tailwind CSS", shortName: "TW", bgColor: "bg-cyan-500" },
  { name: "Pusher", shortName: "Pusher", bgColor: "bg-purple-600" },
  { name: "NextAuth.js", shortName: "Auth", bgColor: "bg-green-600" },
  { name: "shadcn/ui", shortName: "shadcn", bgColor: "bg-slate-800" },
];
