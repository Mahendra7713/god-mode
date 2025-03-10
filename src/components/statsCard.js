import { Card } from "@/components/ui/card";
import Image from "next/image";

function StatsCard({ data, layout }) {
  return (
    <>
      {data?.map((item, index) => (
        <Card
          key={index}
          className="flex items-center flex-row p-4 space-x-4 w-full"
        >
          <div className="flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title || `Stat Icon ${index + 1}`}
              width={50} // Adjust width as needed
              height={50} // Adjust height as needed
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h5 className=" text-base font-medium">{item.title}</h5>
            <p
              className="font-semibold text-xl
"
            >
              {item.value}
            </p>
          </div>
        </Card>
      ))}
    </>
  );
}

export default StatsCard;
