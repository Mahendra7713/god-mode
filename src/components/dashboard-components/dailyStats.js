"use client";

import { apiFunc } from "@/lib/api";
import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter";
import DateRangeFilter from "../rangeFilter";
import ReusableBarChart from "../reusableBarChart";
import ReusableTable from "../reusableTable";
import { Card, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DailyStats({ isLoading, planOptions, planAndDetails }) {
  const [dates, setDates] = useState({ from: new Date(), to: new Date() });
  const [accountSize, setAccountSize] = useState(null);
  const [plantype, setPlantype] = useState(null);
  const [dailyStatsDetails, setDailyStatsDetails] = useState([]);

  function getQuery() {
    let query;
    if (dates) {
      let formatDate = "dd/MMM/yyyy";
      query = `?start_date=${format(dates?.from, formatDate)}&end_date=${format(
        dates?.to,
        formatDate
      )}`;
    }
    if (plantype) {
      query += `&plan_type=${plantype}`;
    }
    if (accountSize) {
      query += `&account_size=${accountSize}`;
    }
    return query;
  }

  useEffect(() => {
    // if (planAndDetails) {
    let query = getQuery();
    let method = "GET";
    let body = {};
    let url = `daily-stats/${query}`;
    let successFunc = (data) => {
      setDailyStatsDetails(data?.data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc, null);
    // }
  }, [dates, plantype, accountSize, planAndDetails]);

  const groupedDailyStats = {};

  dailyStatsDetails?.forEach((item) => {
    const plan = item?.plan_type;

    console.log(plan, "plan");

    if (!groupedDailyStats[plan]) {
      groupedDailyStats[plan] = {
        plan,
        approved: 0,
        requested: 0,
      };
    }
    groupedDailyStats[plan].approved += item?.total_approved_payout_count || 0;
    groupedDailyStats[plan].requested +=
      item?.total_requested_payout_count || 0;
  });

  const payoutsApprovedData = Object.values(groupedDailyStats);

  console.log("groupedDailyStats", groupedDailyStats);
  // console.log("payoutsApprovedData", payoutsApprovedData);

  // const payoutsApprovedData = [
  //   {
  //     plan: "1 Step (Alpha One)",
  //     approved: 5,
  //   },
  //   {
  //     plan: "2 Step (Alpha Pro)",
  //     approved: 10,
  //   },
  //   {
  //     step: "2 Step (Swing)",
  //     approved: 0,
  //   },
  //   {
  //     step: "3 Step (Alpha Three)",
  //     approved: 3,
  //   },
  // ];

  const payoutsApprovedConfig = {
    xAxis: "plan",
    // yAxis: "approved",
    series: [
      { label: "Approved", color: "#FFD700", dataKey: "approved" }, // Yellow
      { label: "Requested", color: "#FFA500", dataKey: "requested" }, // Orange
      // { label: "40K", color: "#FF4500", dataKey: "40K" }, // Red
      // { label: "50K", color: "#9370DB", dataKey: "50K" }, // Purple
      // { label: "60K", color: "#4682B4", dataKey: "60K" }, // Blue
      // { label: "70K", color: "#90EE90", dataKey: "70K" }, // Green
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
            <PlanTypeFiler data={planOptions} setPlantype={setPlantype} />
            <AccountSizeFilter
              data={plantype ? planAndDetails?.[plantype] : []}
              setAccountSize={setAccountSize}
            />
            <DateRangeFilter dates={dates} setDates={setDates} />
          </div>
        </div>
      </CardHeader>
      <div className="flex flex-row flex-wrap items-center justify-between gap-5 xl:flex-nowrap">
        <ReusableBarChart
          data={payoutsApprovedData}
          title="Total Payouts Approved"
          description="By Product and Payout Amount"
          config={{
            xAxis: "plan",
            series: [
              { label: "Approved", color: "#FFD700", dataKey: "approved" },
            ],
            domain: [0, 300],
            ticks: [0, 50, 100, 150, 200, 250, 300],
            tickFormatter: (value) => value,
          }}
          footerText="Showing total payouts approved for each product step"
        />

        <ReusableBarChart
          data={payoutsApprovedData}
          title="Payout Request"
          description="By Product and Payout Amount"
          config={{
            xAxis: "plan",
            series: [
              { label: "Requested", color: "#FF4500", dataKey: "requested" },
            ],
            domain: [0, 300],
            ticks: [0, 50, 100, 150, 200, 250, 300],
            tickFormatter: (value) => value,
          }}
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
