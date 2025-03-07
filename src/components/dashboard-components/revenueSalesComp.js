"use client";
import { useState } from "react";
import AccountSizeFilter from "../accountFilter";
import icon1 from "../icons/newCustomers.svg";
import icon2 from "../icons/returningCustomers.svg";
import icon3 from "../icons/totalOrders.svg";
import icon4 from "../icons/totalSales.svg";
import PlanTypeFiler from "../planFilter";
import DateRangeFilter from "../rangeFilter";
import ReusableD3LineChart from "../reusableLineChart";
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
    { month: "Jan", custom: 50000, previous: 20000 },
    { month: "Feb", custom: 75000, previous: 30000 },
    { month: "Mar", custom: 150000, previous: 40000 },
    { month: "Apr", custom: 250000, previous: 50000 },
    { month: "May", custom: 300000, previous: 60000 },
    { month: "Jun", custom: 200000, previous: 70000 },
    { month: "Jul", custom: 180000, previous: 80000 },
    { month: "Aug", custom: 150000, previous: 90000 },
    { month: "Sept", custom: 120000, previous: 100000 },
    { month: "Oct", custom: 100000, previous: 110000 },
    { month: "Nov", custom: 80000, previous: 120000 },
    { month: "Dec", custom: 100000, previous: 140000 },
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
      image: icon4,
    },
    {
      title: "Total Orders",
      value: "1547",
      image: icon3,
    },
    {
      title: "New Customers",
      value: "2874",
      image: icon1,
    },
    {
      title: "Returning Customers",
      value: "52%",
      image: icon2,
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
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Revenue Sales</h3>{" "}
          <div className="flex flex-row flex-wrap items-center gap-2.5 xl:flex-nowrap">
            <PlanTypeFiler data={planTypeData} />
            <AccountSizeFilter data={accountSizeData} />
            <DateRangeFilter />
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-5 xl:flex-row">
        <Card className="grid grid-cols-2 gap-5 w-full p-5 xl:max-w-[342px] xl:flex xl:flex-col">
          <StatsCard data={statsData} />
        </Card>
        <Card className="w-full h-full p-5">
          <Tabs
            defaultValue="map"
            className="flex flex-col h-full gap-5 items-end"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h4>Revenue by country</h4>
              <TabsList className="flex w-min">
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="map" className="w-full h-full">
              <div className="w-full flex flex-col gap-5 h-full justify-between lg:flex-row">
                <WorldMap
                  // userWidth={500}
                  userHeight={300}
                  onCountrySelect={handleCountrySelect}
                />
                <div className="w-full max-w-[278px]">
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
      <div className="flex flex-col  gap-5 items-end">
        <DateRangeFilter />
        <div className="flex flex-col gap-5 w-full xl:flex-row">
          <ReusableD3LineChart
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
            customHeight={300} // Ensure height is 300px
            customWidth={560} // Match the width in your layout
          />

          <ReusableD3LineChart
            data={chartData}
            title="Sales / Order per Plans"
            description="Custom (Jan 1, 2024 - Dec 31, 2024)"
            totals={{
              custom: "$52,346,256.00",
              previous: "$22,856,156.00",
            }}
            type={chartType} // Pass the current chart type
            toggle={true} // Enable the tabs
            onToggleChange={handleChartToggle} // Handle tab changes
            config={chartConfig} // Pass dynamic configuration for this chart
            customHeight={300} // Ensure height is 300px
            customWidth={560} // Match the width in your layout
          />
        </div>
      </div>
    </Card>
  );
}
