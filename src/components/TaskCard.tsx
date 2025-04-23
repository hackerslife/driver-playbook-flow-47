
import { useState } from "react";
import { Calendar, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import GenerateContentDialog from "./GenerateContentDialog";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    frequency: string;
    frequencyDetail: string;
    cost: string;
    time: { hours: string; minutes: string };
    description: string;
    resources: string[];
    completed: boolean;
    skipped: boolean;
    category?: string;
    recommendation?: string;
    type?: string;
  };
  hideStatus?: boolean;
}

/**
 * A minimal TaskCard for Playbook page, with no completion state UI.
 */
const TaskCard = ({ task, hideStatus = true }: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Identify content creation task for GenerateContentDialog display
  const isContentTask = task.category === "Content Asset Creation" || 
    task.title.toLowerCase().includes("content") ||
    task.title.toLowerCase().includes("post") ||
    task.title.toLowerCase().includes("social") ||
    task.category === "Social Media";

  // Handle resource badge click — go to resource guide with relevant props
  const handleResourceClick = (resourceName: string) => {
    navigate(`/resource-guide/${encodeURIComponent(task.id)}/${encodeURIComponent(resourceName)}`, { state: { task } });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 bg-white border border-blue-100 hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full border">
            <Calendar className="h-4 w-4" />
            <span>{task.frequency} ({task.frequencyDetail})</span>
          </div>
          <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full border">
            <Clock className="h-4 w-4" />
            <span>{task.time.hours}:{task.time.minutes}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full border">
            <DollarSign className="h-4 w-4" />
            <span>{task.cost}</span>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
          <CollapsibleContent className="pt-2">
            <div className="border-t pt-3">
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              
              <h4 className="font-medium mb-1">Resources</h4>
              <div className="flex flex-wrap gap-2">
                {task.resources.map((resource, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-blue-600 hover:bg-blue-50 cursor-pointer border-blue-400"
                    onClick={() => handleResourceClick(resource)}
                  >
                    {resource}
                  </Badge>
                ))}
              </div>
              
              {isContentTask && (
                <div className="mt-4 pt-3 border-t">
                  <h4 className="font-medium mb-2">Tools</h4>
                  <GenerateContentDialog taskTitle={task.title} taskDescription={task.description} />
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end border-t border-gray-100">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="inline">
          <CollapsibleTrigger asChild>
            <button
              className="text-blue-700 hover:text-blue-900 font-medium text-sm ml-auto flex gap-1 items-center"
              aria-label={isOpen ? "Show Less" : "Show More"}
            >
              {isOpen ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </CollapsibleTrigger>
        </Collapsible>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
