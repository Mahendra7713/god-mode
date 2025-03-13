"use client"; // Use client-side rendering for ECharts interactivity

import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed

export default function ReusableEChartsSunburstChart({
  data, // Required (array of objects with label, values, and colors for each ring)
  labels, // Required (array of labels for each segment in each ring)
  title = "Stage 1 Pass", // Default title
  description = "", // Optional description
  lightMode = true, // Default to light mode (no dark mode toggle, as requested)
  className = "", // Optional custom class for styling
}) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Validate and normalize data and labels
  const chartData = Array.isArray(data) ? data : [];
  const chartLabels = Array.isArray(labels) ? labels : [];

  useEffect(() => {
    if (!chartRef.current || !chartData.length || !chartLabels.length) return;

    // Initialize ECharts instance
    const echartInstance = echarts.init(chartRef.current, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    setChartInstance(echartInstance);

    // Prepare data for ECharts with specific values and colors
    const totalRings = chartData.length;
    const baseRadius = 150; // Base radius for scaling, adjusted for four rings
    const ringRadii = chartData.map((_, index) => ({
      innerRadius: index === 0 ? 0 : (index * baseRadius) / totalRings,
      outerRadius: ((index + 1) * baseRadius) / totalRings,
    }));

    // Log data for debugging
    console.log("Chart Data:", chartData);
    console.log("Chart Labels:", chartLabels);
    console.log("Ring Radii:", ringRadii);

    // Transform data into ECharts format (nested series for concentric rings)
    const seriesData = chartData
      .map((ring, ringIndex) => {
        if (!ring || !ring.values || !Array.isArray(ring.values)) {
          console.warn(`Invalid ring data at index ${ringIndex}:`, ring);
          return null;
        }
        return {
          name: ring.label || `Step ${ringIndex + 1}`, // Use dynamic label from data
          type: "pie",
          radius: [
            ringRadii[ringIndex].innerRadius, // Removed offset to eliminate gap
            ringRadii[ringIndex].outerRadius,
          ],
          center: ["50%", "50%"],
          z: totalRings - ringIndex, // Ensure outer rings are drawn on top (higher z for outer rings)
          label: {
            position: "inside",
            formatter: "{c}%",
            fontSize: 12,
            fontWeight: "bold",
            color: "#000", // Black text for light mode
            show: true,
          },
          labelLine: {
            show: true, // Enable label lines pointing to segments
            length: 15, // Length of the first part of the line
            length2: 30, // Length of the second part of the line
            lineStyle: {
              color: "#000", // Black lines for light mode
              width: 1,
              z: 9999, // Ensure label lines are above other elements
            },
          },
          itemStyle: {
            borderColor: "#fff", // White border for circles (segments)
            borderWidth: 1,
            borderType: "solid", // Ensure a solid white border
          },
          data: chartLabels.map((label, index) => ({
            name: label,
            value: ring.values[index] || 0,
            itemStyle: {
              color: ring.colors?.[index] || "#ccc", // Use provided colors or default
            },
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)", // Match your pie chart emphasis
            },
          },
        };
      })
      .filter(Boolean); // Remove null entries

    // Define the base graphic configuration (to revert to on mouseout)
    const baseGraphic = chartData.map((ring, ringIndex) => {
      const ringRadius = ringRadii[ringIndex].outerRadius;

      // Define positions, line length, and text offsets per step
      const stepConfigs = [
        {
          angle: Math.PI / 2, // Right (Step 1 (Alpha One))
          left: "70%",
          top: "70%",
          lineX: 35,
          lineY: 0,
          textLeft: 40,
          textTop: -15,
        },
        {
          angle: Math.PI / 2, // Left (Step 2 (Alpha Pro))
          left: "8%",
          top: `30%`,
          lineX: 82,
          lineY: 0,
          textLeft: -65,
          textTop: -12,
        },
        {
          angle: Math.PI / 2, // Bottom (Step 2 (Alpha Swing))
          left: "57%",
          top: `30%`,
          lineX: -110,
          lineY: 0,
          textLeft: 10,
          textTop: -15,
        },
        {
          angle: Math.PI / 2, // Left (Step 4)
          left: "5%",
          top: `55%`,
          lineX: 160, // Longer line
          lineY: 0,
          textLeft: -65,
          textTop: -12,
        },
      ];

      const { angle, left, top, lineX, lineY, textLeft, textTop } =
        stepConfigs[ringIndex] || stepConfigs[0];

      return {
        type: "group",
        id: `graphic-group-${ringIndex}`, // Add an ID to identify the group
        left: left,
        top: top,
        zlevel: 10000, // Bring in front of pie chart
        children: [
          {
            type: "line",
            id: `graphic-line-${ringIndex}`, // Add an ID to identify the line
            zlevel: 10000,
            shape: {
              x1: 0,
              y1: 0,
              x2: lineX, // Customizable line length
              y2: lineY,
            },
            style: {
              stroke: "#000",
              lineWidth: 1.5,
            },
          },
          {
            type: "text",
            id: `graphic-text-${ringIndex}`, // Add an ID to identify the text
            zlevel: 10000,
            left: textLeft,
            top: textTop,
            style: {
              text:
                ring.label?.replace(/\(/g, "\n(") || `Step ${ringIndex + 1}`,
              fontSize: 14,
              fontWeight: "bold",
              fill: "#000",
              width: 150, // Set width to prevent overflow
              lineHeight: 16, // Improve readability
              textAlign: "left",
            },
          },
        ],
      };
    });

    // ECharts options in light mode with label lines and ring labels
    const options = {
      backgroundColor: "#fff", // Light background for the chart area, matching light mode
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `${params.name}: <b>${params.value?.toFixed(2)}</b> (${
            params.percent
          }%)`;
        }, // Match your pie chart tooltip format
        backgroundColor: "#fff", // White tooltip for light mode
        textStyle: {
          color: "#000", // Black text for light mode
        },
        borderColor: "#ccc", // Light gray border for light mode
        borderWidth: 1,
      },
      series: seriesData, // Ensure all series (rings) are included
      graphic: baseGraphic, // Set initial graphic configuration
      // Add legend at the bottom (optional, based on your data or image)
      legend: {
        data: chartLabels, // Use segment labels for legend
        orient: "horizontal",
        bottom: 10, // Position at the bottom
        itemGap: 20, // Space between legend items
        textStyle: {
          color: "#000", // Black text for light mode
        },
        icon: "circle", // Use circles for legend icons
        formatter: (name) => name, // Simple label formatting
      },
    };

    // Set options
    echartInstance.setOption(options);

    // Highlight graphic label and line on pie slice hover
    echartInstance.on("mouseover", (params) => {
      if (params.componentType === "series" && params.seriesType === "pie") {
        const ringIndex = params.seriesIndex; // Index of the ring being hovered
        const reversedIndex = totalRings - 1 - ringIndex; // Reverse the index
        console.log(
          "Hovered on ring:",
          ringIndex,
          "reversed to:",
          reversedIndex,
          "name:",
          params.name
        ); // Debug log

        // Create a new graphic configuration with the highlighted styles for the reversed ring
        const updatedGraphic = baseGraphic.map((graphic, index) => {
          if (index === reversedIndex) {
            // Highlight the opposite ring
            return {
              ...graphic,
              children: [
                {
                  ...graphic.children[0], // Line
                  style: {
                    stroke: "#FF6F61", // Highlight color (red)
                    lineWidth: 2.5, // Thicker line
                  },
                },
                {
                  ...graphic.children[1], // Text
                  style: {
                    ...graphic.children[1].style,
                    fill: "#FF6F61", // Highlight color (red)
                    fontSize: 16, // Slightly larger font
                    fontWeight: "bolder", // Bolder text
                  },
                },
              ],
            };
          }
          return graphic; // Return unchanged for other rings
        });

        // Update the graphic elements
        echartInstance.setOption({ graphic: updatedGraphic }, false);
      }
    });

    // Revert graphic label and line on mouseout
    echartInstance.on("mouseout", (params) => {
      if (params.componentType === "series" && params.seriesType === "pie") {
        const ringIndex = params.seriesIndex;
        console.log("Mouseout from ring:", ringIndex, "name:", params.name); // Debug log

        // Revert to the base graphic configuration
        echartInstance.setOption({ graphic: baseGraphic }, false);
      }
    });

    // Handle resize
    const handleResize = () => {
      echartInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      if (chartInstance) {
        chartInstance.off("mouseover"); // Clean up event listeners
        chartInstance.off("mouseout");
        chartInstance.dispose();
        setChartInstance(null);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData, chartLabels, lightMode]); // Re-run when these dependencies change

  return (
    <Card
      className={`w-full bg-white text-black border-gray-200 shadow-md ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div
          ref={chartRef}
          style={{
            width: "100%", // Fixed width for the chart (adjust as needed)
            height: "400px", // Fixed height for the chart (adjust as needed)
          }}
        />
      </CardContent>
    </Card>
  );
}
