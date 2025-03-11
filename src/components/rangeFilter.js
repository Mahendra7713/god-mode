"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePickerWithRange() {
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[300px] justify-between text-left font-normal"
          >
            <div className="flex items-center w-full justify-between">
              <span>
                {date?.from ? format(date.from, "LLL dd, y") : "Start Date"}
              </span>
              <span className="mx-2">→</span>
              <span>
                {date?.to ? format(date.to, "LLL dd, y") : "End Date"}
              </span>
              <CalendarIcon className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={(newDate) => {
              setDate({
                from: newDate?.from || undefined,
                to: newDate?.to || undefined,
              });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
