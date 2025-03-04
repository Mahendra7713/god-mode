"use client"; // Use client-side rendering for D3.js interactivity

import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import worldCountries from "../app/data/world-countries.json"; // Import the GeoJSON
import { Card } from "./ui/card";

export default function WorldMap({ onCountrySelect, userWidth, userHeight }) {
  const svgRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null); // State to store the clicked country name

  // Use userWidth and userHeight directly, with fallbacks for defaults
  const width = userWidth || 500; // Default width if not provided
  const height = userHeight || 250; // Default height if not provided

  useEffect(() => {
    // Check if svgRef.current exists before proceeding
    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content to prevent duplication
    svg.selectAll("*").remove();

    const projection = d3
      .geoMercator()
      .scale(100)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Calculate initial bounds and center for scaling
    const initialBounds = d3.geoBounds(worldCountries);
    const center = d3.geoCentroid(worldCountries);
    const scale = 150; // Adjust scale for better fit, you can tweak this
    projection
      .scale(scale)
      .center(center)
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
      ) // Set fill based on selected country
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("click", (event, d) => {
        const countryBounds = d3.geoBounds(d);
        const center = d3.geoCentroid(d);
        const x = countryBounds[0][0];
        const y = countryBounds[0][1];
        const widthScale = countryBounds[1][0] - countryBounds[0][0];
        const heightScale = countryBounds[1][1] - countryBounds[0][1];
        const scale = 0.9 / Math.max(widthScale / width, heightScale / height);

        svg
          .transition()
          .duration(750)
          .call(
            d3.zoom().transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(scale)
              .translate(-center[0], -center[1])
          );

        const countryName = d.properties.NAME;
        setSelectedCountry(countryName); // Update state with the clicked country name
        const countryStats = {
          name: countryName,
          population: d.properties.POP_EST || 0,
          gdp: d.properties.GDP_MD || 0,
        };
        console.log(`Country clicked: ${countryName}`);
        console.log(`Stats:`, countryStats);

        if (onCountrySelect) {
          onCountrySelect(countryName);
        }
      })
      .on("mouseover", (event, d) => {
        // Change fill color to #F99 for hover, unless it's the selected country (already #F99)
        if (d.properties.NAME !== selectedCountry) {
          d3.select(event.currentTarget).attr("fill", "#F99");
        }
      })
      .on("mouseout", (event, d) => {
        // Restore default fill color (#ccc) for non-selected countries on mouseout
        if (d.properties.NAME !== selectedCountry) {
          d3.select(event.currentTarget).attr("fill", "#ccc");
        }
      });

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 8])
      .on("zoom", (event) => {
        svg.selectAll("path").attr("transform", event.transform);
      });

    svg.call(zoom);

    // Clean up on unmount or when width/height changes
    return () => {
      if (svgRef.current) {
        svg.selectAll("*").remove();
      }
    };
  }, [selectedCountry, width, height]); // Re-run effect when selectedCountry, width, or height changes

  return (
    <Card className="bg-white text-black border-gray-200 shadow-md">
      <svg ref={svgRef} width={width} height={height}></svg>
      {selectedCountry && (
        <p className="text-black">Selected Country: {selectedCountry}</p>
      )}
    </Card>
  );
}
