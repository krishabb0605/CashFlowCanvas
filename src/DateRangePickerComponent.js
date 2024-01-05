import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const DateRangePickerComponent = () => {
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection', // Helps react-date-range identify this date range picker
    });

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection);
    };

    return (
        <div>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelect}
            />
        </div>
    );
};
export default DateRangePickerComponent