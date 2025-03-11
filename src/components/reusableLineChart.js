"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ReusableD3LineChart({
  data,
  config = {},
  title = "D3.js Line Chart",
  description = "",
  totals,
  type = "Series",
  toggle = false,
  onToggleChange,
  chartConfigDefault,
  customHeight = 300,
  customWidth,
}) {
  const chartRef = useRef(null);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  const [chartType, setChartType] = useState(type);
  const [width, setWidth] = useState(customWidth || 1100);

  // Normalize data for D3.js
  const chartData = data || [];
  const datasets = [];

  // Normalize config
  let finalConfig = { ...config };
  if (chartConfigDefault) {
    datasets.push({
      label: chartConfigDefault.custom?.label || "Sales",
      dataKey: "custom",
      data: chartData.map((item) => ({
        x: item[finalConfig.xAxis || "month"] || "N/A",
        y: item.custom || 0,
      })),
      color: chartConfigDefault.custom?.color || "#FFA500",
    });
    datasets.push({
      label: chartConfigDefault.previous?.label || "Payout",
      dataKey: "previous",
      data: chartData.map((item) => ({
        x: item[finalConfig.xAxis || "month"] || "N/A",
        y: item.previous || 0,
      })),
      color: chartConfigDefault.previous?.color || "#FFFF99",
    });
  } else if (finalConfig.series) {
    finalConfig.series.forEach((seriesItem) => {
      datasets.push({
        label: seriesItem.label || `Series ${datasets.length + 1}`,
        dataKey: seriesItem.dataKey,
        data: chartData.map((item) => ({
          x: item[finalConfig.xAxis || "month"] || "N/A",
          y: item[seriesItem.dataKey] || 0,
        })),
        color:
          seriesItem.color ||
          `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    });
  }

  if (datasets.length === 0) {
    datasets.push({
      label: "Default Series",
      dataKey: "y",
      data: chartData.map((item) => ({
        x: item[finalConfig.xAxis || "month"] || "N/A",
        y: item.y || 0,
      })),
      color: "#FFA500",
    });
  }

  const handleTabChange = (newType) => {
    setChartType(newType);
    if (onToggleChange) {
      onToggleChange(newType);
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setWidth(parentWidth || customWidth || 1100);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [customWidth]);

  useEffect(() => {
    if (!chartRef.current || !tooltipRef.current) return;

    d3.select(chartRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = customHeight - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", customHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#333")
      .style("color", "#fff")
      .style("border", "none")
      .style("padding", "8px 12px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("font-family", "Arial, sans-serif")
      .style("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.2)")
      .style("pointer-events", "none")
      .style("z-index", "10");

    const xScale = d3
      .scalePoint()
      .domain(datasets[0].data.map((d) => d.x))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(datasets, (d) => d3.max(d.data, (d) => d.y)) || 300000,
      ])
      .range([innerHeight, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      .attr("fill", "#000")
      .attr("font-size", "12px");

    svg
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(6)
          .tickFormat((d) => `$${d / 1000}K`)
      )
      .selectAll("text")
      .attr("fill", "#000")
      .attr("font-size", "12px");

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat("").ticks(12)
      )
      .selectAll("line")
      .attr("stroke", "#ccc");

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat("").ticks(6))
      .selectAll("line")
      .attr("stroke", "#ccc");

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

      svg
        .selectAll(`.dot-${dataset.label}`)
        .data(dataset.data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 6)
        .attr("fill", dataset.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .on("mouseover", (event, d) => {
          const chartRect = chartRef.current.getBoundingClientRect();
          const tooltipNode = tooltipRef.current;
          const tooltipRect = tooltipNode.getBoundingClientRect();

          let left = event.pageX + 15;
          let top = event.pageY - 30;

          if (left + tooltipRect.width > chartRect.right) {
            left = event.pageX - tooltipRect.width - 15;
          }
          if (top < chartRect.top) {
            top = event.pageY + 15;
          }

          tooltip
            .style("visibility", "visible")
            .style("left", left + "px")
            .style("top", top + "px")
            .html(
              `<strong>${dataset.label}</strong><br>Value: $${(
                d.y / 1000
              ).toFixed(1)}K<br>Month: ${d.x}`
            );

          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("r", 8);
        })
        .on("mouseout", (event, d) => {
          tooltip.style("visibility", "hidden");
          d3.select(event.currentTarget)
            .transition()
            .duration(200)
            .attr("r", 6);
        });
    });

    return () => {
      if (chartRef.current) {
        d3.select(chartRef.current).selectAll("*").remove();
      }
    };
  }, [data, config, chartConfigDefault, title, customHeight, width]);

  return (
    <div ref={containerRef} className="w-full">
      <Card className="w-full bg-white shadow-md border-gray-200">
        <CardHeader className="flex flex-col items-start justify-between">
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
                    <CardTitle className="text-black">{title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {description}
                    </CardDescription>
                  </div>
                </TabsContent>
                <TabsContent value="Order">
                  <div>
                    <CardTitle className="text-black">{title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {description}
                    </CardDescription>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <>
                {title && (
                  <CardTitle className="text-black text-xl font-bold">
                    {title}
                  </CardTitle>
                )}
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
              width: "100%",
              height: customHeight,
            }}
          />
          <div ref={tooltipRef} />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 text-sm text-black">
          {/* Legend Section */}
          <div className="flex flex-row gap-4 flex-wrap w-full justify-center">
            {datasets.map((dataset, index) => (
              <span key={dataset.label} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dataset.color }}
                ></span>
                <span className="text-black">{dataset.label}</span>
              </span>
            ))}
          </div>
          {/* Totals Section (if provided) */}
          {totals && (
            <div className="flex flex-row gap-2 font-medium justify leading-none">
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
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
