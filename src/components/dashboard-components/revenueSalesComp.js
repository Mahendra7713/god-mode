"use client";
import { useState } from "react";
import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter";
import DateRangeFilter from "../rangeFilter";
import ReusableAreaChart from "../reusableLineChart"; // Ensure this points to the updated ReusableAreaChart
import ReusableTable from "../reusableTable";
import StatsCard from "../statsCard";
import { Card, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import WorldMap from "../WorldMap";

export default function RevenueSales() {
  const planTypeData = [
    {
      name: "Stage 1",
      value: "stage_1",
    },
    {
      name: "Stage 2",
      value: "stage_2",
    },
    {
      name: "Funded",
      value: "funded",
    },
  ];
  const accountSizeData = [
    {
      name: "5K",
      value: "5000",
    },
    {
      name: "10K",
      value: "10000",
    },
    {
      name: "25K",
      value: "25000",
    },
    {
      name: "50K",
      value: "50000",
    },
    {
      name: "100K",
      value: "100000",
    },
    {
      name: "200K",
      value: "200000",
    },
  ];
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [chartType, setChartType] = useState("Sales"); // State to manage chart type

  const handleCountrySelect = (countryName) => {
    console.log("Selected country in parent:", countryName);
    setSelectedCountry(countryName); // Update state with the selected country name
  };

  const handleChartToggle = (newType) => {
    setChartType(newType); // Update chart type in parent
  };

  const columns = [
    {
      name: "Country",
    },
    {
      name: "Revenue",
    },
  ];

  const data = [
    {
      Country: "United States",
      Revenue: "$1000",
    },
  ];

  const chartData = [
    { month: "January", custom: 50000, previous: 20000 },
    { month: "February", custom: 75000, previous: 30000 },
    { month: "March", custom: 150000, previous: 40000 },
    { month: "April", custom: 250000, previous: 50000 },
    { month: "May", custom: 300000, previous: 60000 },
    { month: "June", custom: 200000, previous: 70000 },
    { month: "July", custom: 180000, previous: 80000 },
    { month: "August", custom: 150000, previous: 90000 },
    { month: "September", custom: 120000, previous: 100000 },
    { month: "October", custom: 100000, previous: 110000 },
    { month: "November", custom: 80000, previous: 120000 },
    { month: "December", custom: 100000, previous: 140000 },
  ];

  // Define dynamic tab options
  const tabOptions = [
    { value: "Sales", label: "Sales" },
    { value: "Order", label: "Order" },
  ];

  const statsData = [
    {
      title: "Total Sales",
      value: "$428,752",
      image: "/icons/sales-icon.png",
    },
    {
      title: "Total Orders",
      value: "1547",
      image: "/icons/orders-icon.png",
    },
    {
      title: "New Customers",
      value: "2874",
      image: "/icons/new-customers-icon.png",
    },
    {
      title: "Returning Customers",
      value: "52%",
      image: "/icons/returning-customers-icon.png",
    },
  ];
  const chartConfig = {
    xAxis: "month", // X-axis key
    series: [
      { label: "Custom", color: "#FFA500", dataKey: "custom" }, // Match custom data key
      { label: "Previous", color: "#FFFF99", dataKey: "previous" }, // Match previous data key
    ],
    domain: [0, 300000], // Adjust Y-axis domain for your data
    ticks: [0, 50000, 100000, 150000, 200000, 250000, 300000], // Adjust Y-axis ticks for your data
    tickFormatter: (value) => `$${value / 1000}K`, // Format Y-axis ticks
  };

  return (
    <Card className="p-5 flex flex-col gap-5">
      {" "}
      {/* Dark background to match chart theme */}
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-row items-center justify-between">
          <h3>Revenue Sales</h3> {/* White text for dark background */}
          <div className="flex flex-row items-center gap-2.5">
            <PlanTypeFiler data={planTypeData} />
            <AccountSizeFilter data={accountSizeData} />
            <DateRangeFilter />
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-row gap-5 ">
        <div className="flex flex-col gap-5 ">
          <StatsCard data={statsData} />
        </div>
        <Card className="w-full  p-5">
          <Tabs defaultValue="map" className="flex flex-col gap-5 items-end">
            <TabsList className="flex w-min">
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="w-full">
              <div className="w-full flex flex-row gap-5 justify-between">
                <WorldMap onCountrySelect={handleCountrySelect} />
                <div className="w-full">
                  <p>Currently Selected Country: {selectedCountry || "None"}</p>{" "}
                </div>
                {/* White text */}
              </div>
            </TabsContent>
            <TabsContent value="table" className="w-full h-full">
              <div className="w-full">
                <ReusableTable columns={columns} data={data} />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      <div className="flex flex-col gap-5 items-end">
        <DateRangeFilter />
        <div className="flex flex-row gap-5 w-full">
          <ReusableAreaChart
            data={chartData}
            title="Sales / Order per Product"
            description="Custom (Jan 1, 2024 - Dec 31, 2024)"
            totals={{
              custom: "$52,346,256.00",
              previous: "$22,856,156.00",
            }}
            type={chartType} // Pass the current chart type
            toggle={true} // Enable the tabs
            onToggleChange={handleChartToggle} // Handle tab changes
            config={chartConfig} // Pass dynamic configuration for this chart
          />
          <ReusableAreaChart
            data={chartData}
            title="Sales / Order per Product"
            description="Custom (Jan 1, 2024 - Dec 31, 2024)"
            totals={{
              custom: "$52,346,256.00",
              previous: "$22,856,156.00",
            }}
            type={chartType} // Pass the current chart type
            toggle={true} // Enable the tabs
            onToggleChange={handleChartToggle} // Handle tab changes
            config={chartConfig} // Pass dynamic configuration for this chart
          />
        </div>
      </div>
    </Card>
  );
}
