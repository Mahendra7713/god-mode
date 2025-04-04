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

export default function DatePickerWithRange({dates, setDates}) {

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
                {dates?.from ? format(dates.from, "LLL dd, y") : "Start Date"}
              </span>
              <span className="mx-2">→</span>
              <span>
                {dates?.to ? format(dates.to, "LLL dd, y") : "End Date"}
              </span>
              <CalendarIcon className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from || new Date()}
            selected={dates}
            onSelect={(newDate) => {
              console.log("newDate : ",newDate)
              setDates({
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
