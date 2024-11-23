import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    return (
        <div className="flex flex-col md:flex-row items-center bg-slate-50 dark:bg-primary rounded-lg">
            <div className="flex items-center border rounded-lg">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date ?? undefined)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-[110px] p-2 outline-none rounded-l-lg text-center bg-slate-50 text-primary dark:bg-primary dark:text-slate-100"
                    placeholderText="Start Date"
                />
                <span className="text-primary dark:text-slate-300">-</span>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date ?? undefined)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-[110px] p-2 outline-none rounded-r-lg text-center bg-slate-50 text-primary dark:bg-primary dark:text-slate-100"
                    placeholderText="End Date"
                />
            </div>

        </div>
    );
};

export default DateRangePicker;
