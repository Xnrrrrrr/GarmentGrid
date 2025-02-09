import { useMemo } from 'react';
import { Box, useTheme, CircularProgress } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { Header } from '../../components';
import { overallDataStatistics } from "../../data/faker.js";

// MonthlyAnalytics component displays a chart of monthly sales statistics.
const MonthlyAnalytics = () => {
    const theme = useTheme();

    // Memoized calculation of data for the chart

    const arrangedStats = useMemo(() => {
        if (!overallDataStatistics.length) return [];

        const { monthlyData } = overallDataStatistics[0];
        const totalSalesLine = {
            id: 'totalSales',
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine = {
            id: 'totalUnits',
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
            totalSalesLine.data.push({ x: month, y: totalSales });
            totalUnitsLine.data.push({ x: month, y: totalUnits });
        });

        return [totalSalesLine, totalUnitsLine];
    }, [overallDataStatistics, theme.palette.secondary]);

    return (
        <Box className="monthly-analytics-box-parent">
            <Header title="MONTHLY SALES" subtitle="Chart of Monthly Sales" />
            <Box className="monthly-analytics-box-child">
                {overallDataStatistics ? (
                    // Boilerplate from nivo
                    <ResponsiveLine
                        data={arrangedStats}
                        theme={getChartTheme(theme)}
                        colors={{ datum: 'color' }}
                        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: false,
                            reverse: false,
                        }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legend: 'Month',
                            legendOffset: 60,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Total',
                            legendOffset: -50,
                            legendPosition: 'middle',
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={4}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        enableArea={false}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: 50,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                ) : (
                    <CircularProgress />
                )}
            </Box>
        </Box>
    );
};

// Function to generate the chart theme based on the provided MUI theme.

const getChartTheme = (theme) => {
    return {
        axis: {
            domain: { line: { stroke: theme.palette.secondary[200] } },
            legend: { text: { fill: theme.palette.secondary[200] } },
            ticks: {
                line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
                text: { fill: theme.palette.secondary[200] },
            },
        },
        legends: { text: { fill: theme.palette.secondary[200] } },
        tooltip: { container: { color: theme.palette.primary.main } },
    };
};

export default MonthlyAnalytics;
