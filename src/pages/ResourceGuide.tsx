
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

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

const ResourceGuide = () => {
  const { taskId, resourceName } = useParams<{ taskId?: string; resourceName?: string }>();
  const location = useLocation();
  // Retrieve task data passed from navigation state (playbook)
  const task = location.state?.task;

  // Decide recommendation type
  const recommendation = task?.recommendation || task?.type || "diy"; // fallback
  const lowerRecommendation = recommendation.toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Resource Guide: <span className="font-bold">{decodeURIComponent(resourceName ?? "")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Section 1: Our Recommendation */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">Our Recommendation</h2>
              {lowerRecommendation.includes("diy") ? (
                <div>
                  <p className="mb-2 text-gray-700">We recommend you take a hands-on approach for this task. Use these resources to get started:</p>
                  <div className="flex flex-col gap-2">
                    {diyLinks.map(link => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-700 hover:underline hover:text-blue-900"
                      >
                        <Badge variant="outline" className="border-blue-400">{link.name}</Badge>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : lowerRecommendation.includes("agency") ? (
                <div>
                  {/* Fair Pricing Section */}
                  <section className="mb-6">
                    <h3 className="text-base font-medium text-purple-700 mb-1">Fair Pricing</h3>
                    <ul className="pl-5 space-y-1 text-sm">
                      {agencyFairPricing.map((p, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{p.item}</span>
                          <span className="font-semibold">{p.price}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  {/* Tips Section */}
                  <section>
                    <h3 className="text-base font-medium text-purple-700 mb-1 mt-2">Tips for Working with Agencies</h3>
                    <ul className="list-disc pl-6 text-sm text-gray-700">
                      {agencyTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : lowerRecommendation.includes("consultant") ? (
                <div>
                  {/* Fair Pricing Section */}
                  <section className="mb-6">
                    <h3 className="text-base font-medium text-purple-700 mb-1">Fair Pricing</h3>
                    <ul className="pl-5 space-y-1 text-sm">
                      {consultantFairPricing.map((p, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{p.item}</span>
                          <span className="font-semibold">{p.price}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  {/* Tips Section */}
                  <section>
                    <h3 className="text-base font-medium text-purple-700 mb-1 mt-2">Tips for Working with Consultants</h3>
                    <ul className="list-disc pl-6 text-sm text-gray-700">
                      {consultantTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : (
                <p>No recommendations available.</p>
              )}
            </section>
            {/* Sections 2 & 3 would be added here */}
          </CardContent>
        </Card>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default ResourceGuide;
