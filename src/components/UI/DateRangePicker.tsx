import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type DateRangeProps = {
    dateRange: any,
    setDateRange: any
}
const DateRangePicker = ({ dateRange, setDateRange }: DateRangeProps) => {

    return (
        <div className="flex flex-col md:flex-row items-center bg-slate-50 dark:bg-primary rounded-lg">
            <div className="flex items-center border rounded-lg">
                <DatePicker
                    selected={dateRange[0]}
                    onChange={(date) => {
                        setDateRange([date, dateRange[1]])
                    }}
                    selectsStart
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    maxDate={dateRange[1]}
                    className="w-[110px] p-2 outline-none rounded-l-lg text-center bg-slate-50 text-primary dark:bg-primary dark:text-slate-100"
                    placeholderText="Start Date"
                />
                <span className="text-primary dark:text-slate-300">-</span>
                <DatePicker
                    selected={dateRange[1]}
                    onChange={(date) => {
                        setDateRange([dateRange[0], date])
                    }}
                    selectsEnd
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    minDate={dateRange[0]}
                    className="w-[110px] p-2 outline-none rounded-r-lg text-center bg-slate-50 text-primary dark:bg-primary dark:text-slate-100"
                    placeholderText="End Date"
                />
            </div>

        </div>
    );
};

export default DateRangePicker;
