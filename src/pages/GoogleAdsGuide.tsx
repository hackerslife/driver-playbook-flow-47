
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
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <h3 className="hero-title">Maximize Your ROI</h3>
                      <p className="hero-subtitle">Follow these expert tips to get the most from your Google Ads investment</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid-tips">
                  {renderTipCard(
                    "Budget Wisely", 
                    "Start with a conservative budget and gradually increase it as you identify which campaigns perform best. Monitor your cost-per-conversion closely.", 
                    <DollarSign className="h-4 w-4" />
                  )}
                  
                  {renderTipCard(
                    "A/B Test Everything", 
                    "Continuously test different headlines, descriptions, landing pages, and calls-to-action to improve your click-through and conversion rates.", 
                    <SplitSquareVertical className="h-4 w-4" />
                  )}
                  
                  {renderTipCard(
                    "Use Negative Keywords", 
                    "Add negative keywords to prevent your ads from showing for irrelevant searches, saving your budget for qualified prospects.", 
                    <Search className="h-4 w-4" />
                  )}
                  
                  {renderTipCard(
                    "Enable Conversion Tracking", 
                    "Set up conversion tracking to measure actions that matter to your business, whether it's purchases, form submissions, or calls.", 
                    <Activity className="h-4 w-4" />
                  )}
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Common Mistakes to Avoid</CardTitle>
                    <CardDescription>Learn from others' mistakes to improve your campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Targeting Too Broadly</h4>
                          <p className="text-sm text-muted-foreground">Casting too wide a net wastes budget on irrelevant clicks. Focus on specific, high-intent keywords and audiences.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Neglecting Mobile Users</h4>
                          <p className="text-sm text-muted-foreground">Ensure your landing pages are mobile-friendly and your ad copy works well on smaller screens.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Set-and-Forget Approach</h4>
                          <p className="text-sm text-muted-foreground">Google Ads isn't a "set it and forget it" platform. Regular optimization is essential for good performance.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">
                          <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Ignoring Quality Score</h4>
                          <p className="text-sm text-muted-foreground">Low quality scores lead to higher costs. Improve relevance between keywords, ads, and landing pages.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-8 border rounded-lg p-6 gradient-bg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Pro Tips from Google Ads Experts
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/40 dark:bg-gray-800/40 p-4 rounded-lg">
                      <p className="text-sm italic">"Always segment your campaigns by search intent. Someone searching 'how to' has different needs than someone searching for 'buy now'."</p>
                      <p className="text-sm font-semibold mt-2">— Sarah Chen, PPC Specialist</p>
                    </div>
                    
                    <div className="bg-white/40 dark:bg-gray-800/40 p-4 rounded-lg">
                      <p className="text-sm italic">"Don't forget about ad scheduling. If your business only operates during certain hours or you see better performance at specific times, adjust your bids accordingly."</p>
                      <p className="text-sm font-semibold mt-2">— Michael Rodriguez, Digital Marketing Director</p>
                    </div>
                    
                    <div className="bg-white/40 dark:bg-gray-800/40 p-4 rounded-lg">
                      <p className="text-sm italic">"Your competitors are a goldmine of information. Use the 'Auction Insights' report to see who you're up against and how you compare."</p>
                      <p className="text-sm font-semibold mt-2">— Jamie Watson, SEM Consultant</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analyzing Section */}
            {activeSection === "analyzing" && (
              <div className="space-y-6">
                {renderSectionHeader(<BarChart3 className="h-6 w-6" />, "Analyzing & Optimizing", "Track performance and make data-driven decisions")}
                
                <div className="hero-section">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                    alt="Google Ads Analytics" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <h3 className="hero-title">Measure What Matters</h3>
                      <p className="hero-subtitle">Use data to continuously improve your advertising results</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid-metrics">
                  <div className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Click-Through Rate (CTR)</h4>
                      <PieChart className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Percentage of people who click on your ad after seeing it. Higher CTR indicates relevance.</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">Industry average:</span> 1.91% for search ads
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Cost Per Click (CPC)</h4>
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Average amount you pay for each click on your ad. Lower is generally better.</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">Industry average:</span> $2.32 for search ads
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Conversion Rate</h4>
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Percentage of visitors who complete your desired action (purchase, signup, etc).</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">Industry average:</span> 3.75% for search ads
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Cost Per Conversion</h4>
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Average cost to acquire a conversion. Critical for ROI calculations.</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">Target:</span> Varies by industry and profit margins
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Quality Score</h4>
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Google's rating of ad quality and relevance. Higher scores can lower costs.</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">Target:</span> 7-10 (scale of 1-10)
                    </div>
                  </div>
                  
                  <div className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Return on Ad Spend (ROAS)</h4>
                      <Percent className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Revenue generated for every dollar spent on ads. Higher is better.</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">Target:</span> At least 400% (4:1 return)
                    </div>
                  </div>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Optimization Tools
                    </CardTitle>
                    <CardDescription>Essential tools to help you analyze and improve performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 border rounded-lg p-4 feature-card">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Search className="h-4 w-4 text-primary" />
                            Keyword Planner
                          </h4>
                          <p className="text-sm text-muted-foreground">Discover new keywords, get search volume data, and forecast performance.</p>
                        </div>
                        
                        <div className="flex-1 border rounded-lg p-4 feature-card">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            Google Analytics
                          </h4>
                          <p className="text-sm text-muted-foreground">Track user behavior after they click your ad to understand the full conversion journey.</p>
                        </div>
                        
                        <div className="flex-1 border rounded-lg p-4 feature-card">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            Performance Planner
                          </h4>
                          <p className="text-sm text-muted-foreground">Forecast how changes to campaigns might affect key metrics and performance.</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg overflow-hidden border">
                        <img 
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" 
                          alt="Google Ads Analytics Dashboard" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6 overflow-hidden">
                  <div className="section-card-header"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Monthly Optimization Checklist
                    </CardTitle>
                    <CardDescription>Regular maintenance tasks to keep your campaigns performing well</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-1">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-0.5">Review Search Terms Report</h4>
                          <p className="text-xs text-muted-foreground">Identify new keywords to add and negative keywords to exclude.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-1">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-0.5">Adjust Bids for Top Performers</h4>
                          <p className="text-xs text-muted-foreground">Increase bids on keywords and audiences that convert well.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-1">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-0.5">Test New Ad Variations</h4>
                          <p className="text-xs text-muted-foreground">Create new ad copy to test against current best performers.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-1">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-0.5">Analyze Device Performance</h4>
                          <p className="text-xs text-muted-foreground">Check if mobile, tablet, or desktop users convert differently.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-1">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-0.5">Review Budget Allocation</h4>
                          <p className="text-xs text-muted-foreground">Shift budget from underperforming campaigns to top performers.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="text-primary mt-1">
                          <CheckSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-0.5">Check Quality Scores</h4>
                          <p className="text-xs text-muted-foreground">Identify low-scoring keywords and improve their ads and landing pages.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Bonus Resources Section */}
            {activeSection === "bonus" && (
              <div className="space-y-6">
                {renderSectionHeader(<CheckCircle className="h-6 w-6" />, "Bonus Resources", "Additional tools and information to succeed")}
                
                <div className="hero-section">
                  <img 
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80" 
                    alt="Google Ads Resources" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="hero-overlay">
                    <div className="hero-content">
                      <h3 className="hero-title">Beyond the Basics</h3>
                      <p className="hero-subtitle">Explore these resources to take your Google Ads skills to the next level</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="resource-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Glossary of Terms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold">{renderGlossaryTerm("CPC (Cost Per Click)", "The amount you pay each time someone clicks on your ad.")}</h4>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{renderGlossaryTerm("CTR (Click-Through Rate)", "The percentage of ad impressions that result in clicks.")}</h4>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{renderGlossaryTerm("Quality Score", "Google's 1-10 rating of the quality and relevance of your keywords and ads.")}</h4>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{renderGlossaryTerm("Ad Rank", "Determines your ad position and whether your ads will show at all.")}</h4>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{renderGlossaryTerm("Impression Share", "The percentage of impressions your ads receive compared to the total available impressions in the market.")}</h4>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{renderGlossaryTerm("ROAS (Return On Ad Spend)", "Revenue generated for every dollar spent on ads.")}</h4>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="resource-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Certification & Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="text-primary mt-1">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Google Ads Certification</h4>
                            <p className="text-xs text-muted-foreground mb-1">Free official certification from Google.</p>
                            <a href="https://skillshop.withgoogle.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                              Google Skillshop
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-primary mt-1">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Google Ads Help Center</h4>
                            <p className="text-xs text-muted-foreground mb-1">Comprehensive guidance on all features.</p>
                            <a href="https://support.google.com/google-ads/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                              Help Center
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="text-primary mt-1">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Google Ads YouTube Channel</h4>
                            <p className="text-xs text-muted-foreground mb-1">Video tutorials and tips from Google.</p>
                            <a href="https://www.youtube.com/user/GoogleAds" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                              YouTube Channel
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button className="w-full mt-4" variant="outline">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Frequently Asked Questions
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-lg">
                      <DrawerHeader>
                        <DrawerTitle>Frequently Asked Questions</DrawerTitle>
                        <DrawerDescription>Common questions about Google Ads</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <div className="space-y-4">
                          <div className="border-b pb-4">
                            <h3 className="font-medium mb-1">How much does Google Ads cost?</h3>
                            <p className="text-sm text-muted-foreground">Google Ads works on a pay-per-click model with no minimum spend. You set your own budget and can adjust it at any time. The average cost per click varies by industry, from $1 to $50+.</p>
                          </div>
                          <div className="border-b pb-4">
                            <h3 className="font-medium mb-1">How long until I see results?</h3>
                            <p className="text-sm text-muted-foreground">Unlike SEO, Google Ads can drive traffic immediately after launching. However, optimization takes time. Expect 1-3 months before campaigns are fully optimized for best performance.</p>
                          </div>
                          <div className="border-b pb-4">
                            <h3 className="font-medium mb-1">Should I bid on my brand name?</h3>
                            <p className="text-sm text-muted-foreground">Yes, bidding on your brand name is usually recommended. It's typically inexpensive, ensures you appear at the top of search results, and prevents competitors from capturing your branded traffic.</p>
                          </div>
                          <div className="border-b pb-4">
                            <h3 className="font-medium mb-1">What's a good conversion rate?</h3>
                            <p className="text-sm text-muted-foreground">The average conversion rate across all industries is around 3.75% for search ads. However, this varies widely by industry, with some seeing rates above 10% and others below 2%.</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">How does Google determine ad rank?</h3>
                            <p className="text-sm text-muted-foreground">Ad rank is determined by your bid amount, your ad quality (including expected CTR, ad relevance, and landing page experience), the Ad Rank thresholds, and the context of the search.</p>
                          </div>
                        </div>
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
                
                <div className="flex flex-col md:flex-row gap-6 mt-8">
                  <Card className="flex-1 border-t-4 border-t-primary">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-primary" />
                        Quick Start Checklist
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {renderChecklistItem("account-setup", "Create Google Ads account")}
                        {renderChecklistItem("conversion-goals", "Define conversion goals")}
                        {renderChecklistItem("target-audience", "Identify target audience")}
                        {renderChecklistItem("keyword-research", "Conduct keyword research")}
                        {renderChecklistItem("campaign-structure", "Plan campaign structure")}
                        {renderChecklistItem("landing-pages", "Prepare landing pages")}
                        {renderChecklistItem("write-ads", "Write compelling ads")}
                        {renderChecklistItem("set-budget", "Set daily budget")}
                        {renderChecklistItem("tracking-setup", "Set up conversion tracking")}
                        {renderChecklistItem("launch", "Launch campaign")}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex-1 border-t-4 border-t-primary">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Additional Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-3 resource-card">
                          <h4 className="text-sm font-medium mb-1">Google Trends</h4>
                          <p className="text-xs text-muted-foreground">See what people are searching for and seasonal trends.</p>
                        </div>
                        <div className="border rounded-lg p-3 resource-card">
                          <h4 className="text-sm font-medium mb-1">Google Optimize</h4>
                          <p className="text-xs text-muted-foreground">Test different landing page versions to improve conversion.</p>
                        </div>
                        <div className="border rounded-lg p-3 resource-card">
                          <h4 className="text-sm font-medium mb-1">Google Tag Manager</h4>
                          <p className="text-xs text-muted-foreground">Implement tracking tags without editing code.</p>
                        </div>
                        <div className="border rounded-lg p-3 resource-card">
                          <h4 className="text-sm font-medium mb-1">Google Data Studio</h4>
                          <p className="text-xs text-muted-foreground">Create custom reports and dashboards for visualization.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsGuide;
