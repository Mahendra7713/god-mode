"use client";

import ReusableBarChart from "../reusableBarChart";
import { Card } from "../ui/card";

export default function DailyStats() {
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
  return (
    <Card>
      <ReusableBarChart
        data={payoutsApprovedData}
        title="Total Payouts Approved"
        description="By Product and Payout Amount"
        config={payoutsApprovedConfig}
        footerText="Showing total payouts approved for each product step"
      />
    </Card>
  );
}
