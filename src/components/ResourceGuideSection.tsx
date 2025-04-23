
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResourceGuideSectionProps {
  title: string;
  icon: ReactNode;
  highlighted?: boolean;
  children: ReactNode;
  className?: string;
}

const gradients = {
  diy: "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20",
  agency: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/10 dark:to-pink-900/10",
  consultant: "bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-900/10 dark:to-yellow-900/10",
};

export function ResourceGuideSection({
  title,
  icon,
  highlighted,
  children,
  className,
}: ResourceGuideSectionProps) {
  return (
    <Card
      className={cn(
        "relative shadow-md rounded-2xl border-2 transition-all overflow-hidden group hover:scale-105 hover:shadow-xl animate-fade-in",
        highlighted
          ? "border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/20"
          : "border-transparent",
        className
      )}
    >
      {highlighted && (
        <span className="absolute top-4 right-4 z-10">
          <Badge variant="default" className="bg-blue-600 text-white shadow">
            Recommended
          </Badge>
        </span>
      )}
      <CardHeader className="flex flex-row items-center gap-2 pb-2 pl-4 pt-4 bg-transparent">
        <span className="inline-block">
          {icon}
        </span>
        <CardTitle className="text-lg font-bold tracking-tight pl-2">{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "pt-2 pb-5 px-4",
          title.toLowerCase().includes("diy") && gradients.diy,
          title.toLowerCase().includes("agency") && gradients.agency,
          title.toLowerCase().includes("consultant") && gradients.consultant
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}

