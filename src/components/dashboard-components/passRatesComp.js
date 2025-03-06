"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter";
import StackedPieChart from "../stackedPieChart";
import DateRangeFilter from "../rangeFilter";
import ReusableStackedPieChart from "../stackedPieChart";
import ReusableSunburstChart from "../stackedPieChart";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

export default function PassRates({ data }) {
  const dummyData = {};

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
  const [accountStatus, setAccountStatus] = useState("active");

  const tabOptions = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "failed",
      label: "Failed",
    },
  ];

  const handleTabChange = (value) => {
    setAccountStatus(value);
  };
  return (
    <Card className="flex flex-col gap-5 p-5">
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Pass Rates</h3>
          <div className="flex flex-row flex-wrap items-center gap-2.5 xl:flex-nowrap">
            <PlanTypeFiler data={planTypeData} />
            <AccountSizeFilter data={accountSizeData} />
            <DateRangeFilter />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-0">
        <div className="flex justify-end">
          <Tabs defaultValue="active">
            <TabsList>
              {tabOptions.map((option) => (
                <TabsTrigger
                  onClick={() => handleChartToggle(option.value)}
                  key={option.value}
                  value={option.value}
                >
                  <p className="font-normal text-sm">{option.label}</p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-full flex-col flex gap-2.5 flex-row lg:flex-row">
            <ReusableSunburstChart
              title="Stage 1 Pass"
              description="Performance breakdown"
              lightMode={true}
              labels={["100K", "150K", "200K", "250K", "300K", "350K"]}
              data={[
                {
                  label: "1 Step (Alpha One)",
                  values: [10, 15, 25, 30, 20, 10], // First ring
                  colors: [
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                  ],
                },
                {
                  label: "2 Step (Alpha Pro)",
                  values: [15, 10, 35, 25, 10, 5], // Second ring
                  colors: [
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                  ],
                },
                {
                  label: "2 Step (Alpha Swing)",
                  values: [20, 30, 10, 40, 15, 5], // Third ring
                  colors: [
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                  ],
                },
                {
                  label: "3 Step (Alpha Three)",
                  values: [25, 15, 30, 35, 10, 20], // Fourth ring
                  colors: [
                    "#9966FF",
                    "#4BC0C0",
                    "#FF9F40",
                    "#FFCD56",
                    "#36A2EB",
                    "#FF6384",
                  ],
                },
              ]}
            />
            <ReusableSunburstChart
              title="Stage 1 Pass"
              description="Performance breakdown"
              lightMode={true}
              labels={["100K", "150K", "200K", "250K", "300K", "350K"]}
              data={[
                {
                  values: [10, 15, 25, 30, 20, 10], // First ring
                  colors: [
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                  ],
                },
                {
                  values: [15, 10, 35, 25, 10, 5], // Second ring
                  colors: [
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                  ],
                },
                {
                  values: [20, 30, 10, 40, 15, 5], // Third ring
                  colors: [
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                  ],
                },
                {
                  values: [25, 15, 30, 35, 10, 20], // Fourth ring
                  colors: [
                    "#9966FF",
                    "#4BC0C0",
                    "#FF9F40",
                    "#FFCD56",
                    "#36A2EB",
                    "#FF6384",
                  ],
                },
              ]}
            />
          </div>
          <div className="w-full flex-col flex  gap-2.5 flex-row lg:flex-row">
            <ReusableSunburstChart
              title="Stage 1 Pass"
              description="Performance breakdown"
              lightMode={true}
              labels={["100K", "150K", "200K", "250K", "300K", "350K"]}
              data={[
                {
                  values: [10, 15, 25, 30, 20, 10], // First ring
                  colors: [
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                  ],
                },
                {
                  values: [15, 10, 35, 25, 10, 5], // Second ring
                  colors: [
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                  ],
                },
                {
                  values: [20, 30, 10, 40, 15, 5], // Third ring
                  colors: [
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                  ],
                },
                {
                  values: [25, 15, 30, 35, 10, 20], // Fourth ring
                  colors: [
                    "#9966FF",
                    "#4BC0C0",
                    "#FF9F40",
                    "#FFCD56",
                    "#36A2EB",
                    "#FF6384",
                  ],
                },
              ]}
            />
            <ReusableSunburstChart
              title="Stage 1 Pass"
              description="Performance breakdown"
              lightMode={true}
              labels={["100K", "150K", "200K", "250K", "300K", "350K"]}
              data={[
                {
                  values: [10, 15, 25, 30, 20, 10], // First ring
                  colors: [
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                  ],
                },
                {
                  values: [15, 10, 35, 25, 10, 5], // Second ring
                  colors: [
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9966FF",
                  ],
                },
                {
                  values: [20, 30, 10, 40, 15, 5], // Third ring
                  colors: [
                    "#36A2EB",
                    "#9966FF",
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                  ],
                },
                {
                  values: [25, 15, 30, 35, 10, 20], // Fourth ring
                  colors: [
                    "#9966FF",
                    "#4BC0C0",
                    "#FF9F40",
                    "#FFCD56",
                    "#36A2EB",
                    "#FF6384",
                  ],
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
