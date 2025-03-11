"use client";

import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter"; // Note: Typo in "Filer" should be "Filter" if applicable
import DateRangeFilter from "../rangeFilter";
import ReusableD3BubbleChart from "../reusableBubbleChart";

import TextStatsCard from "../textStatCard";
import { Card, CardHeader } from "../ui/card";

export default function ForecastedPayout() {
  const forecastedPayoutData = [
    { x: "Jan", y: 150, series: "25K" },
    { x: "Jan", y: 200, series: "50K" },
    { x: "Jan", y: 100, series: "100K" },
    { x: "Jan", y: 300, series: "125K" },
    { x: "Jan", y: 250, series: "150K" },
    { x: "Jan", y: 400, series: "200K" },
    { x: "Feb", y: 180, series: "25K" },
    { x: "Feb", y: 220, series: "50K" },
    { x: "Feb", y: 120, series: "100K" },
    { x: "Feb", y: 350, series: "125K" },
    { x: "Feb", y: 280, series: "150K" },
    { x: "Feb", y: 450, series: "200K" },
    { x: "Mar", y: 200, series: "25K" },
    { x: "Mar", y: 250, series: "50K" },
    { x: "Mar", y: 150, series: "100K" },
    { x: "Mar", y: 380, series: "125K" },
    { x: "Mar", y: 300, series: "150K" },
    { x: "Mar", y: 480, series: "200K" },
    { x: "Apr", y: 170, series: "25K" },
    { x: "Apr", y: 230, series: "50K" },
    { x: "Apr", y: 130, series: "100K" },
    { x: "Apr", y: 360, series: "125K" },
    { x: "Apr", y: 290, series: "150K" },
    { x: "Apr", y: 470, series: "200K" },
    { x: "May", y: 190, series: "25K" },
    { x: "May", y: 240, series: "50K" },
    { x: "May", y: 140, series: "100K" },
    { x: "May", y: 370, series: "125K" },
    { x: "May", y: 310, series: "150K" },
    { x: "May", y: 490, series: "200K" },
    { x: "Jun", y: 210, series: "25K" },
    { x: "Jun", y: 260, series: "50K" },
    { x: "Jun", y: 160, series: "100K" },
    { x: "Jun", y: 390, series: "125K" },
    { x: "Jun", y: 320, series: "150K" },
    { x: "Jun", y: 500, series: "200K" },
    { x: "Jul", y: 180, series: "25K" },
    { x: "Jul", y: 220, series: "50K" },
    { x: "Jul", y: 110, series: "100K" },
    { x: "Jul", y: 340, series: "125K" },
    { x: "Jul", y: 280, series: "150K" },
    { x: "Jul", y: 450, series: "200K" },
    { x: "Aug", y: 200, series: "25K" },
    { x: "Aug", y: 250, series: "50K" },
    { x: "Aug", y: 130, series: "100K" },
    { x: "Aug", y: 360, series: "125K" },
    { x: "Aug", y: 300, series: "150K" },
    { x: "Aug", y: 470, series: "200K" },
    { x: "Sep", y: 220, series: "25K" },
    { x: "Sep", y: 270, series: "50K" },
    { x: "Sep", y: 150, series: "100K" },
    { x: "Sep", y: 380, series: "125K" },
    { x: "Sep", y: 320, series: "150K" },
    { x: "Sep", y: 490, series: "200K" },
    { x: "Oct", y: 230, series: "25K" },
    { x: "Oct", y: 280, series: "50K" },
    { x: "Oct", y: 160, series: "100K" },
    { x: "Oct", y: 390, series: "125K" },
    { x: "Oct", y: 330, series: "150K" },
    { x: "Oct", y: 500, series: "200K" },
    { x: "Nov", y: 210, series: "25K" },
    { x: "Nov", y: 260, series: "50K" },
    { x: "Nov", y: 140, series: "100K" },
    { x: "Nov", y: 370, series: "125K" },
    { x: "Nov", y: 310, series: "150K" },
    { x: "Nov", y: 480, series: "200K" },
    { x: "Dec", y: 190, series: "25K" },
    { x: "Dec", y: 240, series: "50K" },
    { x: "Dec", y: 120, series: "100K" },
    { x: "Dec", y: 350, series: "125K" },
    { x: "Dec", y: 290, series: "150K" },
    { x: "Dec", y: 460, series: "200K" },
  ];

  // Dummy data for the cards
  const actualPayoutStats = {
    "Total Accounts": 2000,
    "Requested Payouts": "$254,324.00",
    "Average Payout Value": "$2,000.00",
    "Payout Frequency / Account": 5,
    "Actual Payouts Disbursed": "$214,100.00",
  };

  const forecastedPayoutStats = {
    "Total Accounts": 2000,
    "Requested Payouts": "$260,250.00",
    "Average Payout Value": "$3,000.00",
    "Payout Frequency / Account": "87%",
    "Expected Liability": "$220,000.00",
  };

  const revenueStats = {
    Accounts: 2000,
    "Generated Revenue": "$254,324.00",
    "Average Order Value": "$2,000.00",
    "Stage 1 Pass Rates": "87%",
    "Stage 2 Pass Rates": "68%",
    "Stage 3 Pass Rates": "55%",
    "Total % Funded From Gross Number Purchased": "8%",
  };

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

  return (
    <Card className="p-5 flex flex-col gap-5">
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Payout Forecasting</h3>{" "}
          <div className="flex flex-row flex-wrap items-center gap-2.5 xl:flex-nowrap">
            <PlanTypeFiler data={planTypeData} />
            <AccountSizeFilter data={accountSizeData} />
            <DateRangeFilter />{" "}
          </div>
        </div>
      </CardHeader>
      <div className="container mx-auto space-y-6">
        <div className="">
          <TextStatsCard
            title="Revenue"
            stats={revenueStats}
            layout="col" // Use column layout for Revenue card
            cardLayout="row"
          />
        </div>

        {/* Actual Payout and Forecasted Payout Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextStatsCard
            title="Actual Payout"
            stats={actualPayoutStats}
            layout="row"
            cardLayout="col"
          />{" "}
          {/* Use row layout */}
          <TextStatsCard
            title="Forecasted Payout"
            stats={forecastedPayoutStats}
            layout="row"
            cardLayout="col"
          />{" "}
          {/* Use row layout */}
        </div>
      </div>
      <ReusableD3BubbleChart
        data={forecastedPayoutData}
        title="Forecasted No of Payout"
        description="By Month and Payout Amount"
        labels={[
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
        ]} // Custom labels
        seriesColors={{
          "25K": "#FFB6C1", // Light pink
          "50K": "#ADD8E6", // Light blue
          "100K": "#98FB98", // Light green
          "125K": "#9ACD32", // Yellow-green
          "150K": "#FFA500", // Orange
          "200K": "#FF69B4", // Hot pink
        }} // Custom series colors
        config={{ yAxisMin: 0, yAxisMax: 500 }} // Optional scale configuration
        footerText="Showing forecasted payouts for 2024"
      />
    </Card>
  );
}
