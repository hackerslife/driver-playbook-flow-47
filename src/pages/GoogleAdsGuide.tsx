
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  BarChart3, 
  Search, 
  Settings, 
  BookOpen, 
  ArrowRight, 
  Key, 
  ClipboardList, 
  Star, 
  LineChart,
  Target, 
  DollarSign, 
  PenTool, 
  MapPin, 
  Rocket, 
  Percent, 
  SplitSquareVertical, 
  Activity,
  AlertTriangle, 
  PieChart, 
  Wrench, 
  Calendar, 
  CheckSquare, 
  LayoutTemplate, 
  HelpCircle
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const GoogleAdsGuide = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const toggleComplete = (itemId: string) => {
    if (completedItems.includes(itemId)) {
      setCompletedItems(completedItems.filter(id => id !== itemId));
    } else {
      setCompletedItems([...completedItems, itemId]);
    }
    
    // Calculate progress based on checklist items
    const totalChecklistItems = 15; // Total number of checklist items
    const newProgress = Math.round((completedItems.length / totalChecklistItems) * 100);
    setProgress(newProgress);
  };

  const renderSectionHeader = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="flex items-start gap-4 mb-6">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  const renderInfoCard = (icon: React.ReactNode, title: string, content: string) => (
    <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );

  const renderStepCard = (number: number, title: string, description: string, icon: React.ReactNode) => (
    <div className="flex items-start gap-4 mb-6 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold">{title}</h3>
          <div className="text-primary">{icon}</div>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );

  const renderTipCard = (title: string, description: string, icon: React.ReactNode) => (
    <div className="border rounded-lg p-4 bg-secondary/10 hover:bg-secondary/20 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-secondary">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );

  const renderGlossaryTerm = (term: string, definition: string) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-semibold text-primary underline underline-offset-4">
          {term}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{term}</h4>
          <p className="text-sm text-muted-foreground">{definition}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  const renderChecklistItem = (id: string, text: string) => (
    <div className="flex items-center space-x-2 mb-2">
      <button 
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-primary"
        onClick={() => toggleComplete(id)}
      >
        {completedItems.includes(id) && <CheckCircle className="h-4 w-4 text-primary" />}
      </button>
      <label className={`text-sm ${completedItems.includes(id) ? 'line-through text-muted-foreground' : ''}`}>
        {text}
      </label>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="sticky top-20">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Google Ads Guide
                </CardTitle>
                <CardDescription>
                  Small Business Edition
                </CardDescription>
                <div className="mt-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Your progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-1">
                  <Button 
                    variant={activeSection === "introduction" ? "default" : "ghost"} 
                    className="w-full justify-start pl-6" 
                    onClick={() => setActiveSection("introduction")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Introduction
                  </Button>
                  <Button 
                    variant={activeSection === "key-features" ? "default" : "ghost"} 
                    className="w-full justify-start pl-6" 
                    onClick={() => setActiveSection("key-features")}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Key Features
                  </Button>
                  <Button 
                    variant={activeSection === "setup-guide" ? "default" : "ghost"} 
                    className="w-full justify-start pl-6" 
                    onClick={() => setActiveSection("setup-guide")}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Setup Guide
                  </Button>
                  <Button 
                    variant={activeSection === "best-practices" ? "default" : "ghost"} 
                    className="w-full justify-start pl-6" 
                    onClick={() => setActiveSection("best-practices")}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Best Practices
                  </Button>
                  <Button 
                    variant={activeSection === "analyzing" ? "default" : "ghost"} 
                    className="w-full justify-start pl-6" 
                    onClick={() => setActiveSection("analyzing")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analyzing
                  </Button>
                  <Button 
                    variant={activeSection === "bonus" ? "default" : "ghost"} 
                    className="w-full justify-start pl-6" 
                    onClick={() => setActiveSection("bonus")}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Bonus Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {/* Introduction Section */}
            {activeSection === "introduction" && (
              <div className="space-y-6">
                {renderSectionHeader(<BookOpen className="h-6 w-6" />, "Introduction to Google Paid Search", "Understand the basics and benefits")}
                
                <div className="grid md:grid-cols-3 gap-4">
                  {renderInfoCard(
                    <Search className="h-5 w-5" />, 
                    "What is Google Ads?", 
                    "Google Ads is an online advertising platform that allows businesses to display ads on Google search results and its advertising network."
                  )}
                  
                  {renderInfoCard(
                    <Target className="h-5 w-5" />, 
                    "Why it matters", 
                    "Small businesses can compete with larger companies by targeting specific customers when they're actively searching for your products or services."
                  )}
                  
                  {renderInfoCard(
                    <BarChart3 className="h-5 w-5" />, 
                    "Benefits of paid search", 
                    "Immediate visibility, precise targeting, measurable results, flexible budgets, and the ability to reach customers at the perfect moment."
                  )}
                </div>

                <div className="bg-accent/30 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4">Google Ads at a Glance</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Pay-Per-Click (PPC)</h4>
                        <p className="text-sm text-muted-foreground">You only pay when someone clicks your ad</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Highly Targeted</h4>
                        <p className="text-sm text-muted-foreground">Reach customers based on search terms, location, and more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <LineChart className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Measurable Results</h4>
                        <p className="text-sm text-muted-foreground">Track everything from clicks to conversions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Settings className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Customizable</h4>
                        <p className="text-sm text-muted-foreground">Control your budget, bidding, and ad content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Features Section */}
            {activeSection === "key-features" && (
              <div className="space-y-6">
                {renderSectionHeader(<Key className="h-6 w-6" />, "Key Features to Know", "Master the essential Google Ads components")}
                
                <Tabs defaultValue="search-campaigns">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="search-campaigns">
                      <Search className="h-4 w-4 mr-2" />
                      Search Campaigns
                    </TabsTrigger>
                    <TabsTrigger value="ad-extensions">
                      <LayoutTemplate className="h-4 w-4 mr-2" />
                      Ad Extensions
                    </TabsTrigger>
                    <TabsTrigger value="targeting">
                      <Target className="h-4 w-4 mr-2" />
                      Targeting
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="search-campaigns" className="mt-4 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Search Campaigns, Keywords & Bidding</CardTitle>
                        <CardDescription>The building blocks of your Google Ads strategy</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Search className="h-4 w-4 text-primary" />
                            Search Campaigns
                          </h4>
                          <p className="text-sm text-muted-foreground">Search campaigns show your ads when people search for terms related to your products or services. These ads appear at the top of Google search results.</p>
                        </div>
                        
                        <div className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Key className="h-4 w-4 text-primary" />
                            Keywords
                          </h4>
                          <p className="text-sm text-muted-foreground">Keywords are the search terms you bid on. You can choose match types to control how closely a search must match your keyword:</p>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <Badge variant="outline" className="justify-start">Broad Match</Badge>
                            <Badge variant="outline" className="justify-start">Phrase Match</Badge>
                            <Badge variant="outline" className="justify-start">Exact Match</Badge>
                            <Badge variant="outline" className="justify-start">Negative Match</Badge>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-primary pl-4 py-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            Bidding
                          </h4>
                          <p className="text-sm text-muted-foreground">Bidding determines how much you're willing to pay for a click. Google Ads offers various bidding strategies:</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm">Manual CPC (cost-per-click)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm">Target CPA (cost-per-acquisition)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm">Maximize Conversions</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm">ROAS (return on ad spend)</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="ad-extensions" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Ad Extensions & Responsive Search Ads</CardTitle>
                        <CardDescription>Enhance your ads with additional information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <LayoutTemplate className="h-4 w-4 text-primary" />
                              Ad Extensions
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">Ad extensions add extra information to your ads, making them more helpful and attractive to potential customers.</p>
                            <div className="space-y-2">
                              <Badge variant="secondary" className="mr-1">Sitelink Extensions</Badge>
                              <Badge variant="secondary" className="mr-1">Call Extensions</Badge>
                              <Badge variant="secondary" className="mr-1">Location Extensions</Badge>
                              <Badge variant="secondary" className="mr-1">Price Extensions</Badge>
                              <Badge variant="secondary" className="mr-1">Promotion Extensions</Badge>
                            </div>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <PenTool className="h-4 w-4 text-primary" />
                              Responsive Search Ads
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">Responsive search ads automatically test different combinations of headlines and descriptions to determine what performs best.</p>
                            <div className="text-sm space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <p>Provide up to 15 headlines and 4 descriptions</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <p>Google tests combinations to find what works best</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <p>Adapts to limited screen spaces (like mobile)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-accent/30 rounded-lg p-4 mt-4">
                          <h4 className="font-semibold mb-2">Pro Tip</h4>
                          <p className="text-sm">Use as many relevant ad extensions as possible. They improve your ad's visibility and usually increase click-through rate at no additional cost.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="targeting" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Targeting & Geo-Fencing</CardTitle>
                        <CardDescription>Reach the right audience at the right time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                Audience Targeting
                              </h4>
                              <p className="text-sm text-muted-foreground">Target specific groups of people:</p>
                              <ul className="text-sm space-y-1.5 list-disc pl-5">
                                <li>Demographics (age, gender, income)</li>
                                <li>Interests & Behaviors</li>
                                <li>In-market audiences (active shoppers)</li>
                                <li>Custom segments based on search activity</li>
                                <li>Your own customer lists (with Customer Match)</li>
                              </ul>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-semibold flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                Geo-Targeting
                              </h4>
                              <p className="text-sm text-muted-foreground">Show ads to people in specific geographic areas:</p>
                              <ul className="text-sm space-y-1.5 list-disc pl-5">
                                <li>Countries, states, cities</li>
                                <li>Custom radius around a location</li>
                                <li>Zip/postal codes</li>
                                <li>Nielsen DMA® regions (U.S.)</li>
                                <li>Location groups (like places of interest)</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="font-semibold flex items-center gap-2 mb-3">
                              <MapPin className="h-4 w-4 text-primary" />
                              Geo-Fencing Example
                            </h4>
                            <div className="bg-muted p-4 rounded-lg">
                              <h5 className="font-medium mb-2">Local Restaurant Case Study</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</div>
                                  <p>Set up geo-targeting for a 5-mile radius around the restaurant</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</div>
                                  <p>Added location extension showing the address and map marker</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</div>
                                  <p>Used bid adjustments to increase bids during lunch and dinner hours</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">4</div>
                                  <p>Result: 27% increase in foot traffic from nearby office workers</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Setup Guide Section */}
            {activeSection === "setup-guide" && (
              <div className="space-y-6">
                {renderSectionHeader(<ClipboardList className="h-6 w-6" />, "Step-by-Step Setup Guide", "Launch your first Google Ads campaign")}
                
                <div className="space-y-6">
                  {renderStepCard(1, "Creating a Google Ads Account", "Start by setting up your Google Ads account at ads.google.com. You'll need a Google account and basic business information.", <Settings className="h-4 w-4" />)}
                  
                  {renderStepCard(2, "Keyword Research", "Use the Keyword Planner tool to find relevant keywords for your business. Look for search terms with good volume and reasonable competition.", <Key className="h-4 w-4" />)}
                  
                  {renderStepCard(3, "Writing Effective Ad Copy", "Create compelling headlines and descriptions that include your keywords. Focus on benefits and include a strong call-to-action.", <PenTool className="h-4 w-4" />)}
                  
                  {renderStepCard(4, "Setting Up Budget and Location Targeting", "Determine daily budget and geographic areas where you want your ads to appear. Start conservative and adjust based on performance.", <MapPin className="h-4 w-4" />)}
                  
                  {renderStepCard(5, "Launching Your First Campaign", "Review all settings, ensure your tracking is set up correctly, and activate your campaign. Monitor closely during the first few days.", <Rocket className="h-4 w-4" />)}
                </div>
                
                <Card className="border border-primary/20 bg-primary/5 mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      Campaign Setup Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                      {renderChecklistItem("campaign-type", "Choose campaign type (Search, Display, etc.)")}
                      {renderChecklistItem("campaign-goal", "Select campaign goal (sales, leads, traffic)")}
                      {renderChecklistItem("campaign-name", "Create descriptive campaign name")}
                      {renderChecklistItem("locations", "Set geographic targeting")}
                      {renderChecklistItem("languages", "Select target languages")}
                      {renderChecklistItem("audiences", "Define audience segments")}
                      {renderChecklistItem("budget", "Set daily budget")}
                      {renderChecklistItem("bidding", "Choose bidding strategy")}
                      {renderChecklistItem("ad-groups", "Create logical ad groups")}
                      {renderChecklistItem("keywords", "Add keywords with appropriate match types")}
                      {renderChecklistItem("negative-keywords", "Add negative keywords")}
                      {renderChecklistItem("ad-copy", "Write compelling ad copy")}
                      {renderChecklistItem("extensions", "Add relevant ad extensions")}
                      {renderChecklistItem("conversion-tracking", "Set up conversion tracking")}
                      {renderChecklistItem("launch", "Launch and monitor campaign")}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Best Practices Section */}
            {activeSection === "best-practices" && (
              <div className="space-y-6">
                {renderSectionHeader(<Star className="h-6 w-6" />, "Best Practices & Tips", "Optimize your campaigns for better results")}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Budgeting Strategies
                    </h3>
                    
                    {renderTipCard(
                      "Start Conservative", 
                      "Begin with a modest daily budget and gradually increase as you identify what works.", 
                      <DollarSign className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Allocate by Performance", 
                      "Shift budget toward campaigns, ad groups, and keywords that deliver the best ROI.", 
                      <Percent className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Day & Time Parting", 
                      "Adjust bids or pause campaigns during times when performance is historically poor.", 
                      <Calendar className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <SplitSquareVertical className="h-5 w-5 text-primary" />
                      A/B Testing Ads
                    </h3>
                    
                    {renderTipCard(
                      "Test Different Headlines", 
                      "Create variations of your headlines to see which generate higher click-through rates.", 
                      <PenTool className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Compare Calls-to-Action", 
                      "Try different CTAs to identify which ones drive more conversions.", 
                      <ArrowRight className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "One Variable at a Time", 
                      "Change only one element at a time so you can clearly identify what affects performance.", 
                      <Settings className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Using Conversion Tracking
                    </h3>
                    
                    {renderTipCard(
                      "Install Tracking Code", 
                      "Place the Google Ads conversion tracking code on your thank-you or confirmation pages.", 
                      <ClipboardList className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Track Meaningful Actions", 
                      "Focus on tracking actions that matter to your business: purchases, sign-ups, calls, etc.", 
                      <Target className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Link Google Analytics", 
                      "Connect your Google Analytics account to gain deeper insights into user behavior.", 
                      <LineChart className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Avoiding Common Mistakes
                    </h3>
                    
                    {renderTipCard(
                      "Ignoring Search Terms", 
                      "Regularly review the actual search terms triggering your ads and add irrelevant terms as negatives.", 
                      <Search className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Poor Landing Page Experience", 
                      "Ensure your landing pages are relevant to your ads and provide a good user experience.", 
                      <Target className="h-4 w-4" />
                    )}
                    
                    {renderTipCard(
                      "Set and Forget", 
                      "Don't just set up your campaigns and forget them. Regular monitoring and optimization are essential.", 
                      <Settings className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Analyzing Section */}
            {activeSection === "analyzing" && (
              <div className="space-y-6">
                {renderSectionHeader(<BarChart3 className="h-6 w-6" />, "Analyzing & Optimizing", "Measure performance and make data-driven improvements")}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Understanding Key Metrics</CardTitle>
                    <CardDescription>Essential performance indicators for your Google Ads campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            CTR (Click-Through Rate)
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">Percentage of impressions that result in clicks</p>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Benchmark:</span>
                              <span>2-5% for search ads</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal:</span>
                              <span className="text-primary">Higher is better</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            CPC (Cost Per Click)
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">Average amount you pay for each click</p>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Benchmark:</span>
                              <span>Varies by industry</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal:</span>
                              <span className="text-primary">Lower is better</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <Percent className="h-4 w-4 text-primary" />
                            Conversion Rate
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">Percentage of clicks that result in conversions</p>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Benchmark:</span>
                              <span>3-10% depending on industry</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal:</span>
                              <span className="text-primary">Higher is better</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            CPA (Cost Per Acquisition)
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">Average cost to acquire a conversion</p>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Benchmark:</span>
                              <span>Depends on profit margins</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal:</span>
                              <span className="text-primary">Lower is better</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <Percent className="h-4 w-4 text-primary" />
                            ROAS (Return on Ad Spend)
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">Revenue generated for every dollar spent</p>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Benchmark:</span>
                              <span>400% (4:1) is common</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal:</span>
                              <span className="text-primary">Higher is better</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            Quality Score
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">Google's rating of ad relevance and landing page experience</p>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Benchmark:</span>
                              <span>Score of 1-10</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal:</span>
                              <span className="text-primary">7+ is ideal</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-lg">Essential Tools</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <PieChart className="h-4 w-4 text-primary" />
                          Google Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="text-muted-foreground mb-2">Provides deeper insights into what users do after clicking your ads</p>
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>Track user behavior on your website</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>Measure bounce rates and time on site</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>Analyze conversion paths and funnels</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Key className="h-4 w-4 text-primary" />
                          Keyword Planner
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="text-muted-foreground mb-2">Research tool for finding new keywords and estimating traffic</p>
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>Discover new keyword ideas</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>Get search volume and forecasts</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p>See competitive bidding estimates</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card className="border-primary/20 bg-primary/5 mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Monthly Performance Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {renderChecklistItem("review-search-terms", "Review search terms report and update negative keywords")}
                      {renderChecklistItem("analyze-device", "Analyze performance by device and adjust device bid modifiers")}
                      {renderChecklistItem("check-budget", "Check budget utilization and adjust if necessary")}
                      {renderChecklistItem("ad-performance", "Evaluate ad performance and pause underperforming ads")}
                      {renderChecklistItem("quality-score", "Monitor quality scores and improve low-scoring keywords")}
                      {renderChecklistItem("test-new-ads", "Create new ad variations for testing")}
                      {renderChecklistItem("adjust-bids", "Adjust bids for keywords based on performance")}
                      {renderChecklistItem("expansion", "Identify opportunities for campaign expansion")}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Bonus Resources Section */}
            {activeSection === "bonus" && (
              <div className="space-y-6">
                {renderSectionHeader(<CheckCircle className="h-6 w-6" />, "Bonus Resources", "Extra tools and references to enhance your Google Ads knowledge")}
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-primary" />
                        Interactive Checklist
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button className="w-full">
                            Open Campaign Launch Checklist
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Google Ads Launch Checklist</DrawerTitle>
                            <DrawerDescription>Complete these items before launching your campaign</DrawerDescription>
                          </DrawerHeader>
                          <div className="px-4">
                            <div className="border rounded-lg p-4">
                              <div className="space-y-2">
                                {renderChecklistItem("acc-setup", "Google Ads account set up and billing configured")}
                                {renderChecklistItem("goal-defined", "Campaign goals clearly defined (conversions, traffic, etc.)")}
                                {renderChecklistItem("keywords-researched", "Keyword research completed")}
                                {renderChecklistItem("ad-copy-written", "At least 3 ad variations created and approved")}
                                {renderChecklistItem("landing-pages-ready", "Landing pages optimized and tested")}
                                {renderChecklistItem("tracking-setup", "Conversion tracking installed and tested")}
                                {renderChecklistItem("targeting-configured", "Geographic and audience targeting configured")}
                                {renderChecklistItem("budget-set", "Budget and bidding strategy determined")}
                                {renderChecklistItem("extensions-added", "Relevant ad extensions added")}
                                {renderChecklistItem("analytics-linked", "Google Analytics linked to Google Ads")}
                                {renderChecklistItem("utm-parameters", "UTM parameters set up for campaign tracking")}
                                {renderChecklistItem("mobile-optimized", "Mobile experience tested and optimized")}
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <Button onClick={() => setProgress(100)}>Mark All as Complete</Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <LayoutTemplate className="h-4 w-4 text-primary" />
                        Visual Workflow Diagrams
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-semibold mb-2">Campaign Creation Workflow</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">1</div>
                            <div className="text-sm flex-1">Research & Planning</div>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">2</div>
                            <div className="text-sm flex-1">Account & Campaign Setup</div>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">3</div>
                            <div className="text-sm flex-1">Ad Creation & Targeting</div>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">4</div>
                            <div className="text-sm flex-1">Launch & Initial Monitoring</div>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">5</div>
                            <div className="text-sm flex-1">Optimization & Scaling</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-semibold mb-2">Optimization Cycle</h4>
                        <div className="flex justify-center">
                          <div className="text-xs text-center grid grid-cols-4 gap-2">
                            <div className="flex flex-col items-center">
                              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                                <BarChart3 className="h-6 w-6 text-primary" />
                              </div>
                              <span>Analyze</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                                <Settings className="h-6 w-6 text-primary" />
                              </div>
                              <span>Adjust</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                                <SplitSquareVertical className="h-6 w-6 text-primary" />
                              </div>
                              <span>Test</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                                <ArrowRight className="h-6 w-6 text-primary" />
                              </div>
                              <span>Repeat</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        Quick Glossary & FAQ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Key Terms</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            {renderGlossaryTerm("CPC", "Cost Per Click - The amount you pay each time someone clicks on your ad.")}
                          </p>
                          <p>
                            {renderGlossaryTerm("Quality Score", "Google's rating of the quality and relevance of your keywords and ads.")}
                          </p>
                          <p>
                            {renderGlossaryTerm("CTR", "Click-Through Rate - The percentage of people who click your ad after seeing it.")}
                          </p>
                          <p>
                            {renderGlossaryTerm("Conversion", "A valuable action completed by a user on your website after clicking your ad.")}
                          </p>
                          <p>
                            {renderGlossaryTerm("ROAS", "Return On Ad Spend - The revenue generated for every dollar spent on advertising.")}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold mb-2">FAQ</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <h5 className="font-medium">How much should I budget for Google Ads?</h5>
                            <p className="text-muted-foreground">Start with $10-20 per day for a small local business. Adjust based on results and competition in your industry.</p>
                          </div>
                          <div>
                            <h5 className="font-medium">How long until I see results?</h5>
                            <p className="text-muted-foreground">Ads can start appearing immediately, but it often takes 2-4 weeks to gather enough data for meaningful optimization.</p>
                          </div>
                          <div>
                            <h5 className="font-medium">Can I pause my campaigns anytime?</h5>
                            <p className="text-muted-foreground">Yes, you can pause or resume campaigns at any time without penalty.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-lg border p-6 bg-muted/40 mt-8">
                  <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-background rounded-lg p-4 border">
                        <h4 className="font-medium mb-2">Google's Official Resources</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Google Ads Help Center</li>
                          <li>Skillshop (Google's training platform)</li>
                          <li>Google Ads YouTube channel</li>
                          <li>Think with Google research and insights</li>
                        </ul>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 border">
                        <h4 className="font-medium mb-2">Helpful Tools</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Google Ads Editor (desktop application)</li>
                          <li>Google Analytics</li>
                          <li>Google Tag Manager</li>
                          <li>Google My Business (for local businesses)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 border">
                      <h4 className="font-medium mb-2">Stay Updated</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input type="email" placeholder="Enter your email" />
                          <Button>Subscribe</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Subscribe to receive updates about Google Ads features, best practices, and industry trends.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsGuide;
