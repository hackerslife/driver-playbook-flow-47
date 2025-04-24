
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
    icon: "dollar-sign" as const,
  },
  {
    label: "Agency",
    price: "$200 - $500",
    detail: "5% - 10% of Media cost + Management fees",
    icon: "building" as const,
  },
  {
    label: "Licensing",
    price: "NA",
    icon: "badge-percent" as const,
  },
  {
    label: "Consultant",
    price: "$50 - $70",
    detail: "5% - 10% of Media cost or per hour",
    icon: "badge-percent" as const,
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
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">DIY Resources</h2>
        <div className="prose prose-blue max-w-none">
          <p className="text-lg mb-6">Get started with these carefully curated resources to help you implement your marketing strategies independently.</p>
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Essential Resources</h3>
            <ul className="space-y-4">
              {links.map(link => (
                <li key={link.url} className="flex items-center">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    recommendedTag: "diy",
  },
  {
    key: "agency",
    icon: <Users className="w-7 h-7 text-violet-500" />,
    title: "Get Help: Agency",
    subtitle: "Specialized agencies can manage it for you for a fee and better scale.",
    getContent: () => (
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Working with Agencies</h2>
        <div className="prose prose-purple max-w-none">
          <p className="text-lg mb-6">Understand the costs and benefits of working with marketing agencies to scale your business effectively.</p>
          
          <div className="bg-purple-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Agency Fair Pricing</h3>
            <FairPricingGrid items={[fairPricingItems[1]]} />
          </div>
          
          <div className="bg-purple-50/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Best Practices for Agency Collaboration</h3>
            <ul className="space-y-4">
              {agencyTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-medium text-purple-700">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    recommendedTag: "agency",
  },
  {
    key: "consultant",
    icon: <Handshake className="w-7 h-7 text-orange-500" />,
    title: "Get Help: Consultant",
    subtitle: "Leverage industry experts for tailored advice and strategic direction.",
    getContent: () => (
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-orange-800">Working with Consultants</h2>
        <div className="prose prose-orange max-w-none">
          <p className="text-lg mb-6">Learn how to effectively engage with marketing consultants to get expert guidance for your business.</p>
          
          <div className="bg-orange-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Consultant Fair Pricing</h3>
            <FairPricingGrid items={[fairPricingItems[3]]} />
          </div>
          
          <div className="bg-orange-50/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Tips for Working with Consultants</h3>
            <ul className="space-y-4">
              {consultantTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-medium text-orange-700">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    recommendedTag: "consultant",
  },
];

export default function ResourceGuide() {
  const { resourceName } = useParams<{ resourceName?: string }>();
  const location = useLocation();
  const task = location.state?.task;
  const recommendation = (task?.recommendation || task?.type || "diy").toLowerCase();
  const [openSection, setOpenSection] = useState<string | null>(resourceSections.find(s =>
    recommendation.includes(s.recommendedTag)
  )?.key ?? "diy");

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-blue-100/60 via-white/40 to-purple-100">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col items-center mb-7">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Resource Guide: <span className="font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">{decodeURIComponent(resourceName ?? "")}</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg text-center max-w-2xl">
            AI has analyzed your playbook task. Here's the best approach for your business—and the full landscape at a glance.
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

        <div className="mt-8">
          {resourceSections.map(section => (
            <div
              key={section.key}
              className={`transition-all duration-500 ${
                openSection === section.key ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {section.key === "diy"
                ? section.getContent({ links: diyLinks })
                : section.getContent({ links: [] })
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
