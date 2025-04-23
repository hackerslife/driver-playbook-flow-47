
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResourceSectionCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
  recommended?: boolean;
  className?: string;
}

export default function ResourceSectionCard({
  icon,
  title,
  subtitle,
  active = false,
  onClick,
  recommended,
  className,
}: ResourceSectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full md:w-auto relative flex flex-1 flex-col items-start gap-2 rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer text-left bg-white/80 backdrop-blur-md hover:shadow-xl",
        active ? "border-blue-500 ring-[3px] ring-blue-300/40 shadow-2xl scale-[1.035]" : "border-transparent hover:border-blue-300",
        className
      )}
      aria-pressed={active}
    >
      <div className="flex items-center gap-2">
        <span className="">{icon}</span>
        <span className="text-lg font-bold">{title}</span>
        {recommended && (
          <span className="ml-2 px-2 py-0.5 rounded bg-blue-600 text-xs text-white font-semibold animate-shimmer">
            AI Recommends
          </span>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm opacity-90 mt-1">{subtitle}</p>
    </button>
  );
}
