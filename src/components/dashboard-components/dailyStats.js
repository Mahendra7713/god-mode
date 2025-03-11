"use client";

import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter";
import DateRangeFilter from "../rangeFilter";
import ReusableBarChart from "../reusableBarChart";
import ReusableTable from "../reusableTable";
import { Card, CardHeader } from "../ui/card";

export default function DailyStats() {
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
  const payoutsApprovedData = [
    {
      step: "1 Step (Alpha One)",
      "10K": 100,
      "30K": 75,
      "40K": 50,
      "50K": 125,
      "60K": 90,
      "70K": 200,
    },
    {
      step: "2 Step (Alpha Pro)",
      "10K": 150,
      "30K": 110,
      "40K": 90,
      "50K": 210,
      "60K": 180,
      "70K": 50,
    },
    {
      step: "2 Step (Swing)",
      "10K": 200,
      "30K": 250,
      "40K": 260,
      "50K": 220,
      "60K": 190,
      "70K": 130,
    },
    {
      step: "3 Step (Alpha Three)",
      "10K": 130,
      "30K": 120,
      "40K": 40,
      "50K": 240,
      "60K": 210,
      "70K": 150,
    },
  ];

  // Configuration for Total Payouts Approved chart
  const payoutsApprovedConfig = {
    xAxis: "step", // X-axis key for step labels
    series: [
      { label: "10K", color: "#FFD700", dataKey: "10K" }, // Yellow
      { label: "30K", color: "#FFA500", dataKey: "30K" }, // Orange
      { label: "40K", color: "#FF4500", dataKey: "40K" }, // Red
      { label: "50K", color: "#9370DB", dataKey: "50K" }, // Purple
      { label: "60K", color: "#4682B4", dataKey: "60K" }, // Blue
      { label: "70K", color: "#90EE90", dataKey: "70K" }, // Green
    ],
    domain: [0, 300], // Y-axis domain matching the image
    ticks: [0, 50, 100, 150, 200, 250, 300], // Y-axis ticks matching the image
    tickFormatter: (value) => value, // No formatting needed, just numbers
  };

  const tableColumns = [
    {
      key: "accountSize",
      name: "Account Size",
      align: "left",
      width: "w-[150px]",
    },
    { key: "planType", name: "Plan Type", align: "left", width: "w-[150px]" },
    { key: "stage", name: "Stage", align: "center", width: "w-[100px]" },
    {
      key: "totalPayouts",
      name: "Total Payouts Approved",
      align: "right",
      width: "w-[200px]",
    },
    {
      key: "payoutRequest",
      name: "Payout Request",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "newCustomers",
      name: "New Customers",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "totalBreached",
      name: "Total Breached",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "totalPassed",
      name: "Total Passed",
      align: "right",
      width: "w-[150px]",
    },
  ];

  const tableData = [
    {
      id: 1,
      accountSize: "200K",
      planType: "Alpha X",
      stage: 2,
      totalPayouts: 16,
      payoutRequest: 69,
      newCustomers: 9619,
      totalBreached: 1521,
      totalPassed: 20,
    },
    {
      id: 2,
      accountSize: "100K",
      planType: "Alpha Pro",
      stage: 1,
      totalPayouts: 22,
      payoutRequest: 77,
      newCustomers: 9632,
      totalBreached: 3926,
      totalPassed: 18,
    },
    {
      id: 3,
      accountSize: "100K",
      planType: "Alpha X",
      stage: 1,
      totalPayouts: 33,
      payoutRequest: 95,
      newCustomers: 9621,
      totalBreached: 4728,
      totalPassed: 22,
    },
    {
      id: 4,
      accountSize: "150K",
      planType: "Alpha Pro",
      stage: 1,
      totalPayouts: 34,
      payoutRequest: 89,
      newCustomers: 9625,
      totalBreached: 9438,
      totalPassed: 25,
    },
    {
      id: 5,
      accountSize: "150K",
      planType: "Alpha X",
      stage: 1,
      totalPayouts: 12,
      payoutRequest: 94,
      newCustomers: 9630,
      totalBreached: 6790,
      totalPassed: 19,
    },
    {
      id: 6,
      accountSize: "200K",
      planType: "Alpha X",
      stage: 2,
      totalPayouts: 18,
      payoutRequest: 91,
      newCustomers: 9633,
      totalBreached: 2686,
      totalPassed: 15,
    },
    {
      id: 7,
      accountSize: "200K",
      planType: "Alpha Pro",
      stage: 1,
      totalPayouts: 32,
      payoutRequest: 86,
      newCustomers: 9620,
      totalBreached: 7769,
      totalPassed: 30,
    },
    {
      id: 8,
      accountSize: "150K",
      planType: "Alpha Pro",
      stage: 2,
      totalPayouts: 34,
      payoutRequest: 82,
      newCustomers: 9629,
      totalBreached: 8587,
      totalPassed: 28,
    },
    {
      id: 9,
      accountSize: "100K",
      planType: "Alpha Pro",
      stage: 1,
      totalPayouts: 23,
      payoutRequest: 98,
      newCustomers: 9622,
      totalBreached: 5090,
      totalPassed: 20,
    },
    {
      id: 10,
      accountSize: "200K",
      planType: "Alpha X",
      stage: 1,
      totalPayouts: 23,
      payoutRequest: 74,
      newCustomers: 9634,
      totalBreached: 5564,
      totalPassed: 12,
    },
  ];

  return (
    <Card className="flex flex-col gap-5 p-5 h-full">
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Daily Stats</h3>{" "}
          <div className="flex flex-row flex-wrap items-center gap-2.5 xl:flex-nowrap">
            <PlanTypeFiler data={planTypeData} />
            <AccountSizeFilter data={accountSizeData} />
            <DateRangeFilter />
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-row flex-wrap items-center justify-between gap-5 xl:flex-nowrap">
        <ReusableBarChart
          data={payoutsApprovedData}
          title="Total Payouts Approved"
          description="By Product and Payout Amount"
          config={payoutsApprovedConfig}
          footerText="Showing total payouts approved for each product step"
        />
        <ReusableBarChart
          data={payoutsApprovedData}
          title="Payout Request"
          description="By Product and Payout Amount"
          config={payoutsApprovedConfig}
          footerText="Showing total Payout Request for each product step"
        />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-5 xl:flex-nowrap">
        <ReusableBarChart
          data={payoutsApprovedData}
          title="New customers"
          description="By Product and Payout Amount"
          config={payoutsApprovedConfig}
          footerText="Showing New customers for each product step"
        />
        <ReusableBarChart
          data={payoutsApprovedData}
          title="Total Breached"
          description="By Product and Payout Amount"
          config={payoutsApprovedConfig}
          footerText="Showing Total Breached for each product step"
        />
      </div>
      <div className="h-fit w-full flex">
        <ReusableBarChart
          data={payoutsApprovedData}
          title="Total Passed"
          description="By Product and Payout Amount"
          config={payoutsApprovedConfig}
          footerText="Showing Total Passed for each product step"
        />
      </div>
      <div className="h-fit w-full flex">
        <ReusableTable
          serverSide={false}
          columns={tableColumns}
          data={tableData}
          showSelectAll={false}
          pageSize={10}
          totalItems={tableData.length}
          currentPage={1}
          rowId="id"
        />
      </div>
    </Card>
  );
}
