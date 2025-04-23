
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TimeAllocationChartProps {
  viewBy: string;
}

const TimeAllocationChart = ({ viewBy }: TimeAllocationChartProps) => {
  // Mock data based on viewBy parameter
  const getChartData = () => {
    switch (viewBy) {
      case "driver":
        return [
          { name: "Brandprint", hours: 12, color: "#8B5CF6" },
          { name: "Content Creation", hours: 8, color: "#3B82F6" },
          { name: "Licensing Tools", hours: 3, color: "#10B981" },
          { name: "Customer Acquisition", hours: 6, color: "#F59E0B" },
          { name: "Existing Customers", hours: 4, color: "#EF4444" },
        ];
      case "subdriver":
        return [
          { name: "Website", hours: 6, color: "#8B5CF6" },
          { name: "Social Media", hours: 5, color: "#3B82F6" },
          { name: "Local Listings", hours: 4, color: "#10B981" },
          { name: "Email Marketing", hours: 7, color: "#F59E0B" },
          { name: "Paid Advertising", hours: 3, color: "#EF4444" },
          { name: "Content Writing", hours: 5, color: "#EC4899" },
          { name: "Visuals", hours: 3, color: "#6366F1" },
        ];
      case "platform":
        return [
          { name: "Google Business", hours: 5, color: "#8B5CF6" },
          { name: "Facebook", hours: 4, color: "#3B82F6" },
          { name: "Instagram", hours: 6, color: "#10B981" },
          { name: "Email Platform", hours: 7, color: "#F59E0B" },
          { name: "Google Ads", hours: 4, color: "#EF4444" },
          { name: "Yelp", hours: 2, color: "#EC4899" },
          { name: "Website Platform", hours: 5, color: "#6366F1" },
        ];
      default:
        return [
          { name: "Brandprint", hours: 12, color: "#8B5CF6" },
          { name: "Content Creation", hours: 8, color: "#3B82F6" },
          { name: "Licensing Tools", hours: 3, color: "#10B981" },
          { name: "Customer Acquisition", hours: 6, color: "#F59E0B" },
          { name: "Existing Customers", hours: 4, color: "#EF4444" },
        ];
    }
  };
  
  const data = getChartData();
  
  // Configuration for the chart
  const chartConfig = data.reduce((config, item) => {
    return {
      ...config,
      [item.name]: {
        label: item.name,
        color: item.color
      }
    };
  }, {});
  
  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            label={{ value: 'Hours Per Week', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip 
            formatter={(value) => [`${value} hours`, 'Time']}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="hours">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <ChartLegend
            verticalAlign="bottom"
            layout="horizontal" 
            align="center"
            payload={data.map(item => ({
              value: item.name,
              type: "square",
              color: item.color,
              strokeDasharray: "none",
              id: item.name,
            }))}
          >
            <ChartLegendContent />
          </ChartLegend>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TimeAllocationChart;
