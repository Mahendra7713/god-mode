// Dashboard.jsx (just confirming)
"use client";
import DailyStats from "@/components/dashboard-components/dailyStats";
import ForecastedPayout from "@/components/dashboard-components/forecastedPayout";
import OpenProfitData from "@/components/dashboard-components/openProfit";
import PassRates from "@/components/dashboard-components/passRatesComp";
import Payout from "@/components/dashboard-components/payoutComp";
import RevenueSales from "@/components/dashboard-components/revenueSalesComp";
import usePlansData from "../../../components/reusableComponents/Plantype"

export default function Dashboard() {
  const [isLoading, planAndDetails] = usePlansData();

  const planOptions = planAndDetails ?  Object.keys(planAndDetails)?.map(item=>({
    value: item,
    name: item
  })) : [];

  return (
    <div className="flex flex-col gap-5 px-10 py-7 h-full w-full max-w-[1600px] m-auto">
      <div id="pass-rates">
        <PassRates isLoading={isLoading} planOptions={planOptions} planAndDetails={planAndDetails}  />
      </div>
      <div id="revenue-sales">
        <RevenueSales isLoading={isLoading} planOptions={planOptions} planAndDetails={planAndDetails} />
      </div>
      <div id="payout">
        <Payout isLoading={isLoading} planOptions={planOptions} planAndDetails={planAndDetails} />
      </div>
      {/* <div id="open-profit">
        <OpenProfitData />
      </div> */}
      <div id="forecasted-payout">
        <ForecastedPayout isLoading={isLoading} planOptions={planOptions} planAndDetails={planAndDetails} />
      </div>
      <div id="daily-stats">
        <DailyStats isLoading={isLoading} planOptions={planOptions} planAndDetails={planAndDetails} />
      </div>
    </div>
  );
}
