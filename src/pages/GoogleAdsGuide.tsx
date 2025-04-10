import React, { useState, useEffect } from "react";
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
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) {
        setScrollPosition(target.scrollTop);
      }
    };

    const scrollArea = document.querySelector('.content-container');
    scrollArea?.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollArea?.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <div className="section-icon-container">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold section-header">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  const renderInfoCard = (icon: React.ReactNode, title: string, content: string) => (
    <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow feature-card overflow-hidden">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full"></div>
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );

  const renderStepCard = (number: number, title: string, description: string, icon: React.ReactNode, imageSrc?: string) => (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-6 border rounded-lg p-4 step-card">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold">{title}</h3>
          <div className="text-primary">{icon}</div>
        </div>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        {imageSrc && (
          <div className="mt-2 rounded-lg overflow-hidden border">
            <img 
              src={imageSrc} 
              alt={`Step ${number}: ${title}`} 
              className="w-full h-auto object-cover" 
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderTipCard = (title: string, description: string, icon: React.ReactNode) => (
    <div className="border rounded-lg p-4 bg-secondary/10 hover:bg-secondary/20 transition-colors tip-card">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-primary">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );

  const renderGlossaryTerm = (term: string, definition: string) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-semibold glossary-term">
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
    <div className="guide-container">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="sidebar-fixed">
            <Card className="overflow-hidden border-primary/20">
              <div className="section-card-header"></div>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Google Ads Guide
                </CardTitle>
                <CardDescription>
                  Small Business Edition
                </CardDescription>
                <div className="progress-container">
                  <div className="progress-header">
                    <span>Your progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="progress-bar" />
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
          <div className="content-container">
            {/* Introduction Section */}
            {activeSection === "introduction" && (
              <div className="space-y-6">
                {renderSectionHeader(<BookOpen className="h-6 w-6" />, "Introduction to Google Paid Search", "Understand the basics and benefits")}
                
                <div className="hero-section">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                    alt="Google Ads Dashboard" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <h3 className="hero-title">Start Your Google Ads Journey</h3>
                      <p className="hero-subtitle">Drive targeted traffic with the world's most popular advertising platform</p>
                    </div>
                  </div>
                </div>

                <div className="grid-feature">
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

                <div className="gradient-bg rounded-lg p-6 mt-8 border border-purple-100 dark:border-purple-800">
                  <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">Google Ads at a Glance</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="section-icon-container">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Pay-Per-Click (PPC)</h4>
                        <p className="text-sm text-muted-foreground">You only pay when someone clicks your ad</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="section-icon-container">
                        <Target className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Highly Targeted</h4>
                        <p className="text-sm text-muted-foreground">Reach customers based on search terms, location, and more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="section-icon-container">
                        <LineChart className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Measurable Results</h4>
                        <p className="text-sm text-muted-foreground">Track everything from clicks to conversions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="section-icon-container">
                        <Settings className="h-5 w-5" />
                      </div>
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
                
                <div className="hero-section">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80" 
                    alt="Google Ads Features" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <h3 className="hero-title">Powerful Advertising Tools</h3>
                      <p className="hero-subtitle">Leverage Google's advanced features to maximize your ad performance</p>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="search-campaigns" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-2">
                    <TabsTrigger value="search-campaigns" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Search className="h-4 w-4 mr-2" />
                      Search Campaigns
                    </TabsTrigger>
                    <TabsTrigger value="ad-extensions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <LayoutTemplate className="h-4 w-4 mr-2" />
                      Ad Extensions
                    </TabsTrigger>
                    <TabsTrigger value="targeting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Target className="h-4 w-4 mr-2" />
                      Targeting
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="search-campaigns" className="mt-4 space-y-4">
                    <Card className="border-t-4 border-t-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Search className="h-5 w-5 text-primary" />
                          Search Campaigns, Keywords & Bidding
                        </CardTitle>
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
                        
                        <div className="rounded-lg overflow-hidden mt-4 border">
                          <img 
                            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80" 
                            alt="Google Ads Search Campaign Interface" 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="ad-extensions" className="mt-4">
                    <Card className="border-t-4 border-t-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <LayoutTemplate className="h-5 w-5 text-primary" />
                          Ad Extensions & Responsive Search Ads
                        </CardTitle>
                        <CardDescription>Enhance your ads with additional information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4 feature-card">
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
                          
                          <div className="border rounded-lg p-4 feature-card">
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
                        
                        <div className="rounded-lg overflow-hidden my-4 border">
                          <img 
                            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=80" 
                            alt="Google Ads Extensions" 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        
                        <div className="bg-accent/30 rounded-lg p-4 mt-4 border border-primary/20">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary" />
                            Pro Tip
                          </h4>
                          <p className="text-sm">Use as many relevant ad extensions as possible. They improve your ad's visibility and usually increase click-through rate at no additional cost.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="targeting" className="mt-4">
                    <Card className="border-t-4 border-t-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          Targeting & Geo-Fencing
                        </CardTitle>
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
                          
                          <div className="rounded-lg overflow-hidden my-4 border">
                            <img 
                              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80" 
                              alt="Google Ads Targeting Interface" 
                              className="w-full h-auto object-cover"
                            />
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
                
                <div className="hero-section">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80" 
                    alt="Google Ads Setup" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <h3 className="hero-title">Ready to Launch</h3>
                      <p className="hero-subtitle">Follow these steps to create your first Google Ads campaign</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid-steps">
                  {renderStepCard(
                    1, 
                    "Creating a Google Ads Account", 
                    "Start by setting up your Google Ads account at ads.google.com. You'll need a Google account and basic business information.", 
                    <Settings className="h-4 w-4" />,
                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=80"
                  )}
                  
                  {renderStepCard(
                    2, 
                    "Keyword Research", 
                    "Use the Keyword Planner tool to find relevant keywords for your business. Look for search terms with good volume and reasonable competition.", 
                    <Key className="h-4 w-4" />,
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=80"
                  )}
                  
                  {renderStepCard(
                    3, 
                    "Writing Effective Ad Copy", 
                    "Create compelling headlines and descriptions that include your keywords. Focus on benefits and include a strong call-to-action.", 
                    <PenTool className="h-4 w-4" />,
                    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&auto=format&fit=crop&q=80"
                  )}
                  
                  {renderStepCard(
                    4, 
                    "Setting Up Budget and Location Targeting", 
                    "Determine daily budget and geographic areas where you want your ads to appear. Start conservative and adjust based on performance.", 
                    <MapPin className="h-4 w-4" />,
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=80"
                  )}
                  
                  {renderStepCard(
                    5, 
                    "Launching Your First Campaign", 
                    "Review all settings, ensure your tracking is set up correctly, and activate your campaign. Monitor closely during the first few days.", 
                    <Rocket className="h-4 w-4" />,
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80"
                  )}
                </div>
                
                <Card className="border border-primary/20 bg-primary/5 mt-8 overflow-hidden">
                  <div className="section-card-header"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      Campaign Setup Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="checklist-grid">
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
                
                <div className="hero-section">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=80" 
                    alt="Google Ads Best Practices" 
                    className="w-full h-64 object-cover"
                  />
