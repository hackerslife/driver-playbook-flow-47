
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { useState } from "react";

interface BudgetAllocationChartProps {
  viewBy: string;
}

const BudgetAllocationChart = ({ viewBy }: BudgetAllocationChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Mock data - we'll change this based on the viewBy parameter
  const getChartData = () => {
    switch (viewBy) {
      case "driver":
        return [
          { name: "Brandprint", value: 35, color: "#8B5CF6" },
          { name: "Content Creation", value: 25, color: "#3B82F6" },
          { name: "Licensing Tools", value: 15, color: "#10B981" },
          { name: "Customer Acquisition", value: 15, color: "#F59E0B" },
          { name: "Existing Customers", value: 10, color: "#EF4444" },
        ];
      case "subdriver":
        return [
          { name: "Website", value: 20, color: "#8B5CF6" },
          { name: "Social Media", value: 15, color: "#3B82F6" },
          { name: "Local Listings", value: 15, color: "#10B981" },
          { name: "Email Marketing", value: 20, color: "#F59E0B" },
          { name: "Paid Advertising", value: 12, color: "#EF4444" },
          { name: "Content Writing", value: 10, color: "#EC4899" },
          { name: "Visuals", value: 8, color: "#6366F1" },
        ];
      case "platform":
        return [
          { name: "Google Business", value: 18, color: "#8B5CF6" },
          { name: "Facebook", value: 12, color: "#3B82F6" },
          { name: "Instagram", value: 15, color: "#10B981" },
          { name: "Email Platform", value: 20, color: "#F59E0B" },
          { name: "Google Ads", value: 15, color: "#EF4444" },
          { name: "Yelp", value: 8, color: "#EC4899" },
          { name: "Website Platform", value: 12, color: "#6366F1" },
        ];
      default:
        return [
          { name: "Brandprint", value: 35, color: "#8B5CF6" },
          { name: "Content Creation", value: 25, color: "#3B82F6" },
          { name: "Licensing Tools", value: 15, color: "#10B981" },
          { name: "Customer Acquisition", value: 15, color: "#F59E0B" },
          { name: "Existing Customers", value: 10, color: "#EF4444" },
        ];
    }
  };
  
  const data = getChartData();
  
  // Recharts configuration
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

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
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BudgetAllocationChart;
