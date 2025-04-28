
import { useState } from "react";
import { ChevronDown, ChevronRight, Calendar, BarChart3, Clock, Settings, Building, Target, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import TopNavbar from "@/components/TopNavbar";
import DriverTasksAccordion from "@/components/DriverTasksAccordion";
import BudgetAllocationChart from "@/components/BudgetAllocationChart";
import TimeAllocationChart from "@/components/TimeAllocationChart";
import CircularProgressChart from "@/components/CircularProgressChart";
import AddCustomTaskDialog from "@/components/AddCustomTaskDialog";
import OptimizationStreak from "@/components/OptimizationStreak";
import FairPricingGrid from "@/components/FairPricingGrid";
import GeneratePlaybookProgress from "@/components/GeneratePlaybookProgress";
import ConfettiBurst from "@/components/ConfettiBurst";
import { useIsMobile } from "@/hooks/use-mobile";

const PlaybookTracker = () => {
  const [activeDriver, setActiveDriver] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("april-2023");
  const [chartView, setChartView] = useState("driver");
  const [showGenerateProgress, setShowGenerateProgress] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const isMobile = useIsMobile();
  
  // Current month's editable fields in the playbook
  const [businessIndustry, setBusinessIndustry] = useState("Local Service Business");
  const [businessService, setBusinessService] = useState("Home Services");
  const [marketingGoal, setMarketingGoal] = useState("Increase Online Presence");
  const [businessMaturity, setBusinessMaturity] = useState("Established (3+ years)");
  const [annualRevenue, setAnnualRevenue] = useState("$100,000 - $500,000");
  
  // May's editable fields - separate state for the next month
  const [mayBusinessIndustry, setMayBusinessIndustry] = useState("Local Service Business");
  const [mayBusinessService, setMayBusinessService] = useState("Home Services");
  const [mayMarketingGoal, setMayMarketingGoal] = useState("Increase Online Presence");
  const [mayBusinessMaturity, setMayBusinessMaturity] = useState("Established (3+ years)");
  const [mayAnnualRevenue, setMayAnnualRevenue] = useState("$100,000 - $500,000");
  
  // Fair pricing comparison items
  const fairPricingItems = [
    { 
      label: "Our Monthly Fee", 
      price: "$99/mo", 
      detail: "Unlimited business profiles", 
      icon: "dollar-sign" as const 
    },
    { 
      label: "Avg Agency Cost", 
      price: "$1,200/mo", 
      detail: "For comparable services", 
      icon: "building" as const 
    },
    { 
      label: "Your Savings", 
      price: "92%", 
      detail: "Compared to agencies", 
      icon: "badge-percent" as const 
    },
  ];

  const handleGeneratePlaybook = () => {
    setShowGenerateProgress(true);
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setShowGenerateProgress(false);
      setIsGenerating(false);
      setSelectedTab("may-2023");
      setShowConfetti(true);
      
      // Hide confetti after animation completes
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }, 6000);
  };
  
  // Calculate progress for the circular chart
  const completedPercentage = 42; // Mock data - would be calculated from actual task completion
  const skippedPercentage = 18; // Mock data
  const pendingPercentage = 100 - completedPercentage - skippedPercentage;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar />
      
      {showConfetti && <ConfettiBurst onDone={() => setShowConfetti(false)} />}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
      
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Marketing Playbook</h1>
            <p className="text-slate-600">
              Your personalized monthly marketing tasks based on your business needs and budget
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium">
                  <span>Playbook Generation: </span>
                  <span className="font-bold">5/100</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <p className="text-sm">
                  You've used 5 out of your 100 playbook generations. Each generation creates a new monthly marketing plan based on your business profile.
                </p>
              </HoverCardContent>
            </HoverCard>
            
            <Button 
              onClick={handleGeneratePlaybook} 
              className="bg-blue-600 hover:bg-blue-700 flex gap-1 items-center"
              disabled={isGenerating}
            >
              <Calendar className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Playbook"}
            </Button>
          </div>
        </div>
        
        {showGenerateProgress ? (
          <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Creating Your Next Month's Playbook</h2>
            <GeneratePlaybookProgress />
          </div>
        ) : (
          <Tabs 
            value={selectedTab} 
            onValueChange={setSelectedTab}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="april-2023" className="data-[state=active]:bg-white">April 2023</TabsTrigger>
                  <TabsTrigger value="may-2023" className="data-[state=active]:bg-white">May 2023</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-gray-600">Skipped</span>
                  </div>
                </div>
              </div>
            </div>
            
            <TabsContent value="april-2023" className="space-y-8 mt-6">
              {/* Optimization streak for continuous improvement */}
              <OptimizationStreak 
                isNextMonth={false} 
                hasLastMonthFeedback={true}
                streakCount={3}
              />
            
              {/* Business Profile Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-slate-800">Business Profile</h2>
                  <p className="text-slate-600 mt-1">Your business details used to generate this playbook</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="industry">Business Industry</Label>
                      <Select value={businessIndustry} onValueChange={setBusinessIndustry}>
                        <SelectTrigger id="industry" className="mt-1.5">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Local Service Business">Local Service Business</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="service">Business Service</Label>
                      <Select value={businessService} onValueChange={setBusinessService}>
                        <SelectTrigger id="service" className="mt-1.5">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home Services">Home Services</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                          <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                          <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                          <SelectItem value="Retail & Shopping">Retail & Shopping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="goal">Marketing Goal</Label>
                      <Select value={marketingGoal} onValueChange={setMarketingGoal}>
                        <SelectTrigger id="goal" className="mt-1.5">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Increase Online Presence">Increase Online Presence</SelectItem>
                          <SelectItem value="Generate More Leads">Generate More Leads</SelectItem>
                          <SelectItem value="Improve Brand Awareness">Improve Brand Awareness</SelectItem>
                          <SelectItem value="Boost Sales">Boost Sales</SelectItem>
                          <SelectItem value="Expand to New Markets">Expand to New Markets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="maturity">Business Maturity</Label>
                      <Select value={businessMaturity} onValueChange={setBusinessMaturity}>
                        <SelectTrigger id="maturity" className="mt-1.5">
                          <SelectValue placeholder="Select maturity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Startup (0-1 years)">Startup (0-1 years)</SelectItem>
                          <SelectItem value="Growing (1-3 years)">Growing (1-3 years)</SelectItem>
                          <SelectItem value="Established (3+ years)">Established (3+ years)</SelectItem>
                          <SelectItem value="Enterprise (10+ years)">Enterprise (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="revenue">Annual Revenue</Label>
                      <Select value={annualRevenue} onValueChange={setAnnualRevenue}>
                        <SelectTrigger id="revenue" className="mt-1.5">
                          <SelectValue placeholder="Select revenue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$0 - $100,000">$0 - $100,000</SelectItem>
                          <SelectItem value="$100,000 - $500,000">$100,000 - $500,000</SelectItem>
                          <SelectItem value="$500,000 - $1,000,000">$500,000 - $1,000,000</SelectItem>
                          <SelectItem value="$1,000,000+">$1,000,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Marketing Overview Dashboard */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-slate-800">Marketing Overview</h2>
                  <p className="text-slate-600 mt-1">Your marketing performance at a glance</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-medium mb-4">Tasks Completion Status</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-lg p-4 text-center flex flex-col items-center justify-center border border-blue-100">
                          <div className="text-blue-600 text-lg font-semibold mb-1">17</div>
                          <div className="text-blue-800 font-medium">Pending Tasks</div>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-4 text-center flex flex-col items-center justify-center border border-emerald-100">
                          <div className="text-emerald-600 text-lg font-semibold mb-1">15</div>
                          <div className="text-emerald-800 font-medium">Completed Tasks</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4 text-center flex flex-col items-center justify-center border border-amber-100">
                          <div className="text-amber-600 text-lg font-semibold mb-1">7</div>
                          <div className="text-amber-800 font-medium">Skipped Tasks</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Time Allocation</h3>
                        <div className="h-[250px]">
                          <TimeAllocationChart viewBy={chartView} />
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Select value={chartView} onValueChange={setChartView}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="View by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="driver">View by Driver</SelectItem>
                            <SelectItem value="subdriver">View by Sub-Driver</SelectItem>
                            <SelectItem value="platform">View by Platform</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Overall Completion</h3>
                      <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center border shadow-sm">
                        <CircularProgressChart 
                          completed={completedPercentage} 
                          skipped={skippedPercentage} 
                          pending={pendingPercentage} 
                        />
                        <div className="mt-4 grid grid-cols-3 w-full gap-2">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 mb-1"></div>
                            <div className="text-xs text-gray-500">Completed</div>
                            <div className="text-sm font-medium">{completedPercentage}%</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mb-1"></div>
                            <div className="text-xs text-gray-500">Skipped</div>
                            <div className="text-sm font-medium">{skippedPercentage}%</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
                            <div className="text-xs text-gray-500">Pending</div>
                            <div className="text-sm font-medium">{pendingPercentage}%</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">Budget Allocation</h3>
                        <div className="bg-white rounded-lg p-4 border shadow-sm h-[250px]">
                          <BudgetAllocationChart viewBy={chartView} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tasks Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-800">Marketing Tasks</h2>
                      <p className="text-slate-600 mt-1">Your custom-tailored marketing tasks for this month</p>
                    </div>
                    <AddCustomTaskDialog onAddTask={(task) => console.log("Task added:", task)} />
                  </div>
                </div>
                
                {/* Task Filters */}
                <div className="p-6 border-b">
                  {/* Task filter buttons for different business drivers */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={activeDriver === "all" ? "default" : "outline"} 
                      className="gap-2"
                      onClick={() => setActiveDriver("all")}
                    >
                      <BarChart3 className="h-4 w-4" />
                      All Tasks
                    </Button>
                    <Button 
                      variant={activeDriver === "brandprint" ? "default" : "outline"} 
                      className="gap-2"
                      onClick={() => setActiveDriver("brandprint")}
                    >
                      <Building className="h-4 w-4" />
                      Brandprint
                    </Button>
                    <Button 
                      variant={activeDriver === "content" ? "default" : "outline"} 
                      className="gap-2"
                      onClick={() => setActiveDriver("content")}
                    >
                      <Target className="h-4 w-4" />
                      Content Creation
                    </Button>
                    <Button 
                      variant={activeDriver === "licenses" ? "default" : "outline"} 
                      className="gap-2"
                      onClick={() => setActiveDriver("licenses")}
                    >
                      <Settings className="h-4 w-4" />
                      Licensing Tools
                    </Button>
                    <Button 
                      variant={activeDriver === "customer" ? "default" : "outline"} 
                      className="gap-2"
                      onClick={() => setActiveDriver("customer")}
                    >
                      <LineChart className="h-4 w-4" />
                      Customer Acquisition
                    </Button>
                    <Button 
                      variant={activeDriver === "existing" ? "default" : "outline"} 
                      className="gap-2"
                      onClick={() => setActiveDriver("existing")}
                    >
                      <Clock className="h-4 w-4" />
                      Existing Customer Management
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button 
                      variant={activeFilter === "all" ? "default" : "outline"} 
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setActiveFilter("all")}
                    >
                      All Frequencies
                    </Button>
                    <Button 
                      variant={activeFilter === "onetime" ? "default" : "outline"} 
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setActiveFilter("onetime")}
                    >
                      One Time
                    </Button>
                    <Button 
                      variant={activeFilter === "daily" ? "default" : "outline"} 
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setActiveFilter("daily")}
                    >
                      Daily
                    </Button>
                    <Button 
                      variant={activeFilter === "weekly" ? "default" : "outline"} 
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setActiveFilter("weekly")}
                    >
                      Weekly
                    </Button>
                    <Button 
                      variant={activeFilter === "monthly" ? "default" : "outline"} 
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setActiveFilter("monthly")}
                    >
                      Monthly
                    </Button>
                    <Button 
                      variant={activeFilter === "yearly" ? "default" : "outline"} 
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setActiveFilter("yearly")}
                    >
                      Yearly
                    </Button>
                  </div>
                </div>
                
                <DriverTasksAccordion 
                  driverId={activeDriver}
                  searchQuery={searchQuery}
                  activeFilter={activeFilter}
                  activeStatus={activeStatus}
                />
              </div>
              
              {/* Fair Pricing Comparison */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-slate-800">Fair Pricing Comparison</h2>
                  <p className="text-slate-600 mt-1">See how our prices compare to traditional marketing agencies</p>
                </div>
                <div className="p-6">
                  <FairPricingGrid items={fairPricingItems} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="may-2023" className="space-y-8 mt-6">
              {/* Business Profile Section - May's version with editable fields */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-semibold text-slate-800">Business Profile</h2>
                  <p className="text-slate-600 mt-1">Your business details used to generate this playbook</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="may-industry">Business Industry</Label>
                      <Select value={mayBusinessIndustry} onValueChange={setMayBusinessIndustry}>
                        <SelectTrigger id="may-industry" className="mt-1.5">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Local Service Business">Local Service Business</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="may-service">Business Service</Label>
                      <Select value={mayBusinessService} onValueChange={setMayBusinessService}>
                        <SelectTrigger id="may-service" className="mt-1.5">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Home Services">Home Services</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                          <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                          <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                          <SelectItem value="Retail & Shopping">Retail & Shopping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="may-goal">Marketing Goal</Label>
                      <Select value={mayMarketingGoal} onValueChange={setMayMarketingGoal}>
                        <SelectTrigger id="may-goal" className="mt-1.5">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Increase Online Presence">Increase Online Presence</SelectItem>
                          <SelectItem value="Generate More Leads">Generate More Leads</SelectItem>
                          <SelectItem value="Improve Brand Awareness">Improve Brand Awareness</SelectItem>
                          <SelectItem value="Boost Sales">Boost Sales</SelectItem>
                          <SelectItem value="Expand to New Markets">Expand to New Markets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="may-maturity">Business Maturity</Label>
                      <Select value={mayBusinessMaturity} onValueChange={setMayBusinessMaturity}>
                        <SelectTrigger id="may-maturity" className="mt-1.5">
                          <SelectValue placeholder="Select maturity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Startup (0-1 years)">Startup (0-1 years)</SelectItem>
                          <SelectItem value="Growing (1-3 years)">Growing (1-3 years)</SelectItem>
                          <SelectItem value="Established (3+ years)">Established (3+ years)</SelectItem>
                          <SelectItem value="Enterprise (10+ years)">Enterprise (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="may-revenue">Annual Revenue</Label>
                      <Select value={mayAnnualRevenue} onValueChange={setMayAnnualRevenue}>
                        <SelectTrigger id="may-revenue" className="mt-1.5">
                          <SelectValue placeholder="Select revenue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$0 - $100,000">$0 - $100,000</SelectItem>
                          <SelectItem value="$100,000 - $500,000">$100,000 - $500,000</SelectItem>
                          <SelectItem value="$500,000 - $1,000,000">$500,000 - $1,000,000</SelectItem>
                          <SelectItem value="$1,000,000+">$1,000,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Rest of May's content (similar to April but with updated dates and content) */}
              <div className="bg-white rounded-xl shadow-sm p-10">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">May 2023 Marketing Playbook</h2>
                  <p className="text-slate-600 mb-6">Your customized marketing plan for May is ready</p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedTab("april-2023")}
                  >
                    View Tasks
                  </Button>
                </div>
              </div>
            </TabsContent>
            
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default PlaybookTracker;
