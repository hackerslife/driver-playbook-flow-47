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
import OptimizationStreak from "@/components/OptimizationStreak";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const getCurrentMonthYear = () => {
  const date = new Date();
  return {
    month: date.toLocaleString('default', {
      month: 'long'
    }),
    year: date.getFullYear()
  };
};
const getNextMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleString('default', {
    month: 'long'
  });
};
const Playbook = () => {
  const {
    month,
    year
  } = getCurrentMonthYear();
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
    goal: "Balanced",
    maturity: "Established (3-5 years)",
    revenue: "250000"
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEmptyMonth, setIsEmptyMonth] = useState(false);
  const [activeMonth, setActiveMonth] = useState<"current" | "next">("current");
  const [hasLastMonthFeedback, setHasLastMonthFeedback] = useState(false);
  const [streakCount, setStreakCount] = useState(1);
  const [marketingGoalValue, setMarketingGoalValue] = useState([50]);
  const [generationCount, setGenerationCount] = useState(5);
  const GENERATION_LIMIT = 100;
  const navigate = useNavigate();
  const handleGeneratePlaybook = () => {
    setIsGenerating(true);
    setGenerationCount(prev => Math.min(prev + 1, GENERATION_LIMIT));
    setTimeout(() => {
      setIsGenerating(false);
      setIsEmptyMonth(false);
      toast({
        title: `${nextMonth}'s Playbook Generated`,
        description: "Your new playbook is ready with optimized recommendations."
      });
    }, 6000);
  };
  const handleKeepPlaybook = () => {
    setIsEmptyMonth(false);
    toast({
      description: `Continuing with ${month}'s playbook`
    });
  };
  const handleGoToTracker = () => {
    navigate("/tracker");
  };
  const handleSavePlaybook = () => {
    setSaved(true);
    setShowConfetti(true);
    toast({
      title: "Playbook Saved!",
      description: "Your playbook has been saved successfully."
    });
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };
  const getGoalLabel = (value: number) => {
    if (value <= 33) return "Max Profitability";
    if (value <= 66) return "Balanced";
    return "Max Growth";
  };
  const handleGoalChange = (values: number[]) => {
    setMarketingGoalValue(values);
    setBusinessInfo(prev => ({
      ...prev,
      goal: getGoalLabel(values[0])
    }));
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <TopNavbar />
      {showConfetti && <ConfettiBurst />}
      
      <div className="w-full flex justify-center pt-6">
        <div className="inline-flex rounded-lg border border-blue-200 p-1 bg-white shadow-sm">
          <Button variant={activeMonth === "current" ? "default" : "ghost"} className={`rounded-md px-6 py-2 text-sm font-medium transition-all ${activeMonth === "current" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-500"}`} onClick={() => setActiveMonth("current")}>
            Current Month
          </Button>
          <Button variant={activeMonth === "next" ? "default" : "ghost"} className={`rounded-md px-6 py-2 text-sm font-medium transition-all ${activeMonth === "next" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "text-gray-500"}`} onClick={() => {
          setActiveMonth("next");
          setIsEmptyMonth(true);
        }}>Current Month</Button>
        </div>
      </div>

      <div className="relative py-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 md:text-4xl">
              {activeMonth === "next" ? `${nextMonth} ${year}'s Marketing Playbook` : `${month} ${year}'s Marketing Playbook`}
            </h1>
            <p className="text-lg text-blue-600/80 max-w-xl text-center mb-6">
              {activeMonth === "next" ? "Generate your next month's playbook optimized with your progress." : "Your customized marketing strategy and task plan"}
            </p>
            
            {/* Only show optimization streak when not in next month */}
            {activeMonth === "current" && <div className="mb-8">
                <OptimizationStreak isNextMonth={activeMonth === "next"} hasLastMonthFeedback={hasLastMonthFeedback} streakCount={streakCount} />
              </div>}

            {activeMonth === "next" && <div className="w-full max-w-2xl bg-white border border-amber-200 rounded-lg p-6 mb-6">
                <p className="text-gray-800 mb-6 text-center">
                  Your previous month's playbook is obsolete. We've analyzed your progress and prepared optimized recommendations for {nextMonth}.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={handleGeneratePlaybook} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Review & Update {nextMonth}'s Playbook
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => {
                setActiveMonth("current");
                setIsEmptyMonth(false);
              }} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Keep Using {month}'s Playbook
                  </Button>
                </div>
              </div>}
          </div>

          {(activeMonth === "current" || !isEmptyMonth) && <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Business Industry Field */}
                  <Card className="backdrop-blur-sm bg-white/80 hover:shadow-md transition-all border border-blue-100">
                    <CardHeader className="py-4 px-5">
                      <CardTitle className="text-sm text-gray-600 capitalize">Business Industry</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 px-5 pb-4">
                      <Select value={businessInfo.industry} onValueChange={value => setBusinessInfo(prev => ({
                  ...prev,
                  industry: value,
                  // Reset service if industry changes
                  service: value === "Home Services" ? "Plumbing & HVAC" : "General"
                }))}>
                        <SelectTrigger className="w-full bg-transparent border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home Services">Home Services</SelectItem>
                          <SelectItem value="Educational Services">Educational Services</SelectItem>
                          <SelectItem value="Financial Services">Financial Services</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                  
                  {/* Business Service Field */}
                  <Card className="backdrop-blur-sm bg-white/80 hover:shadow-md transition-all border border-blue-100">
                    <CardHeader className="py-4 px-5">
                      <CardTitle className="text-sm text-gray-600 capitalize">Business Service</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 px-5 pb-4">
                      <Select value={businessInfo.service} onValueChange={value => setBusinessInfo(prev => ({
                  ...prev,
                  service: value
                }))}>
                        <SelectTrigger className="w-full bg-transparent border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessInfo.industry === "Home Services" ? <>
                              <SelectItem value="Plumbing & HVAC">Plumbing & HVAC</SelectItem>
                              <SelectItem value="Roofing Services">Roofing Services</SelectItem>
                              <SelectItem value="Landscaping">Landscaping</SelectItem>
                              <SelectItem value="Cleaning Services">Cleaning Services</SelectItem>
                            </> : <SelectItem value="General">General</SelectItem>}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                  
                  {/* Marketing Goal Field with Slider */}
                  <Card className="backdrop-blur-sm bg-white/80 hover:shadow-md transition-all border border-blue-100">
                    <CardHeader className="py-4 px-5">
                      <CardTitle className="text-sm text-gray-600 capitalize">Marketing Goal</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 px-5 pb-4">
                      <div className="space-y-4">
                        <Slider className="my-4" value={marketingGoalValue} min={0} max={100} step={1} onValueChange={handleGoalChange} />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Max Profitability</span>
                          <span>Balanced</span>
                          <span>Max Growth</span>
                        </div>
                        <div className="pt-2 text-center text-sm font-medium text-blue-600">
                          {businessInfo.goal}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Business Maturity Field */}
                  <Card className="backdrop-blur-sm bg-white/80 hover:shadow-md transition-all border border-blue-100">
                    <CardHeader className="py-4 px-5">
                      <CardTitle className="text-sm text-gray-600 capitalize">Business Maturity</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 px-5 pb-4">
                      <Select value={businessInfo.maturity} onValueChange={value => setBusinessInfo(prev => ({
                  ...prev,
                  maturity: value
                }))}>
                        <SelectTrigger className="w-full bg-transparent border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Select maturity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New/Startup">New/Startup</SelectItem>
                          <SelectItem value="Established (3-5 years)">Established (3-5 years)</SelectItem>
                          <SelectItem value="Mature (5+ years)">Mature (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                  
                  {/* Annual Revenue Field */}
                  <Card className="backdrop-blur-sm bg-white/80 hover:shadow-md transition-all border border-blue-100">
                    <CardHeader className="py-4 px-5">
                      <CardTitle className="text-sm text-gray-600 capitalize">Annual Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 px-5 pb-4">
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          $
                        </span>
                        <Input value={businessInfo.revenue} onChange={e => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '');
                    setBusinessInfo(prev => ({
                      ...prev,
                      revenue: value
                    }));
                  }} className="pl-6 bg-transparent border-blue-200 focus:border-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="relative">
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2" onClick={handleGeneratePlaybook}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Generate Playbook
                  </Button>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-sm text-gray-500">
                            {generationCount}/{GENERATION_LIMIT}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>You've used {generationCount} out of {GENERATION_LIMIT} monthly playbook generations</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>}

            {isGenerating && <div className="my-8">
                <GeneratePlaybookProgress />
              </div>}

            {!isEmptyMonth && !isGenerating && <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <Button size="lg" onClick={handleSavePlaybook} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md">
                  {saved ? "Update My Playbook" : "Save My Playbook"}
                </Button>
                <Button size="lg" onClick={handleGoToTracker} className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white shadow-md">
                  <ArrowRight className="mr-2" size={20} />
                  Track Your Tasks
                </Button>
              </div>}
        </div>
      </div>

      {!isEmptyMonth && !isGenerating && <div className="max-w-7xl mx-auto py-8 px-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="mb-8 w-full flex justify-center">
              <TabsTrigger value="summary" className="w-40 text-lg mx-[24px] my-[13px] py-[10px] px-[103px]">
                Playbook Summary
              </TabsTrigger>
              <TabsTrigger value="tasks" className="w-40 text-lg py-3">
                Playbook Tasks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6 mx-[2px] my-[42px] py-[52px]">
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
                <div className="h-80 mx-[240px]">
                  <BudgetAllocationChart viewBy={budgetViewBy} />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 my-[36px] mx-0 px-[37px] py-[41px]">
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
                <div className="h-80 mx-[240px]">
                  <TimeAllocationChart viewBy={timeViewBy} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Marketing Tasks</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input placeholder="Search tasks..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
                
                <div className="flex flex-wrap gap-3">
                  <Button variant={activeFilter === "all" ? "default" : "outline"} onClick={() => setActiveFilter("all")} className="rounded-full">
                    All
                  </Button>
                  <Button variant={activeFilter === "onetime" ? "default" : "outline"} onClick={() => setActiveFilter("onetime")} className="rounded-full">
                    One Time
                  </Button>
                  <Button variant={activeFilter === "daily" ? "default" : "outline"} onClick={() => setActiveFilter("daily")} className="rounded-full">
                    Daily
                  </Button>
                  <Button variant={activeFilter === "weekly" ? "default" : "outline"} onClick={() => setActiveFilter("weekly")} className="rounded-full">
                    Weekly
                  </Button>
                  <Button variant={activeFilter === "monthly" ? "default" : "outline"} onClick={() => setActiveFilter("monthly")} className="rounded-full">
                    Monthly
                  </Button>
                </div>
              </div>
              
              <DriverTasksAccordion driverId="all" searchQuery={searchQuery} activeFilter={activeFilter} activeStatus={activeStatus} />
            </TabsContent>
          </Tabs>
        </div>}
    </div>;
};
export default Playbook;
