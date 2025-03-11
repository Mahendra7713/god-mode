// Dashboard.jsx (just confirming)
"use client";
import DailyStats from "@/components/dashboard-components/dailyStats";
import ForecastedPayout from "@/components/dashboard-components/forecastedPayout";
import OpenProfitData from "@/components/dashboard-components/openProfit";
import PassRates from "@/components/dashboard-components/passRatesComp";
import Payout from "@/components/dashboard-components/payoutComp";
import RevenueSales from "@/components/dashboard-components/revenueSalesComp";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 px-10 py-7 h-full w-full max-w-[1600px] m-auto">
      <div id="pass-rates">
        <PassRates />
      </div>
      <div id="revenue-sales">
        <RevenueSales />
      </div>
      <div id="payout">
        <Payout />
      </div>
      {/* <div id="open-profit">
        <OpenProfitData />
      </div> */}
      <div id="forecasted-payout">
        <ForecastedPayout />
      </div>
      <div id="daily-stats">
        <DailyStats />
      </div>
    </div>
  );
}
