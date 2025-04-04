import ReusableTable from "../reusableTable";
import { Card, CardHeader } from "../ui/card";

export default function OpenProfitData({ openProfitTableData }) {
  console.log(openProfitTableData, "openProfitTableData");


  const openProfitColumns = [
    {
      key: "challenge_name",
      name: "Product",
      align: "left",
      width: "w-[250px]",
    },
    {
      key: "plan_type",
      name: "Plan Type",
      align: "left",
      width: "w-[200px]",
    },
    {
      key: "account_size",
      name: "Account Size",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "total_profit",
      name: "Open Profit",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "total_accounts",
      name: "Total Accounts",
      align: "right",
      width: "w-[150px]",
    },
    {
      key: "day_name",
      name: "Day",
      align: "center",
      width: "w-[150px]",
    },
  ];


  return (
    <div className="h-full flex flex-col gap-5">
      <CardHeader className="p-0">
        <h3 className="font-extrabold text-xl">
          Open Profit on Active Qualified Accounts
        </h3>
      </CardHeader>
      <div>
        <ReusableTable
          serverSide={false}
          columns={openProfitColumns}
          data={openProfitTableData}
          showSelectAll={false} // No checkboxes needed for this table
          pageSize={10}
          totalItems={openProfitTableData?.length}
          currentPage={1}
          rowId="id"
        />
      </div>
    </div>
  );
}
