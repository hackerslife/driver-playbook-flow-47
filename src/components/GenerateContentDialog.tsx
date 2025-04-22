import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap, Lightbulb, Target, Rocket, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface GenerateContentDialogProps {
  taskTitle: string;
  taskDescription: string;
}

type ContentStyle = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  preview: string;
};

const contentStyles: ContentStyle[] = [
  {
    id: "professional",
    name: "Professional & Formal",
    description: "Perfect for business audiences and formal communications",
    icon: <Target className="h-5 w-5 text-blue-500" />,
    preview: "Enhance your digital strategy with our comprehensive guide on...",
  },
  {
    id: "casual",
    name: "Casual & Friendly",
    description: "Engaging and conversational tone for social media",
    icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    preview: "Ready to level up your online game? 🚀 Check out our latest tips on...",
  },
  {
    id: "innovative",
    name: "Innovative & Bold",
    description: "Stand out with creative and attention-grabbing content",
    icon: <Rocket className="h-5 w-5 text-purple-500" />,
    preview: "🌟 Transform your digital presence with cutting-edge strategies...",
  },
];

const GenerateContentDialog = ({ taskTitle, taskDescription }: GenerateContentDialogProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("facebook");
  const [selectedStyle, setSelectedStyle] = useState<string>("professional");
  const [generatedContents, setGeneratedContents] = useState<Array<{id: string, content: string, liked?: boolean}>>([]);
  const [selectedContent, setSelectedContent] = useState<string>("");

  const form = useForm({
    defaultValues: {
      platform: "facebook",
      contentType: "post",
      tone: "professional",
      length: "medium",
      includeHashtags: true,
      includeEmojis: true,
    },
  });

  const generateContent = async (data: any) => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const selectedStyleData = contentStyles.find(style => style.id === selectedStyle);
      
      const variations = [];
      
      if (data.platform === "facebook") {
        variations.push({
          id: '1',
          content: `${selectedStyleData?.preview} "${taskTitle}"\n\n${taskDescription.substring(0, 100)}...\n\n#digitalmarketing #onlinepresence`
        });
        variations.push({
          id: '2',
          content: `Looking to enhance your ${taskTitle}? 🚀\n\n${taskDescription.substring(0, 80)}...\n\n#growthhacking #success`
        });
        variations.push({
          id: '3',
          content: `Transform your business with ${taskTitle}! ✨\n\nHere's how: ${taskDescription.substring(0, 60)}...\n\n#business #growth`
        });
      } else if (data.platform === "instagram") {
        variations.push({
          id: '1',
          content: `✨ ${selectedStyleData?.preview} ${taskTitle}! 📱\n\n${taskDescription.substring(0, 80)}...\n\n#instabusiness #growthhacking`
        });
        variations.push({
          id: '2',
          content: `🎯 Master your ${taskTitle} game!\n\n${taskDescription.substring(0, 70)}...\n\n#success #business`
        });
        variations.push({
          id: '3',
          content: `💫 Level up with ${taskTitle}!\n\nPro tip: ${taskDescription.substring(0, 60)}...\n\n#growth #strategy`
        });
      } else {
        variations.push({
          id: '1',
          content: `${selectedStyleData?.preview} "${taskTitle}" - Learn more about how to improve your online presence!`
        });
        variations.push({
          id: '2',
          content: `Discover the power of ${taskTitle} - Your guide to digital success!`
        });
        variations.push({
          id: '3',
          content: `Master ${taskTitle} with our expert insights and proven strategies.`
        });
      }
      
      setGeneratedContents(variations);
      setSelectedContent(variations[0].content);
      toast.success("Content variations generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (selectedContent) {
      navigator.clipboard.writeText(selectedContent);
      toast.success("Copied to clipboard!");
    }
  };

  const handleFeedback = (contentId: string, isPositive: boolean) => {
    setGeneratedContents(prev => prev.map(content => {
      if (content.id === contentId) {
        return { ...content, liked: isPositive };
      }
      return content;
    }));
    toast.success(isPositive ? "Thanks for the positive feedback!" : "Thanks for the feedback. We'll improve!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="group relative overflow-hidden gap-2 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 group-hover:opacity-75 transition-opacity" />
          <Brain className="h-4 w-4 animate-pulse text-blue-500" />
          <span className="relative z-10">Generate AI Content</span>
          <Sparkles className="h-4 w-4 animate-pulse text-purple-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-blue-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="h-5 w-5 animate-pulse text-blue-500" />
            AI Content Generator
            <Sparkles className="h-5 w-5 animate-pulse text-purple-500" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentStyles.map((style) => (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-md ${
                  selectedStyle === style.id
                    ? "border-blue-400 bg-blue-50/50 shadow-inner"
                    : "border-blue-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {style.icon}
                  <h3 className="font-medium text-blue-900">{style.name}</h3>
                </div>
                <p className="text-sm text-blue-600/70 mb-3">{style.description}</p>
                <div className="text-xs bg-white/80 p-2 rounded border border-blue-100 text-blue-600">
                  {style.preview}
                </div>
                {selectedStyle === style.id && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="facebook" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-blue-50">
                Facebook
              </TabsTrigger>
              <TabsTrigger value="instagram" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-purple-50">
                Instagram
              </TabsTrigger>
              <TabsTrigger value="other" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-purple-50">
                Other
              </TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(generateContent)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-blue-700">Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/50 backdrop-blur-sm border-blue-200">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="post">Post</SelectItem>
                            <SelectItem value="ad">Ad</SelectItem>
                            <SelectItem value="story">Story</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-blue-700">Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/50 backdrop-blur-sm border-blue-200">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isGenerating} 
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                  {isGenerating ? (
                    <>
                      <Zap className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            {generatedContents.length > 0 && (
              <div className="mt-6 space-y-4">
                <Label className="text-blue-700">Select Generated Content</Label>
                {generatedContents.map((content, index) => (
                  <div
                    key={content.id}
                    className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      selectedContent === content.content
                        ? "border-blue-400 bg-blue-50/50 shadow-inner"
                        : "border-blue-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedContent(content.content)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">Version {index + 1}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(content.id, true);
                          }}
                          className={`p-1 rounded-full transition-colors ${
                            content.liked === true ? "text-green-500 bg-green-50" : "text-gray-400 hover:text-green-500"
                          }`}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedback(content.id, false);
                          }}
                          className={`p-1 rounded-full transition-colors ${
                            content.liked === false ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm bg-white/80 p-3 rounded border border-blue-100 text-blue-600">
                      {content.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Tabs>
        </div>
        
        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setGeneratedContents([]);
              setSelectedContent("");
            }}
            className="border-blue-200 hover:bg-blue-50"
          >
            Clear
          </Button>
          {selectedContent && (
            <Button onClick={copyToClipboard} className="gap-2">
              <Zap className="h-4 w-4" />
              Copy Selected
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateContentDialog;
