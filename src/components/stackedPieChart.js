"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReusableSunburstChart({
  data,
  labels,
  title = "Sunburst Chart",
  description = "",
  lightMode = false,
  className = "",
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous instance
      }

      const ctx = chartRef.current.getContext("2d");

      // Debugging: Log the dataset structure
      console.log("Rendering Sunburst Chart with Data:", data);

      // Generate datasets dynamically
      const datasets = data.map((ring, index) => ({
        label: `Ring ${index + 1}`,
        data: ring.values, // Each ring should have values matching labels
        backgroundColor: ring.colors,
        borderWidth: 2,
        cutout: `${index}%`, // Ensure distinct rings
      }));

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.raw}%`,
              },
            },
          },
          animation: { animateRotate: true, animateScale: true },
        },
      });

      return () => chartInstance.current?.destroy();
    }
  }, [data, labels]);

  return (
    <Card
      className={`w-full ${
        lightMode ? "bg-white text-black" : "bg-[#111] text-white"
      } shadow-md ${className}`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
