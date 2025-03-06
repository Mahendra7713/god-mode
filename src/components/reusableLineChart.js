"use client"; // Use client-side rendering for D3.js interactivity

import { useRef, useEffect, useState } from "react"; // Add useRef, useEffect for D3.js
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import Tabs components

export default function ReusableD3LineChart({
  data, // Required for plotting (array of objects with x-axis and series data)
  config = {}, // Optional chart configuration (xAxis, series, etc.), defaults to empty object
  title = "D3.js Line Chart", // Default title
  description = "", // Optional description
  totals, // Optional totals (object with dataKey values, defaults to undefined)
  type = "Series", // Optional type, defaults to "Series" if provided
  toggle = false, // Optional toggle for tabs, defaults to false
  onToggleChange, // Optional callback for toggle changes
  chartConfigDefault, // Optional default chart configuration (legacy structure with custom/previous)
  customHeight = 300, // Fixed height at 300px (default and enforced)
  customWidth, // Optional width (if provided, overrides dynamic width)
}) {
  const chartRef = useRef(null); // Ref for the SVG element
  const tooltipRef = useRef(null); // Ref for the tooltip div
  const containerRef = useRef(null); // Ref for the parent container to measure width
  const [chartType, setChartType] = useState(type); // State to manage the tab value (Sales/Order) if toggle is used
  const [width, setWidth] = useState(customWidth || 1100); // State to manage dynamic width

  // Normalize data for D3.js
  const chartData = data || [];
  const datasets = [];

  // Normalize config: convert chartConfigDefault (legacy structure) or use config.series
  let finalConfig = { ...config };
  if (chartConfigDefault) {
    // Map chartConfigDefault (with custom/previous) to D3.js datasets
    datasets.push({
      label: chartConfigDefault.custom?.label || "Sales",
      dataKey: "custom", // Explicitly set dataKey for totals lookup
      data: chartData.map((item) => ({
        x: item[finalConfig.xAxis || "month"] || "N/A",
        y: item.custom || 0, // Use 'custom' directly to match chartData
      })),
      color: chartConfigDefault.custom?.color || "#FFA500",
    });
    datasets.push({
      label: chartConfigDefault.previous?.label || "Payout",
      dataKey: "previous", // Explicitly set dataKey for totals lookup
      data: chartData.map((item) => ({
        x: item[finalConfig.xAxis || "month"] || "N/A",
        y: item.previous || 0, // Use 'previous' directly to match chartData
      })),
      color: chartConfigDefault.previous?.color || "#FFFF99",
    });
  } else if (finalConfig.series) {
    // Use series from config if provided (e.g., salesPayoutsConfig)
    finalConfig.series.forEach((seriesItem) => {
      datasets.push({
        label: seriesItem.label || `Series ${datasets.length + 1}`,
        dataKey: seriesItem.dataKey, // Explicitly set dataKey for totals lookup
        data: chartData.map((item) => ({
          x: item[finalConfig.xAxis || "month"] || "N/A",
          y: item[seriesItem.dataKey] || 0, // Extract data for this series
        })),
        color:
          seriesItem.color ||
          `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Default random color
      });
    });
  }

  // Fallback if no config or chartConfigDefault is provided (minimal functionality)
  if (datasets.length === 0) {
    datasets.push({
      label: "Default Series",
      dataKey: "y", // Default dataKey for totals
      data: chartData.map((item) => ({
        x: item[finalConfig.xAxis || "month"] || "N/A",
        y: item.y || 0, // Fallback to 'y' key if no series defined
      })),
      color: "#FFA500", // Default color
    });
  }

  // Handle tab change and notify parent if onToggleChange is provided
  const handleTabChange = (newType) => {
    setChartType(newType);
    if (onToggleChange) {
      onToggleChange(newType); // Notify parent of the change
    }
  };

  // Update width when the container resizes or on mount
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setWidth(parentWidth || customWidth || 1100); // Use parent width or fallback to customWidth or 1100
      }
    };

    // Initial width update
    updateWidth();

    // Add resize observer for dynamic width changes
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Clean up observer on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [customWidth]); // Re-run when customWidth changes

  // Initialize or update D3.js chart
  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current) return;

    // Clear previous content to prevent duplication
    d3.select(chartRef.current).selectAll("*").remove();

    // Set up SVG dimensions
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = customHeight - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", customHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create tooltip div (hidden by default)
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("color", "#000")
      .style("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.1)");

    // Scales
    const xScale = d3
      .scalePoint()
      .domain(datasets[0].data.map((d) => d.x)) // Use x values from first dataset
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(datasets, (d) => d3.max(d.data, (d) => d.y)) || 300000, // Dynamic Y domain based on max value, match your data
      ])
      .range([innerHeight, 0]);

    // Add X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSize(0)) // No tick lines
      .selectAll("text")
      .attr("fill", "#000") // Black text for light background
      .attr("font-size", "12px");

    // Add Y-axis
    svg
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(6) // Adjust number of ticks
          .tickFormat((d) => `$${d / 1000}K`) // Format Y-axis ticks
      )
      .selectAll("text")
      .attr("fill", "#000") // Black text for light background
      .attr("font-size", "12px");

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat("").ticks(12)
      )
      .selectAll("line")
      .attr("stroke", "#ccc"); // Light gray grid lines for light background

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat("").ticks(6))
      .selectAll("line")
      .attr("stroke", "#ccc"); // Light gray grid lines for light background

    // Draw lines for each dataset
    datasets.forEach((dataset) => {
      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

      svg
        .append("path")
        .datum(dataset.data)
        .attr("fill", "none")
        .attr("stroke", dataset.color)
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add points (dots) for each data point with tooltips
      svg
        .selectAll(`.dot-${dataset.label}`)
        .data(dataset.data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 4) // Default point radius
        .attr("fill", dataset.color)
        .on("mouseover", (event, d) => {
          // Show tooltip on hover
          tooltip
            .style("visibility", "visible")
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px")
            .html(
              `${dataset.label}<br>Value: $${d.y / 1000}K<br>Month: ${d.x}`
            ); // Display label, value, and x-value (month)

          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("r", 6); // Larger on hover
        })
        .on("mouseout", (event, d) => {
          // Hide tooltip on mouseout
          tooltip.style("visibility", "hidden");
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("r", 4); // Back to default
        });
    });

    // Add legend (optional, based on totals)
    if (totals) {
      const legend = svg
        .selectAll(".legend")
        .data(datasets)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

      legend
        .append("rect")
        .attr("x", innerWidth - 100)
        .attr("y", 5)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", (d) => d.color);

      legend
        .append("text")
        .attr("x", innerWidth - 85)
        .attr("y", 14)
        .text((d) => d.label)
        .attr("fill", "#000") // Black text for light background
        .attr("font-size", "12px");
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (chartRef.current) {
        d3.select(chartRef.current).selectAll("*").remove();
      }
    };
  }, [data, config, chartConfigDefault, title, customHeight, width]); // Re-run when these change

  return (
    <div ref={containerRef} className="w-full">
      <Card className="w-full bg-white shadow-md border-gray-200">
        {" "}
        {/* Light background, fixed */}
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
          <svg
            ref={chartRef}
            style={{
              width: "100%", // Set to 100% to fill parent width
              height: customHeight, // Fixed height at 300px
            }}
          />
          <div ref={tooltipRef} /> {/* Tooltip div for hover information */}
        </CardContent>
        {totals && (
          <CardFooter className="flex flex-col items-start gap-2 text-sm text-black">
            {" "}
            {/* Black text for light background, optional */}
            <div className="flex flex-row gap-2 font-medium leading-none">
              {datasets.map((dataset, index) => (
                <span key={dataset.label} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dataset.color }}
                  ></span>
                  {dataset.label}: {totals[dataset.dataKey] || "N/A"}
                </span>
              ))}
            </div>
            {/* <div className="leading-none text-gray-500">
              Showing total {type.toLowerCase()} for the last 12 months
            </div> */}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
