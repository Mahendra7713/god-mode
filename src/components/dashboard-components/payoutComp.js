"use client";
import { useEffect, useState } from "react";
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
import { apiFunc } from "@/lib/api";
import { format, subDays, subMonths } from "date-fns";
export default function Payout({ planOptions, planAndDetails }) {
  const [dates, setDates] = useState({
    from: subMonths(new Date(), 1),
    to: subDays(new Date(), 1),
  });
  const [accountSize, setAccountSize] = useState(null);
  const [plantype, setPlantype] = useState(null);
  const [openProfitTable, setOpenProfitTable] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [payoutStats, setPayoutStats] = useState(null);

  function getQuery() {
    let query;
    if (dates) {
      let formatDate = "yyyy-MM-dd";
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
      console.log("I am here");
      let method = "GET";
      let query = getQuery();
      let url = `total/payment-request/${query}`;
      let successFunc = (data) => {
        // console.log("successFunc data : ", data);
        setPayoutStats(data);
      };
      let errorFunc = (error) => {
        console.log("errorFunc data : ", error);
      };
      apiFunc(url, method, null, successFunc, errorFunc);
    // }
  }, [dates, plantype, accountSize, planAndDetails]);

  useEffect(() => {
    if (planAndDetails) {
      console.log("I am here");
      let method = "GET";
      let query = getQuery();
      let url = `get/payouts/plan-wise/`;
      let successFunc = (data) => {
        console.log("successFunc data : ", data);
      };
      let errorFunc = (error) => {
        console.log("errorFunc data : ", error);
      };
      apiFunc(url, method, null, successFunc, errorFunc);
    }
  }, [dates, plantype, accountSize, planAndDetails]);

  const payoutsColumns = [
    {
      key: "plan_type",
      name: "Plan Type",
      align: "left",
      width: "w-[200px]",
    },
    {
      key: "payout_count",
      name: "Payout Count",
      align: "right",
      width: "w-[120px]",
    },
    {
      key: "payout_amount",
      name: "Payout Amount",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "payment_count",
      name: "Payment Count",
      align: "right",
      width: "w-[120px]",
    },
    {
      key: "payment_amount",
      name: "Payment Amount",
      align: "right",
      width: "w-[150px]",
    },
  ];

  console.log("payoutStats", payoutStats);
  const payoutTotal = payoutStats?.result?.reduce(
    (acc, curr) => {
      acc.amount_of_payout_requested += curr.amount_of_payout_requested || 0;
      acc.amount_of_payout_approved += curr.amount_of_payout_approved || 0;
      acc.number_of_payouts_requested += curr.number_of_payouts_requested || 0;
      acc.number_of_payouts_approved += curr.number_of_payouts_approved || 0;
      return acc;
    },
    {
      amount_of_payout_requested: 0,
      amount_of_payout_approved: 0,
      number_of_payouts_requested: 0,
      number_of_payouts_approved: 0,
    }
  );

  const payoutStatsData = [
    {
      title: "Total Amount Requested",
      value: `$${payoutTotal?.amount_of_payout_requested?.toFixed(2)}` ?? "-",
      image: icon3,
    },
    {
      title: "Total Amount Paid",
      value: `$${payoutTotal?.amount_of_payout_approved?.toFixed(2)}` ?? "-",
      image: icon2,
    },
    {
      title: "No. Of Payout Requests",
      value: payoutTotal?.number_of_payouts_requested ?? "-",
      image: icon4,
    },
    {
      title: "No. Of Approved Request",
      value: payoutTotal?.number_of_payouts_approved ?? "-",
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

  useEffect(() => {
    let url = `get/payouts/plan-wise/`;
    let method = "GET";
    let body = {};
    let successFunc = (data) => {
      console.log("successFunc data : ", data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc);
  }, []);

  useEffect(() => {
    let query = getQuery();
    let url = `revenue/open-profit/table/${query}`;
    let method = "GET";
    let body = {};
    let successFunc = (data) => {
      setOpenProfitTable(data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc);
  }, []);
  return (
    <Card className="flex flex-col gap-5 p-5">
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Payouts</h3>{" "}
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
        <OpenProfitData openProfitTableData={openProfitTable} />
      </div>
    </Card>
  );
}
