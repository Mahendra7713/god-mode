"use client"; // Use client-side rendering for chart interactivity

import { useState } from "react"; // Add useState for toggle state if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // Adjust path as needed
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import Tabs components

export default function ReusableAreaChart({
  data, // Required for plotting
  config = {}, // Optional chart configuration (xAxis, series, etc.), defaults to empty object
  title, // Optional title
  description, // Optional description
  totals, // Optional totals (defaults to undefined)
  type = "Series", // Optional type, defaults to "Series" if provided
  toggle = false, // Optional toggle for tabs, defaults to false
  onToggleChange, // Optional callback for toggle changes
  chartConfigDefault, // Optional default chart configuration (legacy structure with custom/previous)
}) {
  // Use default empty array if data is undefined
  const chartData = data || [];

  // Normalize config: convert chartConfigDefault (legacy structure) to series structure if provided
  let finalConfig = { ...config };
  if (chartConfigDefault) {
    // Map chartConfigDefault (with custom/previous) to series structure
    finalConfig = {
      ...finalConfig,
      xAxis: finalConfig.xAxis || "month", // Default to "month" if not specified
      series: [
        {
          label: chartConfigDefault.custom?.label || "Custom",
          color: chartConfigDefault.custom?.color || "#FFA500",
          dataKey: "custom",
        },
        {
          label: chartConfigDefault.previous?.label || "Previous",
          color: chartConfigDefault.previous?.color || "#FFFF99",
          dataKey: "previous",
        },
      ],
      domain: finalConfig.domain || [0, 600000], // Default domain
      ticks: finalConfig.ticks || [
        0, 100000, 200000, 300000, 400000, 500000, 600000,
      ], // Default ticks
      tickFormatter:
        finalConfig.tickFormatter ||
        ((value) => (typeof value === "number" ? `$${value / 1000}K` : value)), // Default formatter
    };
  } else if (!finalConfig.series) {
    // Fallback if no config or chartConfigDefault is provided (minimal functionality)
    finalConfig = {
      xAxis: "x", // Default X-axis key
      series: [], // No series by default (no lines)
      domain: [0, "auto"], // Default domain
      ticks: [0, 100000, 200000, 300000, 400000, 500000, 600000], // Default ticks
      tickFormatter: (value) =>
        typeof value === "number" ? `$${value / 1000}K` : value, // Default formatter
    };
  }

  // Extract configuration
  const xAxisKey = finalConfig.xAxis;
  const series = finalConfig.series || [];
  const domain = finalConfig.domain;
  const ticks = finalConfig.ticks;
  const tickFormatter = finalConfig.tickFormatter;

  // State to manage the tab value (Sales/Order) if toggle is used
  const [chartType, setChartType] = useState(type);

  // Handle tab change and notify parent if onToggleChange is provided
  const handleTabChange = (newType) => {
    setChartType(newType);
    if (onToggleChange) {
      onToggleChange(newType); // Notify parent of the change
    }
  };

  return (
    <Card className="w-full bg-white shadow-md border-gray-200">
      {" "}
      {/* Light background */}
      <CardHeader className="flex flex-col items-start justify-between">
        {" "}
        {/* Flexible layout for title/description or tabs */}
        <div className="w-full">
          {toggle && title && description ? (
            <Tabs
              defaultValue={chartType}
              onValueChange={handleTabChange}
              className="w-full flex flex-row-reverse gap-5 items-center justify-between"
            >
              <TabsList className="grid w-max grid-cols-2">
                <TabsTrigger value="Sales">Sales</TabsTrigger>
                <TabsTrigger value="Order">Order</TabsTrigger>
              </TabsList>
              <TabsContent value="Sales">
                <div>
                  <CardTitle className="text-black">{title}</CardTitle>{" "}
                  {/* Black text for light background */}
                  <CardDescription className="text-gray-600">
                    {description}
                  </CardDescription>{" "}
                  {/* Gray text for description */}
                </div>
              </TabsContent>
              <TabsContent value="Order">
                <div>
                  <CardTitle className="text-black">{title}</CardTitle>{" "}
                  {/* Black text for light background */}
                  <CardDescription className="text-gray-600">
                    {description}
                  </CardDescription>{" "}
                  {/* Gray text for description */}
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <>
              {title && <CardTitle className="text-black">{title}</CardTitle>}
              {description && (
                <CardDescription className="text-gray-600">
                  {description}
                </CardDescription>
              )}
            </>
          )}
        </div>
        {!toggle && type && (
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white text-black rounded-md border border-gray-300">
              {type}
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={finalConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 5, // Flexible left margin for Y-axis labels
              right: 5,
              top: 10,
              bottom: 40, // Flexible bottom margin for legend
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#ccc" // Light gray grid lines for light background
            />
            <XAxis
              dataKey={xAxisKey} // Use dynamic X-axis key from config
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toString().slice(0, 3)} // Generic formatter, can be overridden
              style={{ fontSize: "12px", fill: "#000" }} // Black text for light background
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={tickFormatter} // Use dynamic formatter from config
              domain={domain} // Use dynamic domain from config
              ticks={ticks} // Use dynamic ticks from config
              style={{ fontSize: "12px", fill: "#000" }} // Black text for light background
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {series.map((seriesItem, index) => (
              <Area
                key={seriesItem.dataKey}
                dataKey={seriesItem.dataKey} // Use dynamic dataKey from series config
                type="natural"
                fill="transparent" // No fill (transparent background)
                fillOpacity={0} // Ensure no opacity for fill
                stroke={seriesItem.color} // Use color from config
                strokeWidth={2}
                dot={{
                  fill: seriesItem.color,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {totals && (
        <CardFooter className="flex flex-col items-start gap-2 text-sm text-black">
          {" "}
          {/* Black text for light background, optional */}
          <div className="flex flex-row gap-2 font-medium leading-none">
            {series.map((seriesItem, index) => (
              <span
                key={seriesItem.dataKey}
                className="flex items-center gap-1"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: seriesItem.color }}
                ></span>
                {seriesItem.label || `Series ${index + 1}`}:{" "}
                {totals[seriesItem.dataKey] || "N/A"}
              </span>
            ))}
          </div>
          {/* <div className="leading-none text-gray-500">
            Showing total {type.toLowerCase()} for the last 12 months
          </div> */}
        </CardFooter>
      )}
    </Card>
  );
}
