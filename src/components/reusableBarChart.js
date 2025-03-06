"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // Adjust path as needed

export default function ReusableBarChart({
  data, // Required for plotting
  config = {}, // Optional chart configuration (xAxis, series, etc.), defaults to empty object
  title, // Optional title
  description, // Optional description
  footerText, // Optional footer text or stats (e.g., trend, description)
  className = "", // Optional custom class for styling
  barWidth = 10, // Optional bar width in pixels, defaults to 10
  customHeight = 300, // Optional custom height, defaults to 300px
  customWidth = "100%", // Optional custom width, defaults to 100% of parent or can be a number in pixels
}) {
  // Use default empty array if data is undefined
  const chartData = data || [];

  // Extract configuration from props, with fallbacks for minimal functionality
  const xAxisKey = config.xAxis || "x"; // Default to "x" if no xAxis key provided
  const series = config.series || []; // Default to empty array if no series provided
  const domain = config.domain || [0, "auto"]; // Default Y-axis domain
  const ticks = config.ticks || [0, 50, 100, 150, 200, 250, 300]; // Default ticks for Y-axis, matching image
  const tickFormatter = config.tickFormatter || ((value) => value); // Default formatter, can be overridden

  // Normalize customWidth to handle both pixel values and percentages
  const widthValue =
    typeof customWidth === "number" ? `${customWidth}px` : customWidth;

  return (
    <Card
      className={`w-full bg-white text-black border-gray-200 shadow-md ${className}`}
    >
      <CardHeader>
        {title && <CardTitle className="text-black">{title}</CardTitle>}
        {description && (
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className={`h-[300px] w-full`} // Apply custom width and height
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            barGap={0}
            barCategoryGap={10}
            width={typeof customWidth === "number" ? customWidth : "100%"} // Dynamic width for BarChart
            height={customHeight} // Fixed height for BarChart
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />{" "}
            {/* Light gray grid for light background */}
            <XAxis
              dataKey={xAxisKey} // Use dynamic X-axis key from config
              tickLine={false}
              axisLine={false}
              tickMargin={20} // Increased margin to give more space for labels
              tickFormatter={(value) => value} // Use the full label value without truncation
              style={{ fontSize: "12px", fill: "#000000" }} // Black text for light background
              angle={0} // No rotation for centered labels
              textAnchor="middle" // Center the labels under the bars
              height={80} // Increase height to accommodate longer labels
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={tickFormatter} // Use dynamic formatter from config
              domain={domain} // Use dynamic domain from config
              ticks={ticks} // Use dynamic ticks from config
              style={{ fontSize: "12px", fill: "#000000" }} // Black text for light background
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {series.map((seriesItem, index) => (
              <Bar
                key={seriesItem.dataKey}
                dataKey={seriesItem.dataKey} // Use dynamic dataKey from series config
                fill={seriesItem.color} // Use color from config
                radius={[10, 10, 0, 0]} // Apply radius only to top corners (top-left and top-right)
                barSize={barWidth} // Use dynamic bar width
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footerText && (
        <CardFooter className="flex-col items-start gap-2 text-sm text-black">
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
                {seriesItem.label || `Series ${index + 1}`}
              </span>
            ))}
          </div>
          {typeof footerText === "string" ? (
            <div className="leading-none text-gray-500">{footerText}</div>
          ) : (
            footerText // Allow custom JSX or elements for footer
          )}
        </CardFooter>
      )}
    </Card>
  );
}
