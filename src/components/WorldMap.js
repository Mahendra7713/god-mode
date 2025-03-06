"use client"; // Use client-side rendering for D3.js interactivity

import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import worldCountries from "../app/data/world-countries.json"; // Import the GeoJSON
import { Card } from "./ui/card";

export default function WorldMap({ onCountrySelect, userWidth, userHeight }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null); // Ref for the tooltip div
  const [selectedCountry, setSelectedCountry] = useState(null); // State to store the clicked country name

  // Use userWidth and userHeight directly, with fallbacks for defaults
  const width = userWidth || 500; // Default width if not provided
  const height = userHeight || 250; // Default height if not provided

  const zoomRef = useRef(d3.zoomIdentity); // Store zoom state

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // Clear previous map to avoid duplication

    const projection = d3
      .geoMercator()
      .scale(100)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    projection
      .scale(150)
      .center(d3.geoCentroid(worldCountries))
      .translate([width / 2, height / 2]);

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
        const bounds = d3.geoBounds(d);
        const centroid = d3.geoCentroid(d);
        const [[x0, y0], [x1, y1]] = bounds;

        const countryWidth = x1 - x0;
        const countryHeight = y1 - y0;
        const scale = Math.max(
          0.1,
          Math.min(
            0.8,
            0.3 / Math.max(countryWidth / width, countryHeight / height)
          )
        );

        // Ensure the country is centered but does NOT over-zoom
        const newTransform = d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(scale) // Adjust scale factor to prevent excessive zoom
          .translate(-projection(centroid)[0], -projection(centroid)[1]);

        svg.transition().duration(750).call(zoom.transform, newTransform);

        zoomRef.current = newTransform; // Store zoom state

        setSelectedCountry(d.properties.NAME);

        if (onCountrySelect) {
          onCountrySelect(d.properties.NAME);
        }
      })
      .on("mouseover", (event, d) => {
        if (d.properties.NAME !== selectedCountry) {
          // Show both fill change and tooltip with country name on hover
          d3.select(event.currentTarget).attr("fill", "#F99"); // Highlight in pink
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style("visibility", "visible")
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 10 + "px")
            .text(d.properties.NAME);
        }
      })
      .on("mouseout", (event, d) => {
        if (d.properties.NAME !== selectedCountry) {
          // Revert fill and hide tooltip on mouseout
          d3.select(event.currentTarget).attr("fill", "#ccc"); // Revert to gray
          d3.select(tooltipRef.current).style("visibility", "hidden");
        }
      });

    // Zoom behavior with persistence
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 8])
      .on("zoom", (event) => {
        svg.selectAll("path").attr("transform", event.transform);
      });

    svg.call(zoom).call(zoom.transform, zoomRef.current); // Apply stored zoom state

    // Create tooltip div (hidden by default)
    d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("color", "#000")
      .style("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.1)");

    return () => {
      if (svgRef.current) {
        svg.selectAll("*").remove();
      }
    };
  }, [selectedCountry, width, height, onCountrySelect]); // Re-run effect when selectedCountry, width, height, or onCountrySelect changes

  return (
    <Card className="flex justify-center align-middle items-center flex-col bg-white w-full text-black border-gray-200 shadow-md overflow-hidden">
      <svg ref={svgRef} width={width} height={height}></svg>
      <div ref={tooltipRef} /> {/* Tooltip div for hover information */}
      {selectedCountry && (
        <p className="text-black">Selected Country: {selectedCountry}</p>
      )}
    </Card>
  );
}
