
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Image, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
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
      // In a real implementation, this would be an API call to an AI service
      // For now, we'll simulate the generation with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample generated content (in a real implementation, this would come from the AI)
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
        <Button variant="outline" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Generate Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate Content for "{taskTitle}"</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Other</span>
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(generateContent)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Content Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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
                        <FormLabel>Tone</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Length</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="short">Short</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="long">Long</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="includeHashtags"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Include Hashtags</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="includeEmojis"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">Include Emojis</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? "Generating..." : "Generate Content"}
              </Button>
            </form>
          </Form>
          
          {generatedContent && (
            <div className="mt-4 border rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <Label>Generated Content</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  Copy
                </Button>
              </div>
              <Textarea 
                className="min-h-[150px]" 
                value={generatedContent} 
                onChange={(e) => setGeneratedContent(e.target.value)}
              />
            </div>
          )}
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setGeneratedContent("")}>
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateContentDialog;
