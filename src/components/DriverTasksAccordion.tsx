
import { useState } from "react";
import { Search, Calendar, Clock, DollarSign, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskCard from "@/components/TaskCard";

interface DriverTasksAccordionProps {
  driverId: string;
  searchQuery: string;
  activeFilter: string;
}

const DriverTasksAccordion = ({ driverId, searchQuery, activeFilter }: DriverTasksAccordionProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("frequency");
  
  // Generate mock task data for each driver
  const generateTasks = (categoryName: string, driverId: string) => {
    const categories = [
      { id: "website", name: "Website" },
      { id: "social", name: "Social Media" },
      { id: "local", name: "Local Listings" },
      { id: "email", name: "Email Marketing" },
      { id: "ads", name: "Paid Advertising" }
    ];
    
    const frequencies = ["Daily", "Weekly", "Monthly", "Yearly", "One Time"];
    const costs = ["$0", "$5", "$10", "$15", "$20"];
    const times = [
      { hours: "00", minutes: "15" },
      { hours: "00", minutes: "30" },
      { hours: "01", minutes: "00" },
      { hours: "01", minutes: "30" },
      { hours: "02", minutes: "00" }
    ];
    
    // Only return tasks for requested category or all tasks if in "all" view
    const relevantCategories = categoryName === "all" ? categories : categories.filter(c => {
      if (driverId === "brandprint") return ["website", "social", "local"].includes(c.id);
      if (driverId === "content") return ["email", "social"].includes(c.id);
      if (driverId === "licenses") return ["website", "ads"].includes(c.id);
      if (driverId === "customer") return ["ads", "email"].includes(c.id);
      if (driverId === "existing") return ["email", "local"].includes(c.id);
      return true;
    });
    
    const allTasks: TaskGroup[] = [];
    
    relevantCategories.forEach(category => {
      // Generate 5-12 tasks per category
      const taskCount = Math.floor(Math.random() * 7) + 5;
      const tasks = Array(taskCount).fill(0).map((_, i) => {
        const frequencyIndex = Math.floor(Math.random() * frequencies.length);
        return {
          id: `${category.id}-${i}`,
          title: `${category.name} Task ${i + 1}`,
          frequency: frequencies[frequencyIndex],
          frequencyDetail: frequencyIndex <= 1 ? "4" : "1", // 4 times per week/day or 1 time per month/year
          cost: costs[Math.floor(Math.random() * costs.length)],
          time: times[Math.floor(Math.random() * times.length)],
          description: `Description for ${category.name} Task ${i + 1}. This explains what needs to be done.`,
          resources: ["Resource 1", "Resource 2", "Help Guide"],
          completed: Math.random() > 0.7,
          skipped: !Math.random() > 0.7 && Math.random() > 0.8,
        };
      });
      
      allTasks.push({
        category: category.name,
        tasks
      });
    });
    
    return allTasks;
  };
  
  interface Task {
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
  }
  
  interface TaskGroup {
    category: string;
    tasks: Task[];
  }
  
  const taskGroups = generateTasks(driverId, driverId);
  
  // Filter tasks based on search query and active filter
  const filteredTaskGroups = taskGroups.map(group => {
    const filteredTasks = group.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes((searchQuery || localSearch).toLowerCase());
      
      let matchesFilter = true;
      if (activeFilter !== "all") {
        if (activeFilter === "onetime" && task.frequency !== "One Time") matchesFilter = false;
        if (activeFilter === "daily" && task.frequency !== "Daily") matchesFilter = false;
        if (activeFilter === "weekly" && task.frequency !== "Weekly") matchesFilter = false;
        if (activeFilter === "monthly" && task.frequency !== "Monthly") matchesFilter = false;
        if (activeFilter === "yearly" && task.frequency !== "Yearly") matchesFilter = false;
      }
      
      return matchesSearch && matchesFilter;
    });
    
    return {
      ...group,
      tasks: filteredTasks
    };
  }).filter(group => group.tasks.length > 0);
  
  // Count pending, skipped, and completed tasks
  const pendingCount = taskGroups.flatMap(g => g.tasks).filter(t => !t.completed && !t.skipped).length;
  const skippedCount = taskGroups.flatMap(g => g.tasks).filter(t => t.skipped).length;
  const completedCount = taskGroups.flatMap(g => g.tasks).filter(t => t.completed).length;
  
  // Mock driver descriptions
  const driverDescriptions: Record<string, string> = {
    brandprint: "Your Brandprint includes your digital presence (websites, social media business pages, local listings, GBP, etc) as well as your physical presence like a storefront or office.",
    content: "Content Asset Creation includes all the visual and written assets needed to populate your digital channels including your website, email campaigns, and social media.",
    licenses: "Licenses and 3rd Party Tools includes software subscriptions, domain renewals, and other technical services needed to maintain your online presence.",
    customer: "New Customer Acquisition focuses on marketing strategies and campaigns designed to attract new customers to your business.",
    existing: "Existing Customer Management includes retention strategies, loyalty programs, and ongoing communication with your current customer base.",
    all: "View and manage all tasks across your business areas to ensure efficient operations and growth."
  };
  
  // Get the appropriate description for the current driver
  const description = driverDescriptions[driverId] || driverDescriptions.all;
  
  return (
    <div className="bg-white rounded-xl shadow-sm mb-8">
      {/* Header with driver name and description */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          {driverId === "all" ? "All Tasks" : drivers.find(d => d.id === driverId)?.name || "Tasks"}
        </h2>
        <p className="text-gray-600">{description}</p>
        
        {/* Task stats */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Badge variant="outline" className="bg-blue-100 text-blue-700 py-1 px-4 text-sm">
            Pending Tasks: {pendingCount}
          </Badge>
          <Badge variant="outline" className="bg-amber-100 text-amber-700 py-1 px-4 text-sm">
            Skipped Tasks: {skippedCount}
          </Badge>
          <Badge variant="outline" className="bg-emerald-100 text-emerald-700 py-1 px-4 text-sm">
            Completed Tasks: {completedCount}
          </Badge>
        </div>
      </div>
      
      {/* Task summary and filters */}
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              className="pl-10"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frequency">Sort by Frequency</SelectItem>
                <SelectItem value="time">Sort by Time</SelectItem>
                <SelectItem value="cost">Sort by Cost</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Badge className="h-6 w-6 p-0 flex items-center justify-center bg-blue-600">{pendingCount}</Badge>
              Pending
            </Button>
            <Button variant="outline" className="gap-2">
              <Badge className="h-6 w-6 p-0 flex items-center justify-center bg-emerald-500">{completedCount}</Badge>
              Completed
            </Button>
          </div>
        </div>
      </div>
      
      {/* Task Categories Accordions */}
      <div className="p-6">
        <Accordion type="multiple" defaultValue={filteredTaskGroups.map(g => g.category)} className="space-y-4">
          {filteredTaskGroups.map((group) => (
            <AccordionItem key={group.category} value={group.category} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">{group.category}</h3>
                  <Badge className="ml-3 bg-blue-100 text-blue-700">
                    {group.tasks.length} tasks
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {group.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

// Mock data for drivers
const drivers = [
  { id: "all", name: "All Tasks" },
  { id: "brandprint", name: "Brandprint" },
  { id: "content", name: "Content Asset Creation" },
  { id: "licenses", name: "Licenses and 3rd Party Tools" },
  { id: "customer", name: "New Customer Acquisition" },
  { id: "existing", name: "Existing Customer Management" }
];

export default DriverTasksAccordion;
