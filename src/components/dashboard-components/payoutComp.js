"use client";
import { useState } from "react";
import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter";
import DateRangeFilter from "../rangeFilter";
import StatsCard from "../statsCard";
import { Card, CardHeader } from "../ui/card";
import WorldMap from "../WorldMap";
import ReusableTable from "../reusableTable";
import ReusableAreaChart from "../reusableLineChart";
import icon1 from "../icons/noOfApvReq.svg";
import icon2 from "../icons/totalAmountPaid.svg";
import icon3 from "../icons/totalAmountReq.svg";
import icon4 from "../icons/noOfPayout.svg";
import OpenProfitData from "./openProfit";
export default function Payout() {
  const [selectedCountry, setSelectedCountry] = useState(null);
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

  const payoutsColumns = [
    {
      key: "Product / Variation Title",
      name: "Product / Variation Title",
      align: "left",
      width: "w-[200px]",
    },
    { key: "SKU", name: "SKU", align: "left", width: "w-[100px]" },
    {
      key: "Items Sold",
      name: "Items Sold",
      align: "right",
      width: "w-[120px]",
    },
    { key: "Net Sales", name: "Net Sales", align: "right", width: "w-[150px]" },
    { key: "Orders", name: "Orders", align: "right", width: "w-[120px]" },
    { key: "Status", name: "Status", align: "left", width: "w-[120px]" },
  ];

  const payoutStatsData = [
    {
      title: "Total Amount Requested",
      value: "$428,752",
      image: icon3,
    },
    {
      title: "Total Amount Paid",
      value: "$124,512",
      image: icon2,
    },
    {
      title: "No. Of Payout Requests",
      value: "1547",
      image: icon4,
    },
    {
      title: "No. Of Approved Request",
      value: "1025",
      image: icon1,
    },
  ];
  const handleCountrySelect = (countryName) => {
    console.log("Selected country in parent:", countryName);
    setSelectedCountry(countryName); // Update state with the selected country name
  };

  const payoutsData = [
    {
      id: 1,
      "Product / Variation Title": "Alpha Pro 50K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 2,
      "Product / Variation Title": "Alpha Three 150K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 3,
      "Product / Variation Title": "Alpha X 100K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 4,
      "Product / Variation Title": "Alpha 100K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 5,
      "Product / Variation Title": "Alpha One 10K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 6,
      "Product / Variation Title": "Alpha Three 150K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 7,
      "Product / Variation Title": "Alpha Pro 50K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 8,
      "Product / Variation Title": "Alpha X 100K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 9,
      "Product / Variation Title": "Alpha 100K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
    {
      id: 10,
      "Product / Variation Title": "Alpha One 10K",
      SKU: "-",
      "Items Sold": 17921,
      "Net Sales": "$1,022,987.42",
      Orders: 17842,
      Status: "Active",
    },
  ];
  const [selectedRows, setSelectedRows] = useState({});
  const handleCheckboxChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
    console.log("Selected Rows Data:", newSelectedRows);
  };

  const salesPayoutsData = [
    { month: "Jan", sales: 100000, payouts: 30000 },
    { month: "Feb", sales: 95000, payouts: 35000 },
    { month: "Mar", sales: 250000, payouts: 50000 },
    { month: "Apr", sales: 180000, payouts: 60000 },
    { month: "May", sales: 270000, payouts: 80000 },
    { month: "Jun", sales: 150000, payouts: 70000 },
    { month: "Jul", sales: 280000, payouts: 90000 },
    { month: "Aug", sales: 220000, payouts: 95000 },
    { month: "Sep", sales: 300000, payouts: 85000 },
    { month: "Oct", sales: 260000, payouts: 92000 },
    { month: "Nov", sales: 230000, payouts: 88000 },
    { month: "Dec", sales: 210000, payouts: 89000 },
  ];

  const [chartType, setChartType] = useState("Sales");
  const handleChartToggle = (newType) => {
    setChartType(newType); // Update chart type in parent
  };

  // Configuration for Sales vs Payouts chart
  const salesPayoutsConfig = {
    xAxis: "month", // X-axis key
    series: [
      { label: "Sales", color: "#FFA500", dataKey: "sales" }, // Match sales data key
      { label: "Payout", color: "#D7B26D", dataKey: "payouts" }, // Match payouts data key
    ],
    domain: [0, 300000], // Optional: Adjust Y-axis domain for your data
    ticks: [0, 50000, 100000, 150000, 200000, 250000, 300000], // Optional: Adjust Y-axis ticks for your data
    tickFormatter: (value) => `$${value / 1000}K`, // Optional: Format Y-axis ticks
  };

  const chartConfigDefault = {
    custom: {
      label: "Sales",
      color: "#FFA500", // Orange for Custom (matches image)
    },
    previous: {
      label: "Payout",
      color: "#D7B26D", // Light yellow for Previous (matches image)
    },
  };

  return (
    <Card className="flex flex-col gap-5 p-5">
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Payouts</h3>{" "}
          <div className="flex flex-row flex-wrap items-center gap-2.5 xl:flex-nowrap">
            <PlanTypeFiler data={planTypeData} />
            <AccountSizeFilter data={accountSizeData} />
            <DateRangeFilter />
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-row flex-wrap gap-5 xl:flex-nowrap">
        <StatsCard data={payoutStatsData} className="w-full" />
      </div>
      <div className="flex flex-col gap-5 xl:flex-row">
        <Card className="w-full max-w-full gap-3 flex flex-col items-start justify-between p-5 h-full xl:max-w-[420px]">
          <h2 className="text-xl font-bold ">Payouts by country</h2>
          <div className="w-full h-full max-h-[600px]">
            <WorldMap
              className="w-full"
              onCountrySelect={handleCountrySelect}
            />{" "}
          </div>
          <p>Currently Selected Country: {selectedCountry || "None"}</p>{" "}
        </Card>
        <Card className="w-full p-5 flex flex-col gap-5">
          <CardHeader className="p-0">
            <h4 className="text-xl font-bold ">Payouts by product</h4>
          </CardHeader>
          <ReusableTable
            serverSide={false}
            columns={payoutsColumns}
            data={payoutsData}
            onCheckboxChange={handleCheckboxChange} // Handle checkbox changes
            showSelectAll={true} // Enable "Select All" checkbox
            pageSize={10}
            totalItems={payoutsData.length}
            CurrentPageNo={1}
            setPageSize={() => {}}
            triggerChange={() => {}}
            rowId="id"
          />
        </Card>
      </div>
      <div className="flex flex-col gap-5">
        <ReusableAreaChart
          customHeight={400} // ✅ Set height dynamically
          customWidth={1200}
          data={salesPayoutsData}
          title="Sales and Payout by Country"
          config={salesPayoutsConfig} // Pass dynamic configuration for this chart
          toggle={false} // Disable tabs for simplicity
        />
      </div>
      <div>
        <OpenProfitData />
      </div>
    </Card>
  );
}
