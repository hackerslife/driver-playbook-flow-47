
import { useState, useEffect } from "react";
import { Search, Plus, Clock, Calendar, DollarSign, X, AlertTriangle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

// Mock database of tasks that weren't recommended but are available
const unrecommendedTasks = [
  { 
    id: "task-1", 
    title: "Create Google My Business Listing", 
    frequency: "One Time", 
    time: { hours: "01", minutes: "30" }, 
    cost: "$0" 
  },
  { 
    id: "task-2", 
    title: "Set Up Google Analytics", 
    frequency: "One Time", 
    time: { hours: "02", minutes: "00" }, 
    cost: "$0" 
  },
  { 
    id: "task-3", 
    title: "Create Email Newsletter Template", 
    frequency: "Monthly", 
    time: { hours: "01", minutes: "00" }, 
    cost: "$15" 
  },
  { 
    id: "task-4", 
    title: "Set Up Facebook Pixel", 
    frequency: "One Time", 
    time: { hours: "00", minutes: "45" }, 
    cost: "$0" 
  },
  { 
    id: "task-5", 
    title: "Competitor Research", 
    frequency: "Monthly", 
    time: { hours: "03", minutes: "00" }, 
    cost: "$0" 
  },
  { 
    id: "task-6", 
    title: "Create YouTube Channel", 
    frequency: "One Time", 
    time: { hours: "02", minutes: "00" }, 
    cost: "$0" 
  },
  { 
    id: "task-7", 
    title: "Social Media Content Calendar", 
    frequency: "Monthly", 
    time: { hours: "01", minutes: "30" }, 
    cost: "$10" 
  },
  { 
    id: "task-8", 
    title: "SEO Keyword Research", 
    frequency: "Monthly", 
    time: { hours: "02", minutes: "00" }, 
    cost: "$20" 
  },
  { 
    id: "task-9", 
    title: "Set Up Google Search Console", 
    frequency: "One Time", 
    time: { hours: "01", minutes: "00" }, 
    cost: "$0" 
  },
  { 
    id: "task-10", 
    title: "Install Facebook Conversion API", 
    frequency: "One Time", 
    time: { hours: "01", minutes: "15" }, 
    cost: "$0" 
  },
];

interface Task {
  id: string;
  title: string;
  frequency: string;
  time: { hours: string; minutes: string };
  cost: string;
  description?: string;
  resources?: string[];
  completed?: boolean;
  skipped?: boolean;
}

interface AddCustomTaskDialogProps {
  onAddTask: (task: Task) => void;
}

const AddCustomTaskDialog = ({ onAddTask }: AddCustomTaskDialogProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [frequency, setFrequency] = useState("One Time");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("30");
  const [cost, setCost] = useState("$0");
  const [open, setOpen] = useState(false);

  // Search for tasks based on query
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = unrecommendedTasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // When a task is selected from suggestions
  const selectSuggestion = (task: Task) => {
    setSelectedTask(task);
    setCustomTitle(task.title);
    setFrequency(task.frequency);
    setHours(task.time.hours);
    setMinutes(task.time.minutes);
    setCost(task.cost);
    setSearchQuery("");
    setSuggestions([]);
  };

  // Reset form
  const resetForm = () => {
    setSearchQuery("");
    setSuggestions([]);
    setSelectedTask(null);
    setCustomTitle("");
    setFrequency("One Time");
    setHours("00");
    setMinutes("30");
    setCost("$0");
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!customTitle.trim()) {
      toast({
        title: "Task title required",
        description: "Please provide a title for your task",
        variant: "destructive"
      });
      return;
    }

    const newTask: Task = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      frequency,
      time: { hours, minutes },
      cost,
      description: "Custom task added by user",
      completed: false,
      skipped: false
    };

    onAddTask(newTask);
    toast({
      title: "Task added successfully",
      description: `"${customTitle}" has been added to your tasks`,
    });
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 hover:bg-blue-50 hover:text-blue-700 border-blue-200">
          <Plus size={16} />
          Add Your Own Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center mb-2">Add Your Own Task</DialogTitle>
          <p className="text-gray-600 text-center mb-4">
            Looking for a task we didn't recommend? Search and add it—or create your own if it's not found.
          </p>
        </DialogHeader>

        {/* Search section */}
        <div className="border-b pb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for a task..."
              className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Task suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 max-h-60 overflow-y-auto border border-blue-100">
              <div className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                <Search className="h-4 w-4 mr-1" /> 
                Search Results ({suggestions.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((task) => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-md bg-white hover:bg-blue-100 cursor-pointer flex flex-col border border-blue-200 shadow-sm transition-all hover:shadow-md"
                    onClick={() => selectSuggestion(task)}
                  >
                    <div className="font-medium mb-1 text-gray-800">{task.title}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.frequency}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.time.hours}:{task.time.minutes}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {task.cost}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {searchQuery && !suggestions.length && (
            <div className="bg-gray-50 rounded-md p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">No matching tasks found.</p>
              <p className="text-sm font-medium text-blue-600">You can create your own task below.</p>
            </div>
          )}
        </div>

        {/* Warning banner when a task is selected from suggestions */}
        {selectedTask && (
          <Alert className="mt-4 bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-700">Not in recommended tasks</AlertTitle>
            <AlertDescription className="text-amber-600">
              This task is not recommended by us due to cost constraints. You can still go ahead and track it.
            </AlertDescription>
          </Alert>
        )}

        {/* Task details form */}
        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
              Task Title
            </label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                <Calendar className="inline-block mr-1 h-4 w-4 text-blue-500" />
                Frequency
              </label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="One Time">One Time</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                <Clock className="inline-block mr-1 h-4 w-4 text-blue-500" />
                Time Required
              </label>
              <div className="flex gap-2">
                <Select value={hours} onValueChange={setHours}>
                  <SelectTrigger className="flex-1 border-blue-200">
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <SelectItem key={i} value={`0${i}`}>
                        {`0${i}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="flex items-center">:</span>
                <Select value={minutes} onValueChange={setMinutes}>
                  <SelectTrigger className="flex-1 border-blue-200">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="45">45</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                <DollarSign className="inline-block mr-1 h-4 w-4 text-blue-500" />
                Estimated Cost
              </label>
              <Select value={cost} onValueChange={setCost}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Select cost" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$0">$0</SelectItem>
                  <SelectItem value="$5">$5</SelectItem>
                  <SelectItem value="$10">$10</SelectItem>
                  <SelectItem value="$15">$15</SelectItem>
                  <SelectItem value="$20">$20</SelectItem>
                  <SelectItem value="$25+">$25+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={() => setOpen(false)}
            className="border-blue-200 text-blue-700 hover:bg-blue-50">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomTaskDialog;
