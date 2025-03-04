import ReusableTable from "../reusableTable";
import { Card, CardHeader } from "../ui/card";

export default function OpenProfitData() {
  const openProfitData = [
    {
      id: 1,
      product: "Alpha Pro - 2 Step - 100K",
      fundedAccount: 58,
      openProfit: "$23,257.32",
    },
    {
      id: 2,
      product: "Alpha Pro - 2 Step - 200K",
      fundedAccount: 120,
      openProfit: "$5,684.02",
    },
    {
      id: 3,
      product: "Alpha Pro - 2 Step - 200K",
      fundedAccount: 49,
      openProfit: "$23,257.32",
    },
    {
      id: 4,
      product: "Alpha Pro - 2 Step - 150K",
      fundedAccount: 36,
      openProfit: "$52,587.32",
    },
    {
      id: 5,
      product: "Alpha Pro - 2 Step - 200K",
      fundedAccount: 58,
      openProfit: "$23,257.32",
    },
    {
      id: 6,
      product: "Alpha Pro - 2 Step - 100K",
      fundedAccount: 120,
      openProfit: "$23,257.32",
    },
    {
      id: 7,
      product: "Alpha Pro - 2 Step - 150K",
      fundedAccount: 40,
      openProfit: "$5,684.02",
    },
    {
      id: 8,
      product: "Alpha One - 1 Step - 100K",
      fundedAccount: 75,
      openProfit: "$15,890.12",
    },
    {
      id: 9,
      product: "Alpha Three - 3 Step - 200K",
      fundedAccount: 92,
      openProfit: "$38,456.78",
    },
    {
      id: 10,
      product: "Alpha Swing - 2 Step - 150K",
      fundedAccount: 63,
      openProfit: "$19,123.45",
    },
    // Additional dummy data to reach 85 total items (showing only 10 here for brevity)
    {
      id: 11,
      product: "Alpha Pro - 2 Step - 200K",
      fundedAccount: 45,
      openProfit: "$28,901.23",
    },
    {
      id: 12,
      product: "Alpha Pro - 2 Step - 100K",
      fundedAccount: 82,
      openProfit: "$17,654.89",
    },
    {
      id: 13,
      product: "Alpha One - 1 Step - 150K",
      fundedAccount: 67,
      openProfit: "$34,782.15",
    },
    {
      id: 14,
      product: "Alpha Three - 3 Step - 100K",
      fundedAccount: 55,
      openProfit: "$12,345.67",
    },
    {
      id: 15,
      product: "Alpha Swing - 2 Step - 200K",
      fundedAccount: 98,
      openProfit: "$41,234.56",
    },
  ];

  const openProfitColumns = [
    {
      key: "product",
      name: "Product",
      align: "left",
      width: "w-[300px]", // Wider width to accommodate longer product names
    },
    {
      key: "fundedAccount",
      name: "Funded Account",
      align: "right",
      width: "w-[150px]", // Width to match the numeric alignment in the image
    },
    {
      key: "openProfit",
      name: "Open Profit",
      align: "right",
      width: "w-[150px]", // Width to match the currency alignment in the image
    },
  ];

  return (
    <Card className="h-full p-5 flex flex-col gap-5">
      <CardHeader className="p-0">
        <h3 className="">Open Profit on Active Qualified Accounts</h3>
      </CardHeader>
      <div>
        <ReusableTable
          serverSide={false}
          columns={openProfitColumns}
          data={openProfitData}
          showSelectAll={false} // No checkboxes needed for this table
          pageSize={10}
          totalItems={openProfitData.length}
          currentPage={1}
          rowId="id"
        />
      </div>
    </Card>
  );
}
