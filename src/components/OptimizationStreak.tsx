import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OptimizationStreakProps {
  isNextMonth: boolean;
  hasLastMonthFeedback: boolean;
  streakCount?: number;
}

interface FeedbackFormValues {
  monthlyRevenue: string;
  customerSources: {
    seo: boolean;
    ads: boolean;
    socialMedia: boolean;
    referrals: boolean;
  };
  monthlyVisitors: string;
}

const OptimizationStreak = ({ isNextMonth, hasLastMonthFeedback, streakCount = 1 }: OptimizationStreakProps) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      monthlyRevenue: "",
      customerSources: {
        seo: false,
        ads: false,
        socialMedia: false,
        referrals: false
      },
      monthlyVisitors: ""
    }
  });

  const handleSubmitFeedback = (data: FeedbackFormValues) => {
    console.log("Feedback submitted:", data);
    toast({
      title: "Feedback submitted!",
      description: "Your optimization streak continues! We'll use this to improve your next playbook.",
    });
    setFeedbackSubmitted(true);
  };

  const StreakIndicator = () => (
    <div className="fixed top-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
              <span className="text-lg">🔥</span>
              <span className="font-medium">{streakCount}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>You're on a {streakCount}-month optimization streak!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  if ((hasLastMonthFeedback && streakCount > 0) || feedbackSubmitted) {
    return <StreakIndicator />;
  }

  if (isNextMonth && hasLastMonthFeedback) {
    return (
      <>
        <StreakIndicator />
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-lg font-medium text-orange-700">
              🔥 You're on a {streakCount}-month optimization streak!
            </div>
            <p className="mt-2 text-orange-600">
              Keep it going by answering 3 questions and unlock better tasks for next month.
            </p>
          </CardContent>
        </Card>
      </>
    );
  }

  if (isNextMonth) {
    return null;
  }

  if (feedbackSubmitted) {
    return (
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-lg font-medium text-orange-700">
            🔥 You're on a {streakCount}-month optimization streak!
          </div>
          <p className="mt-2 text-orange-600">
            Thanks for helping us optimize your next month's playbook.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitFeedback)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">🎯 Start your optimization streak</h3>
              <p className="text-muted-foreground">
                Answer 3 quick questions to help us optimize your next month's playbook
              </p>
              
              <FormField
                control={form.control}
                name="monthlyRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What was your approximate monthly revenue?</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select a range</option>
                        <option value="0-10000">$0 - $10,000</option>
                        <option value="10000-50000">$10,000 - $50,000</option>
                        <option value="50000-100000">$50,000 - $100,000</option>
                        <option value="100000+">$100,000+</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Where do most of your customers come from?</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'SEO', value: 'seo' },
                    { label: 'Ads', value: 'ads' },
                    { label: 'Social Media', value: 'socialMedia' },
                    { label: 'Referrals', value: 'referrals' }
                  ].map((source) => (
                    <FormField
                      key={source.value}
                      control={form.control}
                      name={`customerSources.${source.value}` as any}
                      render={({ field }) => {
                        return (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{source.label}</FormLabel>
                        </FormItem>
                      )}}
                    />
                  ))}
                </div>
              </FormItem>

              <FormField
                control={form.control}
                name="monthlyVisitors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many visitors does your website get per month?</FormLabel>
                    <FormControl>
                      <select 
                        {...field} 
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select a range</option>
                        <option value="0-500">0-500</option>
                        <option value="500-5000">500-5,000</option>
                        <option value="5000+">5,000+</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OptimizationStreak;
