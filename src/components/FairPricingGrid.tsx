
import { DollarSign, Building, BadgePercent } from "lucide-react";

interface FairPricingItem {
  label: string;
  price: string;
  detail?: string;
  icon: "dollar-sign" | "building" | "badge-percent";
}

interface FairPricingGridProps {
  items: FairPricingItem[];
}

const ICONS = {
  "dollar-sign": <DollarSign className="h-10 w-10 text-blue-500" strokeWidth={2.5} />,
  "building": <Building className="h-10 w-10 text-blue-500" strokeWidth={2.5} />,
  "badge-percent": <BadgePercent className="h-10 w-10 text-blue-500" strokeWidth={2.5} />,
};

export default function FairPricingGrid({ items }: FairPricingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto mt-4">
      {items.map((item, idx) => (
        <div
          key={item.label}
          className="flex flex-col bg-white border border-blue-100 rounded-2xl shadow-lg p-5 min-w-[220px] min-h-[140px] relative"
        >
          <div className="flex items-center gap-2 mb-3">
            <span>{ICONS[item.icon]}</span>
            <span className="font-semibold text-lg text-gray-800">{item.label}</span>
          </div>
          <span className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
            {item.price}
          </span>
          <span className="text-gray-500 text-sm">{item.detail}</span>
        </div>
      ))}
    </div>
  );
}
