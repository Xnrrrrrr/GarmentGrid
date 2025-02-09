import { useState, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import DatePicker from 'react-datepicker';
import { Header } from '../../components';
import { overallDataStatistics } from "../../data/faker.js";

//TODO:
// Add some type of nice grey looking button around calendar 
const DailyAnalytics = () => {
    const theme = useTheme();
    
    // State for start and end date of the date picker
    const [startDate, setStartDate] = useState(new Date('2023-01-01'));
    const [endDate, setEndDate] = useState(new Date('2023-01-29'));

    // Memoized computed value for the arranged statistics based on selected date range
    const arrangedStats = useMemo(() => {
        const { dailyData } = overallDataStatistics[0];
        const totalSalesPoint = { id: 'totalSales', color: theme.palette.secondary.main,data: [] };
        const totalUnitsPoint = { id: 'totalUnits', color: theme.palette.secondary[600], data: [] };

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date);
            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = date.substring(date.indexOf('-') + 1);

                totalSalesPoint.data.push({ x: splitDate, y: totalSales });
                totalUnitsPoint.data.push({ x: splitDate, y: totalUnits });
            }
        });

        return [totalSalesPoint, totalUnitsPoint];
    }, [overallDataStatistics, startDate, endDate]);

    return (
        <Box className="daily-analytics-box-parent">
            <Header title="DAILY SALES" subtitle="Chart of Daily Sales" />
            <DatePickerSection
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <ChartSection arrangedStats={arrangedStats} theme={theme} />
        </Box>
    );
};

// Component for the date picker section
const DatePickerSection = ({ startDate, setStartDate, endDate, setEndDate }) => {
    return (
        <Box className="daily-analytics-date-picker-box-parent">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </Box>
    );
};

// Component for the chart section
const ChartSection = ({ arrangedStats, theme }) => {
    return (
        <Box className="daily-analytics-chart-section-box-parent">
            <ResponsiveLine
                data={arrangedStats}
                theme={getChartTheme(theme)}
                margin={{ top: 20, right: 30, bottom: 70, left: 70 }}
                axisBottom={{
                    format: (value) => value.split('-')[1], // Display only month
                    legend: 'Date',
                    legendPosition: 'middle',
                    legendOffset: 50,
                }}
                axisLeft={{
                    format: (value) => value, // Display dates on y-axis
                    legend: 'Sales',
                    legendPosition: 'middle',
                    legendOffset: -50,
                }}
                enableGridX={false} // Remove grid on x-axis
                enableGridY={false} // Remove grid on y-axis
                enablePointLabel={true} // Enable point labels
                pointLabel="y" // Display y-value as label on hover
                pointSize={8} // Increase point size
                pointBorderWidth={2} // Increase point border width
                enableSlices={false} // Disable mouse follow functionality
                crosshairType="none" // Remove crosshair
            />
        </Box>
    );
};


// Function to get custom chart theme
const getChartTheme = (theme) => {
    return {
        axis: {
            domain: {
                line: {
                    stroke: theme.palette.secondary[200],
                },
            },
            legend: {
                text: {
                    fill: theme.palette.secondary[200],
                },
            },
            ticks: {
                line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                },
                text: {
                    fill: theme.palette.secondary[200],
                },
            },
        },
    };
};

export default DailyAnalytics;
