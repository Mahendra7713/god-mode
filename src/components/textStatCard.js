"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path as needed

export default function StatsCard({
  title,
  stats, // Object with key-value pairs for stats (e.g., { "Accounts": 2000, "Generated Revenue": "$254,324.00" })
  image, // Optional image prop for the profile icon (e.g., for Revenue card)
  layout = "row", // Optional prop to specify layout ("row" or "col"), defaults to "row"
  className = "", // Optional custom class for styling
  cardLayout = "row",
}) {
  return (
    <Card
      className={`w-full bg-white text-black border-gray-200 shadow-md ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={`${
          cardLayout === "row" ? "flex justify-between " : "flex flex-col gap-2"
        }`}
      >
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className={`${
              layout === "col"
                ? "flex flex-col items-start gap-1 p-5"
                : "flex justify-between items-center "
            }`}
          >
            <span className="text-sm font-medium text-gray-600 capitalize">
              {key.toLowerCase()}
            </span>
            <span className="text-lg font-bold text-black">{value}</span>
          </div>
        ))}
        {image && (
          <div className="absolute bottom-2 right-2">
            <img src={image} alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
