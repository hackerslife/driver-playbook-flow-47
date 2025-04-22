
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap } from "lucide-react";
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

const GenerateContentDialog = ({ taskTitle, taskDescription }: GenerateContentDialogProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("facebook");
  const [generatedContent, setGeneratedContent] = useState("");

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
      let content = "";
      if (data.platform === "facebook") {
        content = `📢 Need to improve your online presence? Our team just published a guide on "${taskTitle}"!\n\n${taskDescription.substring(0, 100)}...\n\nClick the link in our bio to learn more! #digitalmarketing #onlinepresence #businessgrowth`;
      } else if (data.platform === "instagram") {
        content = `✨ Transform your business with our latest tips on ${taskTitle}! 📱\n\n${taskDescription.substring(0, 80)}...\n\nDouble tap if you're ready to level up your online game! 👇\n\n#instabusiness #digitalmarketing #growthhacking`;
      } else {
        content = `Want to boost your online visibility? Our new guide on "${taskTitle}" shows you exactly how to stand out from the competition. Check it out now!`;
      }
      setGeneratedContent(content);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
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
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-blue-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="h-5 w-5 animate-pulse text-blue-500" />
            AI Content Generator
            <Sparkles className="h-5 w-5 animate-pulse text-purple-500" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-lg pointer-events-none" />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
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
            
            {generatedContent && (
              <div className="mt-4 border rounded-md p-4 bg-white/50 backdrop-blur-sm border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-blue-700">Generated Content</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="gap-2 border-blue-200 hover:bg-blue-50"
                  >
                    <Zap className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <Textarea 
                  className="min-h-[150px] bg-white/70 border-blue-200" 
                  value={generatedContent} 
                  onChange={(e) => setGeneratedContent(e.target.value)}
                />
              </div>
            )}
          </Tabs>
        </div>
        
        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={() => setGeneratedContent("")}
            className="border-blue-200 hover:bg-blue-50"
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateContentDialog;
