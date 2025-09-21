import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-blue-600",
}: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <Icon className={`mb-2 h-10 w-10 ${iconColor}`} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
