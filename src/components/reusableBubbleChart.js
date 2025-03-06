"use client"; // Use client-side rendering for D3.js interactivity

import { useRef, useEffect, useState } from "react"; // Added useState for toggleable legends
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed

export default function ReusableD3BubbleChart({
  data, // Required for plotting (array of objects with x, y, r, and series label)
  config = {}, // Optional chart configuration (scales, etc.), defaults to empty object
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], // Optional X-axis labels, defaults to months
  seriesColors = {
    // Optional series colors, defaults to match the image
    "25K": "#FFB6C1", // Light pink
    "50K": "#ADD8E6", // Light blue
    "100K": "#98FB98", // Light green
    "125K": "#9ACD32", // Yellow-green
    "150K": "#FFA500", // Orange
    "200K": "#FF69B4", // Hot pink
  },
  title, // Optional title
  description, // Optional description
  footerText, // Optional footer text or stats (e.g., description)
  className = "", // Optional custom class for styling
  customWidth, // Optional width (if provided, overrides dynamic width)
  customHeight = 300, // Default height if not provided (fixed at 300px + legend/gap)
}) {
  const chartRef = useRef(null); // Ref for the SVG element
  const tooltipRef = useRef(null); // Ref for the tooltip div
  const containerRef = useRef(null); // Ref for the parent container to measure width
  const [visibleSeries, setVisibleSeries] = useState(
    Object.keys(seriesColors) // State to track which series are visible
  ); // Default to all series visible
  const [width, setWidth] = useState(customWidth || 1100); // Initialize with customWidth or default 1100

  // Use default empty array if data is undefined
  const chartData = data || [];

  // Extract configuration from props, with fallbacks for minimal functionality
  const yAxisMin = config.yAxisMin || 0; // Default Y-axis minimum
  const yAxisMax = config.yAxisMax || 500; // Default Y-axis maximum

  // Calculate dynamic bubble radius based on y value (normalized between 5 and 15 for visibility)
  const getDynamicRadius = (y) => {
    const minRadius = 5;
    const maxRadius = 15;
    const normalized =
      ((y - yAxisMin) / (yAxisMax - yAxisMin)) * (maxRadius - minRadius) +
      minRadius;
    return Math.max(minRadius, Math.min(maxRadius, normalized)); // Ensure radius stays within bounds
  };

  // Toggle visibility of a series
  const toggleSeries = (series) => {
    setVisibleSeries((prev) =>
      prev.includes(series)
        ? prev.filter((s) => s !== series)
        : [...prev, series]
    );
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
    const chartWidth = width - margin.left - margin.right; // Use the current width state
    const height = customHeight - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .attr("width", width) // Use dynamic width including margins
      .attr("height", customHeight + 60) // Account for legend height (30px) and gap (30px)
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
      .domain(labels) // Use provided labels
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([yAxisMin, yAxisMax]) // Use config-provided Y-axis range
      .range([height, 0]);

    const rScale = d3
      .scaleLinear()
      .domain([yAxisMin, yAxisMax]) // Use Y-axis range for radius scaling
      .range([5, 15]); // Match the dynamic radius range

    // Group data by series
    const seriesData = {};
    chartData.forEach((item) => {
      if (!seriesData[item.series]) {
        seriesData[item.series] = [];
      }
      seriesData[item.series].push({
        x: item.x,
        y: item.y,
        r: getDynamicRadius(item.y), // Use dynamic radius
      });
    });

    // Draw bubbles for each visible series
    Object.entries(seriesData).forEach(([series, points]) => {
      if (visibleSeries.includes(series)) {
        const color = seriesColors[series] || "#ccc"; // Default to gray if series not in seriesColors
        svg
          .selectAll(`.bubble-${series}`)
          .data(points)
          .enter()
          .append("circle")
          .attr("class", `bubble-${series}`)
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", (d) => yScale(d.y))
          .attr("r", (d) => rScale(d.y)) // Use scaled radius
          .attr("fill", color)
          .attr("stroke", color)
          .attr("stroke-width", 1)
          .on("mouseover", (event, d) => {
            // Show tooltip on hover
            tooltip
              .style("visibility", "visible")
              .style("left", event.pageX + 10 + "px")
              .style("top", event.pageY - 10 + "px")
              .html(`${series}<br>Value: ${d.y}<br>Month: ${d.x}`); // Display series label, value, and x-value (month)
          })
          .on("mouseout", (event, d) => {
            // Hide tooltip on mouseout
            tooltip.style("visibility", "hidden");
          });
      }
    });

    // Add X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
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
          .ticks(5) // Adjust number of ticks
          .tickFormat((d) => d) // Keep as is, or format as needed
      )
      .selectAll("text")
      .attr("fill", "#000") // Black text for light background
      .attr("font-size", "12px");

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat("").ticks(12))
      .selectAll("line")
      .attr("stroke", "#E5E7EB"); // Light gray grid lines for light background

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-chartWidth).tickFormat("").ticks(5))
      .selectAll("line")
      .attr("stroke", "#E5E7EB"); // Light gray grid lines for light background

    // Add interactive legend at the bottom with 30px gap
    const legendData = Object.entries(seriesColors).map(([label, color]) => ({
      label,
      color,
    }));
    const legendHeight = 30; // Height for legend
    const legendGap = 30; // 30px gap below the chart
    const legend = svg
      .selectAll(".legend")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) => `translate(${i * 100}, ${height + legendGap})`
      ) // 30px gap
      .on("click", (event, d) => toggleSeries(d.label)); // Toggle series visibility on click

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", (d) =>
        visibleSeries.includes(d.label) ? d.color : "#ccc"
      ); // Gray out if hidden

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text((d) => d.label)
      .attr("fill", "#000") // Black text for light background
      .attr("font-size", "12px")
      .style("cursor", "pointer"); // Indicate clickable

    // Clean up on unmount or when dependencies change
    return () => {
      if (chartRef.current) {
        d3.select(chartRef.current).selectAll("*").remove();
      }
    };
  }, [
    chartData,
    config,
    labels,
    seriesColors,
    yAxisMin,
    yAxisMax,
    customHeight,
    width,
    visibleSeries, // Re-run when visibility changes
  ]); // Re-run effect when these dependencies change

  return (
    <div ref={containerRef} className="w-full">
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
          <svg
            ref={chartRef}
            style={{
              width: "100%", // Set to 100% to fill parent width
              height: customHeight + 60, // Account for legend height (30px) and gap (30px)
            }}
          />
          <div ref={tooltipRef} /> {/* Tooltip div for hover information */}
        </CardContent>
        {footerText && (
          <CardFooter className="flex-col items-start gap-2 text-sm text-black">
            {" "}
            {/* Black text for light background, optional */}
            {typeof footerText === "string" ? (
              <div className="leading-none text-gray-500">{footerText}</div>
            ) : (
              footerText // Allow custom JSX or elements for footer
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
