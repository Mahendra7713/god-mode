"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto"; // Ensure Chart.js is installed
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Adjust path as needed

export default function ReusableBubbleChart({
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
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Use default empty array if data is undefined
  const chartData = data || [];

  // Extract configuration from props, with fallbacks for minimal functionality
  const yAxisMin = config.yAxisMin || 0; // Default Y-axis minimum
  const yAxisMax = config.yAxisMax || 500; // Default Y-axis maximum

  // Calculate dynamic bubble radius based on y value (normalized between 5 and 15 for visibility)
  const getDynamicRadius = (y) => {
    // Normalize y value to a radius between 5 and 15
    const minRadius = 5;
    const maxRadius = 15;
    const normalized =
      ((y - yAxisMin) / (yAxisMax - yAxisMin)) * (maxRadius - minRadius) +
      minRadius;
    return Math.max(minRadius, Math.min(maxRadius, normalized)); // Ensure radius stays within bounds
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous chart instance to prevent memory leaks
      }

      const ctx = chartRef.current.getContext("2d");

      // Group data by series for datasets
      const datasets = Object.entries(seriesColors).map(([label, color]) => {
        const seriesData = chartData
          .filter((item) => item.series === label)
          .map((item) => ({
            x: labels.indexOf(item.x) + 1, // Convert label to index (1-based for Chart.js)
            y: item.y,
            r: getDynamicRadius(item.y), // Use dynamic radius based on y value
          }));

        return {
          label,
          data: seriesData,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        };
      });

      chartInstance.current = new Chart(ctx, {
        type: "bubble",
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "category",
              labels,
              ticks: {
                color: "#000000", // Black text for light background
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#E5E7EB", // Light gray grid for light background
                borderColor: "#E5E7EB",
              },
              title: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              min: yAxisMin,
              max: yAxisMax,
              ticks: {
                color: "#000000", // Black text for light background
                font: {
                  size: 12,
                },
                callback: (value) => value,
              },
              grid: {
                color: "#E5E7EB", // Light gray grid for light background
                borderColor: "#E5E7EB",
              },
              title: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#000000", // Black text for light background
                font: {
                  size: 12,
                },
                generateLabels: (chart) => {
                  return chart.data.datasets.map((dataset, index) => ({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    strokeStyle: dataset.borderColor,
                    lineWidth: dataset.borderWidth,
                    hidden: chart.getDatasetMeta(index).hidden,
                    datasetIndex: index,
                  }));
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw.y || 0;
                  return `${label}: ${value}`;
                },
              },
            },
          },
          animation: {
            duration: 0, // Disable animation for better performance with many points
          },
        },
      });

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Clean up on unmount
        }
      };
    }
  }, [chartData, config, labels, seriesColors, yAxisMin, yAxisMax]); // Re-run effect when these dependencies change

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
        <div className="h-[300px] w-full">
          <canvas ref={chartRef} />
        </div>
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
  );
}
