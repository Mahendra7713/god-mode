"use-client";
import { React, useState } from "react";
import ReactApexChart from "react-apexcharts";

export const ForecastedPayoutChart = ({ chartData }) => {
  const [visibleSeries, setVisibleSeries] = useState({
    "Actual Count": true,
    "Predicted Count": true,
  });

  const actualData = chartData
    ? Object.entries(chartData).map(([date, values]) => ({
        x: date,
        y: values?.actual || 0,
        z: 8,
      }))
    : [];

  const predictedData = chartData
    ? Object.entries(chartData).map(([date, values]) => ({
        x: date,
        y: values?.predicted || 0,
        z: 8,
      }))
    : [];

  console.log("Actual Data:", actualData);
  console.log("Predicted Data:", predictedData);

  const series = [
    {
      name: "Actual Count",
      data: actualData,
      color: "#FF5733",
    },
    {
      name: "Predicted Count",
      data: predictedData,
      color: "#33FF57",
    },
  ];

  const filteredSeries = series.filter((item) => visibleSeries?.[item.name]);

  const options = {
    chart: {
      type: "bubble",
      height: 300,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      title: {
        text: "Date",
        style: {
          color: "#000",
          fontSize: "16px",
        },
      },
      labels: {
        style: {
          colors: "#000",
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          color: "#000",
          fontSize: "16px",
        },
      },
      labels: {
        style: {
          colors: "#000",
          fontSize: "16px",
        },
      },
    },
    tooltip: {
      //   theme: "dark",
      style: {
        fontSize: "16px",
      },
      x: {
        formatter: "yyyy-MM",
      },
      y: {
        formatter: (value) => `${value}`,
      },
      z: {
        show: false,
      },
    },
  };

  const toggleSeries = (name) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="foreCastedPayout">
      <h2>Forecasted No of Payout</h2>
      <ReactApexChart
        options={options}
        series={filteredSeries}
        type="bubble"
        height={400}
      />
      <div style={{ marginBottom: "20px" }} className="legends">
        {series.map((item) => (
          <label
            key={item.name}
            style={{
              marginRight: "10px",
              display: "inline-flex",
              alignItems: "center",
              color: "#000",
            }}
          >
            <input
              type="checkbox"
              checked={visibleSeries[item?.name]}
              onChange={() => toggleSeries(item?.name)}
              style={{ marginRight: "5px" }}
            />
            <span style={{ backgroundColor: item?.color }}></span>
            <p>{item.name}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
