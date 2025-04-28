import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface BudgetAllocationChartProps {
  viewBy: string;
}

const BudgetAllocationChart = ({ viewBy }: BudgetAllocationChartProps) => {
  // Constant total budget across all views
  const TOTAL_BUDGET = 8000;

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getChartData = () => {
    switch (viewBy) {
      case "driver":
        return [
          { name: "Brandprint", diy: 1500, getHelp: 2000, color: "#8B5CF6" },
          { name: "Content Creation", diy: 1000, getHelp: 1500, color: "#3B82F6" },
          { name: "Licensing Tools", diy: 500, getHelp: 1000, color: "#10B981" },
          { name: "Customer Acquisition", diy: 700, getHelp: 800, color: "#F59E0B" },
          { name: "Existing Customers", diy: 600, getHelp: 400, color: "#EF4444" },
        ];
      case "subdriver":
        return [
          { name: "Website", diy: 600, getHelp: 800, color: "#8B5CF6" },
          { name: "Social Media", diy: 500, getHelp: 700, color: "#3B82F6" },
          { name: "Local Listings", diy: 300, getHelp: 600, color: "#10B981" },
          { name: "Email Marketing", diy: 700, getHelp: 600, color: "#F59E0B" },
          { name: "Paid Advertising", diy: 200, getHelp: 700, color: "#EF4444" },
          { name: "Content Writing", diy: 400, getHelp: 300, color: "#EC4899" },
          { name: "Visuals", diy: 300, getHelp: 500, color: "#6366F1" },
          { name: "SEO", diy: 400, getHelp: 800, color: "#0EA5E9" },
          { name: "Video Marketing", diy: 200, getHelp: 600, color: "#F97316" },
          { name: "CRM Tools", diy: 300, getHelp: 400, color: "#14B8A6" },
        ];
      case "platform":
        return [
          { name: "Google Business", diy: 400, getHelp: 500, color: "#8B5CF6" },
          { name: "Facebook", diy: 300, getHelp: 400, color: "#3B82F6" },
          { name: "Instagram", diy: 400, getHelp: 500, color: "#10B981" },
          { name: "Email Platform", diy: 500, getHelp: 600, color: "#F59E0B" },
          { name: "Google Ads", diy: 200, getHelp: 800, color: "#EF4444" },
          { name: "Yelp", diy: 200, getHelp: 300, color: "#EC4899" },
          { name: "Website Platform", diy: 300, getHelp: 700, color: "#6366F1" },
          { name: "Twitter", diy: 200, getHelp: 300, color: "#0EA5E9" },
          { name: "LinkedIn", diy: 400, getHelp: 200, color: "#F97316" },
          { name: "WordPress", diy: 300, getHelp: 500, color: "#14B8A6" },
        ];
      default:
        return [
          { name: "Brandprint", diy: 1500, getHelp: 2000, color: "#8B5CF6" },
          { name: "Content Creation", diy: 1000, getHelp: 1500, color: "#3B82F6" },
          { name: "Licensing Tools", diy: 500, getHelp: 1000, color: "#10B981" },
          { name: "Customer Acquisition", diy: 700, getHelp: 800, color: "#F59E0B" },
          { name: "Existing Customers", diy: 600, getHelp: 400, color: "#EF4444" },
        ];
    }
  };
  
  const data = getChartData();
  
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
        <span className="text-xl font-bold">➔ Total Budget Allocation: {formatCurrency(TOTAL_BUDGET)}</span>
      </div>
      <ChartContainer config={chartConfig} className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 40,
              left: 40,
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
              label={{ value: 'Budget Amount ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value as number), '']}
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

export default BudgetAllocationChart;
