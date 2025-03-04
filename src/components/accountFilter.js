import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AccountSizeFilter({ data }) {
  return (
    <div className="flex flex-row items-center gap-2.5">
      <Label>Account Size</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Account Size" />
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
