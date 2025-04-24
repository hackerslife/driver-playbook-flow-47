
import { useState } from "react";
import { Search, Filter, ChevronDown, ArrowRight, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TopNavbar from "@/components/TopNavbar";
import DriverTasksAccordion from "@/components/DriverTasksAccordion";
import BudgetAllocationChart from "@/components/BudgetAllocationChart";
import TimeAllocationChart from "@/components/TimeAllocationChart";
import { useNavigate } from "react-router-dom";
import ConfettiBurst from "@/components/ConfettiBurst";
import { toast } from "@/hooks/use-toast";
import GeneratePlaybookProgress from "@/components/GeneratePlaybookProgress";

const getCurrentMonthYear = () => {
  const date = new Date();
  return {
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear()
  };
};

const getNextMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleString('default', { month: 'long' });
};

const Playbook = () => {
  const { month, year } = getCurrentMonthYear();
  const nextMonth = getNextMonth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [budgetViewBy, setBudgetViewBy] = useState("driver");
  const [timeViewBy, setTimeViewBy] = useState("driver");
  const [saved, setSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    industry: "Home Services",
    service: "Plumbing & HVAC",
    goal: "Increase Local Awareness",
    maturity: "Established (3-5 years)",
    revenue: "$250,000 - $500,000"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEmptyMonth, setIsEmptyMonth] = useState(false);

  const navigate = useNavigate();

  const handleGeneratePlaybook = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsEmptyMonth(false);
      toast({
        title: `${nextMonth}'s Playbook Generated`,
        description: "Your new playbook is ready with optimized recommendations.",
      });
    }, 6000);
  };

  const handleKeepPlaybook = () => {
    setIsEmptyMonth(false);
    toast({
      description: `Continuing with ${month}'s playbook`,
    });
  };

  const handleGoToTracker = () => {
    navigate("/tracker");
  };

  // Function to save playbook and show confetti
  const handleSavePlaybook = () => {
    setSaved(true);
    setShowConfetti(true);
    toast({
      title: "Playbook Saved!",
      description: "Your playbook has been saved successfully.",
    });
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <TopNavbar />
      {showConfetti && <ConfettiBurst />}
      
      {/* Header Section */}
      <div className="relative py-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {isEmptyMonth ? `${nextMonth} ${year}'s Marketing Playbook` : `${month} ${year}'s Marketing Playbook`}
            </h1>
            <p className="text-lg text-blue-600/80 max-w-xl text-center mb-6">
              {isEmptyMonth 
                ? "Your previous month's playbook is ready for an upgrade. Generate a new playbook optimized with your progress."
                : "Your customized marketing strategy and task plan"}
            </p>
            
            {/* Empty Month State or Monthly Update Alert */}
            {isEmptyMonth ? (
              <div className="w-full max-w-2xl bg-white border border-amber-200 rounded-lg p-6 mb-6">
                <p className="text-gray-800 mb-6 text-center">
                  Your previous month's playbook is obsolete. We've analyzed your progress and prepared optimized recommendations for {nextMonth}.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={handleGeneratePlaybook}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Generate {nextMonth}'s Playbook
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleKeepPlaybook}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Keep Using {month}'s Playbook
                  </Button>
                </div>
              </div>
            ) : (
              new Date().getDate() >= 25 && (
                <div className="w-full max-w-2xl bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-amber-800 mb-3">Your current playbook will be outdated soon. Would you like to:</p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setIsEmptyMonth(true)}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Preview {nextMonth}'s Playbook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleKeepPlaybook}
                      className="border-amber-600 text-amber-600 hover:bg-amber-50"
                    >
                      Keep Current Playbook
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Business Information Cards */}
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(businessInfo).map(([key, value]) => (
                <Card key={key} className="backdrop-blur-sm bg-white/80 hover:shadow-md transition-all border border-blue-100">
                  <CardHeader className="py-4 px-5">
                    <CardTitle className="text-sm text-gray-600 capitalize">{key}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 px-5 pb-4">
                    <Input
                      value={value}
                      onChange={(e) => setBusinessInfo(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      className="mt-1 bg-transparent border-blue-200 focus:border-blue-400"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Generate Playbook Button */}
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2"
              onClick={handleGeneratePlaybook}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Generate Updated Playbook
            </Button>
          </div>

          {/* Progress Bar during generation */}
          {isGenerating && (
            <div className="my-8">
              <GeneratePlaybookProgress />
            </div>
          )}

          {/* Action Buttons */}
          {!isEmptyMonth && !isGenerating && (
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <Button
                size="lg"
                onClick={handleSavePlaybook}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md"
              >
                Save My Playbook
              </Button>
              <Button
                size="lg"
                onClick={handleGoToTracker}
                className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white shadow-md"
              >
                <ArrowRight className="mr-2" size={20} />
                Track Your Tasks
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Only show if not empty month and not generating */}
      {!isEmptyMonth && !isGenerating && (
        <div className="max-w-7xl mx-auto py-8 px-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="mb-8 w-full flex justify-center">
              <TabsTrigger value="summary" className="w-40 text-lg py-3">Playbook Summary</TabsTrigger>
              <TabsTrigger value="tasks" className="w-40 text-lg py-3">Playbook Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-8">
              {/* Budget Allocation Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-blue-700">Budget Allocation</h2>
                  <Select value={budgetViewBy} onValueChange={setBudgetViewBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="View by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver">By Driver</SelectItem>
                      <SelectItem value="subdriver">By Subdriver</SelectItem>
                      <SelectItem value="platform">By Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-80">
                  <BudgetAllocationChart viewBy={budgetViewBy} />
                </div>
              </div>
              
              {/* Time Allocation Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-blue-700">Time Allocation</h2>
                  <Select value={timeViewBy} onValueChange={setTimeViewBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="View by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver">By Driver</SelectItem>
                      <SelectItem value="subdriver">By Subdriver</SelectItem>
                      <SelectItem value="platform">By Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-80">
                  <TimeAllocationChart viewBy={timeViewBy} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks">
              {/* Task Filters and Search */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Marketing Tasks</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search tasks..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Select defaultValue="date">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Sort by Date</SelectItem>
                        <SelectItem value="frequency">Sort by Frequency</SelectItem>
                        <SelectItem value="time">Sort by Time</SelectItem>
                        <SelectItem value="cost">Sort by Cost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Task Status Filter */}
                <div className="flex flex-wrap gap-3">
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
                </div>
              </div>
              
              {/* Task List */}
              <DriverTasksAccordion
                driverId="all"
                searchQuery={searchQuery}
                activeFilter={activeFilter}
                activeStatus={activeStatus}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Playbook;
