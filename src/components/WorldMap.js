"use client"; // Use client-side rendering for D3.js interactivity

import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import worldCountries from "../app/data/world-countries.json"; // Import the GeoJSON
import { Card } from "./ui/card";

export default function WorldMap({ onCountrySelect }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const zoomRef = useRef(d3.zoomIdentity);

  // Update dimensions dynamically based on parent size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    const { width, height } = dimensions;
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove(); // Clear previous map

    const projection = d3.geoMercator().scale(150).center([0, 20]);
    const path = d3.geoPath().projection(projection);
    projection.translate([width / 2, height / 2]);

    // Draw the map
    const paths = svg
      .selectAll("path")
      .data(worldCountries.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) =>
        d.properties.NAME === selectedCountry ? "#F99" : "#ccc"
      )
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("click", (event, d) => {
        setSelectedCountry(d.properties.NAME);
        if (onCountrySelect) onCountrySelect(d.properties.NAME);
      })
      .on("mouseover", (event, d) => {
        if (d.properties.NAME !== selectedCountry) {
          d3.select(event.currentTarget).attr("fill", "#F99");
          const tooltip = d3.select(tooltipRef.current);
          if (tooltip.node()) {
            const centroid = d3.geoCentroid(d); // Get the centroid of the country
            const projectedPoint = projection(centroid); // Project centroid to screen coordinates
            const x = projectedPoint[0]; // X coordinate in SVG space
            const y = projectedPoint[1]; // Y coordinate in SVG space
            const tooltipWidth = tooltip.node().offsetWidth || 100; // Default width if not measurable
            const tooltipHeight = tooltip.node().offsetHeight || 20; // Default height if not measurable

            // Adjust to center the tooltip over the centroid
            const centeredX = x - tooltipWidth / 2;
            const centeredY = y - tooltipHeight;

            // Ensure tooltip stays within container bounds
            const boundedX = Math.max(
              0,
              Math.min(centeredX, width - tooltipWidth)
            );
            const boundedY = Math.max(
              0,
              Math.min(centeredY, height - tooltipHeight)
            );

            tooltip
              .style("visibility", "visible")
              .style("left", `${boundedX}px`)
              .style("top", `${boundedY}px`)
              .text(d.properties.NAME);
            console.log(
              "Tooltip shown for:",
              d.properties.NAME,
              "at",
              { x: boundedX, y: boundedY },
              "centroid:",
              { x: projectedPoint[0], y: projectedPoint[1] },
              "container:",
              { width, height }
            ); // Debug log
          }
        }
      })
      .on("mouseout", (event, d) => {
        if (d.properties.NAME !== selectedCountry) {
          d3.select(event.currentTarget).attr("fill", "#ccc");
          const tooltip = d3.select(tooltipRef.current);
          if (tooltip.node()) {
            tooltip.style("visibility", "hidden");
            console.log("Tooltip hidden for:", d.properties.NAME); // Debug log
          }
        }
      });

    // Zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 8])
      .on("zoom", (event) => {
        svg.selectAll("path").attr("transform", event.transform);
      });

    svg.call(zoom).call(zoom.transform, zoomRef.current);

    return () => {
      svg.selectAll("*").remove();
    };
  }, [dimensions, selectedCountry, onCountrySelect]);

  return (
    <Card
      ref={containerRef}
      className="flex justify-center items-center flex-col bg-white w-full h-full text-black border-gray-200 shadow-md overflow-hidden relative" // Added relative for positioning context
      style={{ position: "relative" }} // Ensure positioning context
    >
      <svg ref={svgRef} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className="absolute bg-white border border-gray-300 p-1 rounded shadow-md text-sm pointer-events-none"
        style={{ visibility: "hidden", zIndex: 10 }} // Added zIndex to ensure it appears above map
      />
      {selectedCountry && (
        <p className="text-black">Selected Country: {selectedCountry}</p>
      )}
    </Card>
  );
}
