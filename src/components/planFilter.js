import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function PlanTypeFiler({ data, setPlantype }) {

  function handleValueChange(value) {
    console.log("value :", value);
    setPlantype(value);
  }

  
  return (
    <div className="flex flex-row items-center gap-2.5">
      <Label
        className="text-base font-semibold text-nowrap
"
      >
        Plan Type
      </Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Plan Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
