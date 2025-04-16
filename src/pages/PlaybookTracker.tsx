
import { useState } from "react";
import { Search, Calendar, Clock, DollarSign, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CircularProgressChart from "@/components/CircularProgressChart";
import DriverTasksAccordion from "@/components/DriverTasksAccordion";
import TopNavbar from "@/components/TopNavbar";
import AddCustomTaskDialog from "@/components/AddCustomTaskDialog";

const PlaybookTracker = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  // Mock data - Total tasks stats
  const taskStats = {
    total: 250,
    completed: 75,
    skipped: 25,
    pending: 150
  };

  // Calculate percentages
  const completedPercentage = (taskStats.completed / taskStats.total) * 100;
  const skippedPercentage = (taskStats.skipped / taskStats.total) * 100;
  const pendingPercentage = (taskStats.pending / taskStats.total) * 100;

  // Handle adding a custom task
  const handleAddCustomTask = (task: any) => {
    console.log("Custom task added:", task);
    // Here you would typically update your task list state
    // For now we're just logging it
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      
      {/* Header and Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Playbook Tracker Page</h1>
              <p className="text-blue-100 text-lg max-w-xl">
                Track and manage all your driver tasks in one central location
              </p>
            </div>
            <Button className="bg-white text-blue-700 hover:bg-blue-50">
              Visit the Resource Center
            </Button>
          </div>
        </div>
      </div>
      
      {/* Top Progress Overview */}
      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Overall Progress</h2>
            <CircularProgressChart 
              completed={completedPercentage} 
              skipped={skippedPercentage} 
              pending={pendingPercentage} 
            />
            <div className="grid grid-cols-3 gap-4 mt-6 w-full text-center">
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <p className="font-semibold text-lg">{taskStats.completed}</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-sm text-gray-600">Skipped</span>
                </div>
                <p className="font-semibold text-lg">{taskStats.skipped}</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <p className="font-semibold text-lg">{taskStats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Task Filters</h2>
            <div className="mb-6 flex flex-wrap gap-2">
              <Button 
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className="rounded-full"
              >
                All
              </Button>
              <Button 
                variant={activeFilter === "onetime" ? "default" : "outline"}
                onClick={() => setActiveFilter("onetime")}
                className="rounded-full"
              >
                One Time
              </Button>
              <Button 
                variant={activeFilter === "daily" ? "default" : "outline"}
                onClick={() => setActiveFilter("daily")}
                className="rounded-full"
              >
                Daily
              </Button>
              <Button 
                variant={activeFilter === "weekly" ? "default" : "outline"}
                onClick={() => setActiveFilter("weekly")}
                className="rounded-full"
              >
                Weekly
              </Button>
              <Button 
                variant={activeFilter === "monthly" ? "default" : "outline"}
                onClick={() => setActiveFilter("monthly")}
                className="rounded-full"
              >
                Monthly
              </Button>
              <Button 
                variant={activeFilter === "yearly" ? "default" : "outline"}
                onClick={() => setActiveFilter("yearly")}
                className="rounded-full"
              >
                Yearly
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="date">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="frequency">Sort by Frequency</SelectItem>
                  <SelectItem value="time">Sort by Time</SelectItem>
                  <SelectItem value="cost">Sort by Cost</SelectItem>
                </SelectContent>
              </Select>
              <AddCustomTaskDialog onAddTask={handleAddCustomTask} />
            </div>
          </div>
        </div>
        
        {/* Status Filter Buttons */}
        <div className="mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm flex justify-center gap-4">
            <Button 
              variant={activeStatus === "all" ? "default" : "outline"}
              onClick={() => setActiveStatus("all")}
              className="px-6 py-2"
            >
              All Tasks ({taskStats.total})
            </Button>
            <Button 
              variant={activeStatus === "pending" ? "default" : "outline"}
              onClick={() => setActiveStatus("pending")}
              className="px-6 py-2 text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              Pending ({taskStats.pending})
            </Button>
            <Button 
              variant={activeStatus === "completed" ? "default" : "outline"}
              onClick={() => setActiveStatus("completed")}
              className="px-6 py-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
            >
              Completed ({taskStats.completed})
            </Button>
            <Button 
              variant={activeStatus === "skipped" ? "default" : "outline"}
              onClick={() => setActiveStatus("skipped")}
              className="px-6 py-2 text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200"
            >
              Skipped ({taskStats.skipped})
            </Button>
          </div>
        </div>
        
        {/* All Tasks Section - Single View */}
        <DriverTasksAccordion 
          driverId="all" 
          searchQuery={searchQuery} 
          activeFilter={activeFilter} 
          activeStatus={activeStatus}
        />
      </div>
      
      {/* Gamification Footer */}
      <div className="bg-white border-t py-6 px-6 sticky bottom-0 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-2/3">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium mr-4">Overall Completion</span>
                <span className="text-sm font-bold ml-auto">{Math.round(completedPercentage)}%</span>
              </div>
              <Progress value={completedPercentage} className="h-3" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Review Skipped Tasks</Button>
              <Button>Mark All as Complete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookTracker;
