
import { useState } from "react";
import { Wrench, Users, Handshake } from "lucide-react";
import ResourceSectionCard from "@/components/ResourceSectionCard";
import FairPricingGrid from "@/components/FairPricingGrid";
import { useLocation, useParams } from "react-router-dom";

// -- Example Data --
const diyLinks = [
  { name: "Step-by-step Guide", url: "https://example.com/diy-guide" },
  { name: "YouTube Tutorial", url: "https://youtube.com" },
];

const fairPricingItems = [
  {
    label: "Media",
    price: "$500 - $2000",
    detail: "per month",
    icon: "dollar-sign",
  },
  {
    label: "Agency",
    price: "$200 - $500",
    detail: "5% - 10% of Media cost + Management fees",
    icon: "building",
  },
  {
    label: "Licensing",
    price: "NA",
    icon: "licensing",
  },
  {
    label: "Consultant",
    price: "$50 - $70",
    detail: "5% - 10% of Media cost or per hour",
    icon: "licensing",
  },
];

const agencyTips = [
  "Request clear deliverables in your contract.",
  "Ask for recent case studies and references.",
  "Clarify ownership of creative assets.",
];

const consultantTips = [
  "Choose a consultant with experience in your industry.",
  "Align on expected outcomes before commencing.",
  "Check for relevant certifications.",
];

const resourceSections = [
  {
    key: "diy",
    icon: <Wrench className="w-7 h-7 text-blue-500" />,
    title: "Do It Yourself",
    subtitle: "DIY with top guides, tools, and videos tailored for your business.",
    getContent: ({ links }: { links: typeof diyLinks }) => (
      <>
        <h2 className="text-xl font-bold mb-2 text-blue-800">DIY Resources</h2>
        <ul className="flex flex-col gap-2 mb-3">
          {links.map(link => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-2 items-center font-medium text-blue-700 hover:text-blue-900 underline underline-offset-4"
              >
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </>
    ),
    recommendedTag: "diy",
  },
  {
    key: "agency",
    icon: <Users className="w-7 h-7 text-violet-500" />,
    title: "Get Help: Agency",
    subtitle: "Specialized agencies can manage it for you for a fee and better scale.",
    getContent: () => (
      <>
        <h2 className="text-xl font-bold mb-2 text-purple-800">Agency Fair Pricing</h2>
        <FairPricingGrid items={[
          fairPricingItems[1], // Agency
        ]} />
        <div className="mt-6">
          <h3 className="font-semibold text-purple-700 mb-1">AI Tips for Agencies</h3>
          <ul className="list-disc pl-6 text-md text-gray-700 dark:text-gray-300">
            {agencyTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </>
    ),
    recommendedTag: "agency",
  },
  {
    key: "consultant",
    icon: <Handshake className="w-7 h-7 text-orange-500" />,
    title: "Get Help: Consultant",
    subtitle: "Leverage industry experts for tailored advice and strategic direction.",
    getContent: () => (
      <>
        <h2 className="text-xl font-bold mb-2 text-orange-800">Consultant Fair Pricing</h2>
        <FairPricingGrid items={[
          fairPricingItems[3], // Consultant
        ]} />
        <div className="mt-6">
          <h3 className="font-semibold text-orange-700 mb-1">AI Tips for Consultants</h3>
          <ul className="list-disc pl-6 text-md text-gray-700 dark:text-gray-300">
            {consultantTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </>
    ),
    recommendedTag: "consultant",
  },
];

export default function ResourceGuide() {
  const { resourceName } = useParams<{ resourceName?: string }>();
  const location = useLocation();
  const task = location.state?.task;
  // Lowercase, safe fallback to diy if not present.
  const recommendation = (task?.recommendation || task?.type || "diy").toLowerCase();
  const [openSection, setOpenSection] = useState<string | null>(resourceSections.find(s =>
    recommendation.includes(s.recommendedTag)
  )?.key ?? "diy");

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-blue-100/60 via-white/40 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col items-center mb-7">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Resource Guide: <span className="font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">{decodeURIComponent(resourceName ?? "")}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-200 text-base md:text-lg text-center max-w-2xl">
            AI has analyzed your playbook task. Here’s the best approach for your business—and the full landscape at a glance.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-4 mb-7">
          {resourceSections.map((section) => (
            <ResourceSectionCard
              key={section.key}
              icon={section.icon}
              title={section.title}
              subtitle={section.subtitle}
              recommended={recommendation.includes(section.recommendedTag)}
              active={openSection === section.key}
              onClick={() => setOpenSection(section.key)}
              className="flex-1"
            />
          ))}
        </div>
        <div className="relative z-10">
          {/* EXPANDED INFO PANEL */}
          <div className="transition-all">
            {resourceSections.map(section => (
              <div
                key={section.key}
                className={`overflow-hidden mb-5 rounded-2xl shadow-xl bg-white/90 border-2 border-blue-100 px-0 md:px-6 py-8 mx-auto max-w-2xl glassy-panel transition-all duration-500 ${openSection === section.key ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute left-0 right-0"}`}
                style={{
                  minHeight: openSection === section.key ? "220px" : "0px",
                  zIndex: openSection === section.key ? 20 : 1,
                }}
              >
                <div>
                  {section.key === "diy"
                    ? section.getContent({ links: diyLinks })
                    : section.getContent({})
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
        .glassy-panel {
          backdrop-filter: blur(8px) saturate(1.2);
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #a5b4fc 0%, #f0abfc 100%);
          background-size: 150% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 150% 0; }
          100% { background-position: -150% 0; }
        }
        `}
      </style>
    </div>
  );
}
