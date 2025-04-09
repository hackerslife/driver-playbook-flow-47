
import { useState } from "react";
import { Calendar, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  };
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [completed, setCompleted] = useState(task.completed);
  const [skipped, setSkipped] = useState(task.skipped);
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle mark as complete
  const handleComplete = () => {
    setCompleted(!completed);
    if (skipped) setSkipped(false);
  };
  
  // Handle skip
  const handleSkip = () => {
    setSkipped(!skipped);
    if (completed) setCompleted(false);
  };
  
  // Determine the badge styling
  const getBadgeStyle = () => {
    if (completed) return "bg-emerald-100 text-emerald-700";
    if (skipped) return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };
  
  // Determine the badge text
  const getBadgeText = () => {
    if (completed) return "Completed";
    if (skipped) return "Skipped";
    return "Pending";
  };
  
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${completed ? "bg-emerald-50 border-emerald-200" : skipped ? "bg-amber-50 border-amber-200" : "hover:border-blue-200"}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
          <Badge className={getBadgeStyle()}>
            {getBadgeText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{task.frequency} ({task.frequencyDetail})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{task.time.hours}:{task.time.minutes}</span>
          </div>
          <div className="flex items-center gap-1">
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
                  <Badge key={i} variant="outline" className="text-blue-600 hover:bg-blue-50 cursor-pointer">
                    {resource}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Mark as Done</span>
          <Switch checked={completed} onCheckedChange={handleComplete} />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSkip}
            className={skipped ? "text-amber-600" : "text-gray-600"}
          >
            {skipped ? "Unskip" : "Skip"}
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
