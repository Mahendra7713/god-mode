"use client";

import { useEffect, useState } from "react";
import AccountSizeFilter from "../accountFilter";
import PlanTypeFiler from "../planFilter"; // Note: Typo in "Filer" should be "Filter" if applicable
import DateRangeFilter from "../rangeFilter";
import ReusableD3BubbleChart from "../reusableBubbleChart";
// import "./style.scss";
import TextStatsCard from "../textStatCard";
import { Card, CardHeader } from "../ui/card";
import { apiFunc } from "@/lib/api";
import { format, subDays, subMonths } from "date-fns";
import { ForecastedPayoutChart } from "./forecastedPayoutChart";

export default function ForecastedPayout({ planOptions, planAndDetails }) {
  const [dates, setDates] = useState({
    from: subMonths(new Date(), 1),
    to: subDays(new Date(), 1),
  });
  const [accountSize, setAccountSize] = useState(null);
  const [plantype, setPlantype] = useState(null);
  const [revenueCards, setRevenueCards] = useState([]);
  const [actualPayouts, setActualPayouts] = useState([]);
  const [forecastedStats, setForecastedStats] = useState([]);
  const [forecastedChartData, setForecastedChartData] = useState({});

  const forecastedPayoutData = Object.entries(forecastedChartData).map(
    ([date, value]) => ({
      x: date,
      y: value?.predicted || 0,
      series: "50k",
    })
  );
  const uniqueDates = Object.keys(forecastedChartData);
  // console.log("uniqueDates", uniqueDates);
  // console.log("forecastedPayoutData", forecastedPayoutData);
  // console.log("forecastedChartData", forecastedChartData);
  const actualPayoutStats = {
    "Total Accounts": actualPayouts?.data?.data?.funded_accounts
      ? actualPayouts?.data?.funded_accounts
      : "-",
    "Requested Payouts": actualPayouts?.data?.requested_payouts
      ? `$${actualPayouts?.data?.requested_payouts.toLocaleString()}`
      : "-",
    "Average Payout Value": actualPayouts?.data?.avg_payout_value
      ? `$${actualPayouts?.data?.avg_payout_value.toFixed(2)}`
      : "-",
    "Payout Frequency / Account": actualPayouts?.data?.frequency
      ? actualPayouts?.data?.frequency
      : "-",
    "Actual Payouts Disbursed": actualPayouts?.data?.actual_payout_disbursed
      ? `$${actualPayouts?.data?.actual_payout_disbursed.toLocaleString()}`
      : "-",
  };

  const forecastedPayoutStats = {
    "Total Accounts": forecastedStats?.total_accounts
      ? Math.round(forecastedStats.total_accounts)
      : "-",
    "Requested Payouts": forecastedStats?.requested_payouts
      ? `$${forecastedStats.requested_payouts.toLocaleString()}`
      : "-",
    "Average Payout Value": forecastedStats?.average_payout_value
      ? `$${forecastedStats.average_payout_value.toFixed(2)}`
      : "-",
    "Payout Frequency / Account": forecastedStats?.payout_frequency
      ? `${forecastedStats.payout_frequency.toFixed(2)}`
      : "-",
    "Expected Liability": forecastedStats?.expected_liability
      ? `$${forecastedStats.expected_liability.toLocaleString()}`
      : "-",
  };

  const revenueStats = {
    Accounts: revenueCards?.data?.accounts ? revenueCards.data.accounts : "-",
    "Generated Revenue": revenueCards?.data?.generated_revenue
      ? `$${revenueCards.data.generated_revenue.toLocaleString()}.00`
      : "-",
    "Average Order Value": revenueCards?.data?.average_order_value
      ? `$${revenueCards.data.average_order_value.toFixed(2)}`
      : "-",
    "Stage 1 Pass Rates": revenueCards?.data?.accounts
      ? `${(
          (revenueCards.data.stage_1 / revenueCards.data.accounts) *
          100
        ).toFixed(2)}%`
      : "-",
    "Stage 2 Pass Rates": revenueCards?.data?.accounts
      ? `${(
          (revenueCards.data.stage_2 / revenueCards.data.accounts) *
          100
        ).toFixed(2)}%`
      : "-",
    "Stage 3 Pass Rates": revenueCards?.data?.accounts
      ? `${(
          (revenueCards.data.stage_3 / revenueCards.data.accounts) *
          100
        ).toFixed(2)}%`
      : "-",
    "Total % Funded From Gross Number Purchased": revenueCards?.data
      ?.funded_from_gross
      ? `${revenueCards.data.funded_from_gross.toFixed(2)}%`
      : "-",
  };

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
    let baseURL = `https://payout-forecast.alphacapitalgroup.uk/`;
    let query = getQuery();
    let url = `revenue_cards/${query}`;
    let method = "POST";
    let formatDate = "yyyy-MM-dd";
    let body = {
      start_date: format(dates?.from, formatDate),
      end_date: format(dates?.to, formatDate),
    };
    let successFunc = (data) => {
      // console.log("successFunc data : ", data);
      setRevenueCards(data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc, null, baseURL, true);
  }, [dates]);

  useEffect(() => {
    let baseURL = `https://payout-forecast.alphacapitalgroup.uk/`;
    let query = getQuery();
    let url = `actual_payouts_data/${query}`;
    let method = "POST";
    let formatDate = "yyyy-MM-dd";
    let body = {
      start_date: format(dates?.from, formatDate),
      end_date: format(dates?.to, formatDate),
    };
    let successFunc = (data) => {
      // console.log("successFunc data : ", data);
      setActualPayouts(data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc, null, baseURL, true);
  }, [dates]);

  useEffect(() => {
    let baseURL = `https://payout-forecast.alphacapitalgroup.uk/`;
    let query = getQuery();
    let url = `forecasted_data/${query}`;
    let method = "POST";
    let formatDate = "yyyy-MM-dd";
    let body = {
      start_date: format(dates?.from, formatDate),
      end_date: format(dates?.to, formatDate),
    };
    let successFunc = (data) => {
      setForecastedStats(data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc, null, baseURL, true);
  }, [dates]);

  useEffect(() => {
    let baseURL = `https://payout-forecast.alphacapitalgroup.uk/`;
    let query = getQuery();
    let url = `no_of_payouts/${query}`;
    let method = "POST";
    let formatDate = "yyyy-MM-dd";
    let body = {
      start_date: format(dates?.from, formatDate),
      end_date: format(dates?.to, formatDate),
    };
    let successFunc = (data) => {
      setForecastedChartData(data?.data);
    };
    let errorFunc = (error) => {
      console.log("errorFunc data : ", error);
    };
    apiFunc(url, method, body, successFunc, errorFunc, null, baseURL, true);
  }, [dates]);

  return (
    <Card className="p-5 flex flex-col gap-5">
      <CardHeader className="flex flex-col p-0">
        <div className="flex flex-col  items-start gap-2 justify-between xl:flex-row xl:items-center ">
          <h3 className="font-extrabold text-xl">Payout Forecasting</h3>
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
      <div className="container mx-auto space-y-6">
        <div className="">
          <TextStatsCard
            title="Revenue"
            stats={revenueStats}
            layout="col"
            cardLayout="row"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextStatsCard
            title="Actual Payout"
            stats={actualPayoutStats}
            layout="row"
            cardLayout="col"
          />{" "}
          <TextStatsCard
            title="Forecasted Payout"
            stats={forecastedPayoutStats}
            layout="row"
            cardLayout="col"
          />{" "}
        </div>
      </div>
      {/* <ReusableD3BubbleChart
        data={forecastedPayoutData}
        title="Forecasted No of Payout"
        description="By Month and Payout Amount"
        labels={uniqueDates}
        seriesColors={{
          "25K": "#FFB6C1", // Light pink
          "50K": "#ADD8E6", // Light blue
          "100K": "#98FB98", // Light green
          "125K": "#9ACD32", // Yellow-green
          "150K": "#FFA500", // Orange
          "200K": "#FF69B4", // Hot pink
        }} // Custom series colors
        config={{ yAxisMin: 0, yAxisMax: 2500 }}
        footerText="Showing forecasted payouts for 2024"
      /> */}
      <ForecastedPayoutChart chartData={forecastedChartData} />
    </Card>
  );
}


