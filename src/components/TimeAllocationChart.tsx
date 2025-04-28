
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TimeAllocationChartProps {
  viewBy: string;
}

const TimeAllocationChart = ({ viewBy }: TimeAllocationChartProps) => {
  // Get total hours calculation
  const getTotalHours = (data: any[]) => {
    return data.reduce((total, item) => total + item.diy + item.getHelp, 0);
  };

  // Mock data based on viewBy parameter
  const getChartData = () => {
    switch (viewBy) {
      case "driver":
        return [
          { name: "Brandprint", diy: 8, getHelp: 4, color: "#8B5CF6" },
          { name: "Content Creation", diy: 5, getHelp: 3, color: "#3B82F6" },
          { name: "Licensing Tools", diy: 1, getHelp: 2, color: "#10B981" },
          { name: "Customer Acquisition", diy: 2, getHelp: 4, color: "#F59E0B" },
          { name: "Existing Customers", diy: 3, getHelp: 1, color: "#EF4444" },
        ];
      case "subdriver":
        return [
          { name: "Website", diy: 3, getHelp: 3, color: "#8B5CF6" },
          { name: "Social Media", diy: 3, getHelp: 2, color: "#3B82F6" },
          { name: "Local Listings", diy: 2, getHelp: 2, color: "#10B981" },
          { name: "Email Marketing", diy: 4, getHelp: 3, color: "#F59E0B" },
          { name: "Paid Advertising", diy: 1, getHelp: 2, color: "#EF4444" },
          { name: "Content Writing", diy: 3, getHelp: 2, color: "#EC4899" },
          { name: "Visuals", diy: 2, getHelp: 1, color: "#6366F1" },
          { name: "SEO", diy: 2, getHelp: 3, color: "#0EA5E9" },
          { name: "Video Marketing", diy: 1, getHelp: 2, color: "#F97316" },
          { name: "CRM Tools", diy: 1, getHelp: 3, color: "#14B8A6" },
        ];
      case "platform":
        return [
          { name: "Google Business", diy: 3, getHelp: 2, color: "#8B5CF6" },
          { name: "Facebook", diy: 2, getHelp: 2, color: "#3B82F6" },
          { name: "Instagram", diy: 3, getHelp: 3, color: "#10B981" },
          { name: "Email Platform", diy: 4, getHelp: 3, color: "#F59E0B" },
          { name: "Google Ads", diy: 1, getHelp: 3, color: "#EF4444" },
          { name: "Yelp", diy: 1, getHelp: 1, color: "#EC4899" },
          { name: "Website Platform", diy: 2, getHelp: 3, color: "#6366F1" },
          { name: "Twitter", diy: 1, getHelp: 1, color: "#0EA5E9" },
          { name: "LinkedIn", diy: 2, getHelp: 1, color: "#F97316" },
          { name: "WordPress", diy: 1, getHelp: 2, color: "#14B8A6" },
        ];
      default:
        return [
          { name: "Brandprint", diy: 8, getHelp: 4, color: "#8B5CF6" },
          { name: "Content Creation", diy: 5, getHelp: 3, color: "#3B82F6" },
          { name: "Licensing Tools", diy: 1, getHelp: 2, color: "#10B981" },
          { name: "Customer Acquisition", diy: 2, getHelp: 4, color: "#F59E0B" },
          { name: "Existing Customers", diy: 3, getHelp: 1, color: "#EF4444" },
        ];
    }
  };
  
  const data = getChartData();
  const totalHours = getTotalHours(data);
  
  // Configuration for the chart
  const chartConfig = {
    diy: {
      label: "DIY",
      color: "#3B82F6" // Blue
    },
    getHelp: {
      label: "Get Help",
      color: "#F59E0B" // Orange
    }
  };
  
  return (
    <>
      <div className="mb-4 text-center">
        <span className="text-xl font-bold">➔ Total Time Allocation: {totalHours} hours/week</span>
      </div>
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70,
            }}
            barGap={0}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end" 
            />
            <YAxis
              label={{ value: 'Hours Per Week', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip 
              formatter={(value) => [`${value} hours`, '']}
              labelFormatter={(label) => `${label}`}
            />
            <Legend 
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: '10px' }}
            />
            <Bar 
              dataKey="diy" 
              fill="#3B82F6" 
              name="DIY"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="getHelp" 
              fill="#F59E0B" 
              name="Get Help"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default TimeAllocationChart;
