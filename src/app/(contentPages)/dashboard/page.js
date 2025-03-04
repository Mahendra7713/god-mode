import DailyStats from "@/components/dashboard-components/dailyStats";
import ForecastedPayout from "@/components/dashboard-components/forecastedPayout";
import OpenProfitData from "@/components/dashboard-components/openProfit";
import PassRates from "@/components/dashboard-components/passRatesComp";
import Payout from "@/components/dashboard-components/payoutComp";
import RevenueSales from "@/components/dashboard-components/revenueSalesComp";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 px-10 py-7 h-full max-w-screen-xl">
      <PassRates />
      <RevenueSales />
      <Payout />
      <OpenProfitData />
      <ForecastedPayout />
      <DailyStats />
    </div>
  );
}
