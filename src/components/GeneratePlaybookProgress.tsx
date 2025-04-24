
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function GeneratePlaybookProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing your business profile...");

  useEffect(() => {
    const steps = [
      { progress: 25, message: "Analyzing your business profile..." },
      { progress: 50, message: "Processing last month's data..." },
      { progress: 75, message: "Generating AI optimized recommendations..." },
      { progress: 100, message: "Finalizing your playbook..." },
    ];

    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <Progress value={progress} className="mb-4" />
      <p className="text-center text-blue-600">{status}</p>
    </div>
  );
}
