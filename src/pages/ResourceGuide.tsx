
import { useLocation, useParams } from "react-router-dom";
import { ArrowRight, Wrench, Users, Handshake } from "lucide-react";
import { ResourceGuideSection } from "@/components/ResourceGuideSection"; // new component

// Simulated example links and fair pricing/tips. Replace with real data as needed.
const diyLinks = [
  { name: "Step-by-step Guide", url: "https://example.com/diy-guide" },
  { name: "YouTube Tutorial", url: "https://youtube.com" },
];

const agencyFairPricing = [
  { item: "Small Website Project", price: "$3,000 - $4,500" },
  { item: "Monthly Social Media", price: "$400 - $900/mo" },
];

const consultantFairPricing = [
  { item: "Consultation Session", price: "$75 - $200/hr" },
  { item: "Ongoing Strategy", price: "$500 - $1,500/mo" },
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

export default function ResourceGuide() {
  const { resourceName } = useParams<{ resourceName?: string }>();
  const location = useLocation();
  const task = location.state?.task;

  // Determine which section is recommended (diy/agency/consultant)
  const recommendation = (task?.recommendation || task?.type || "diy").toLowerCase();
  // Normalized for highlighting
  const isDIY = recommendation.includes("diy");
  const isAgency = recommendation.includes("agency");
  const isConsultant = recommendation.includes("consultant");

  // Section config for highlights
  const sectionConfig = [
    {
      title: "Do It Yourself",
      highlight: isDIY,
      icon: <Wrench className="w-6 h-6 text-blue-500" />,
      content: (
        <>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Tackle this task hands-on! Use these resources to get started:
          </p>
          <div className="flex flex-col gap-2 mb-4">
            {diyLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-700 hover:underline hover:text-blue-900 font-medium transition-all group story-link"
              >
                <span>
                  {link.name}
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </>
      ),
    },
    {
      title: "Get Help: Agency",
      highlight: isAgency,
      icon: <Users className="w-6 h-6 text-violet-500" />,
      content: (
        <>
          <section className="mb-3">
            <h3 className="text-base font-semibold text-purple-700 mb-1">Fair Pricing</h3>
            <ul className="pl-5 space-y-1 text-sm">
              {agencyFairPricing.map((p, i) => (
                <li key={i} className="flex justify-between">
                  <span>{p.item}</span>
                  <span className="font-semibold">{p.price}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-base font-semibold text-purple-700 mb-1 mt-2">Tips for Working with Agencies</h3>
            <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
              {agencyTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        </>
      ),
    },
    {
      title: "Get Help: Consultant",
      highlight: isConsultant,
      icon: <Handshake className="w-6 h-6 text-orange-500" />,
      content: (
        <>
          <section className="mb-3">
            <h3 className="text-base font-semibold text-orange-700 mb-1">Fair Pricing</h3>
            <ul className="pl-5 space-y-1 text-sm">
              {consultantFairPricing.map((p, i) => (
                <li key={i} className="flex justify-between">
                  <span>{p.item}</span>
                  <span className="font-semibold">{p.price}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-base font-semibold text-orange-700 mb-1 mt-2">Tips for Working with Consultants</h3>
            <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
              {consultantTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900 py-10 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-black section-header tracking-tight mb-2 animate-fade-in">
            Resource Guide: <span className="font-extrabold">{decodeURIComponent(resourceName ?? "")}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-200 text-base md:text-lg text-center max-w-2xl">
            Based on AI analysis of your chosen task, here's the best way forward, plus options for agency and consultant help.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {sectionConfig.map(section => (
            <ResourceGuideSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              highlighted={section.highlight}
            >
              {section.content}
            </ResourceGuideSection>
          ))}
        </div>
      </div>
    </div>
  );
}

