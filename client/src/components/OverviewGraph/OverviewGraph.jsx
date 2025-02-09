import { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { overallDataStatistics } from "../../data/faker.js";

// Overview component renders a line chart displaying overall data statistics.
// Props:
//   - isDashboard: boolean indicating whether the chart is rendered in a dashboard view
//   - view: string representing the data view ('sales' or 'units')
const OverviewGraph = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    
    // Memoized calculation of arrangedStats to optimize performance
    const arrangedStats = useMemo(() => {
        if (!overallDataStatistics.length) return [];
        // Determine trace color based on view
        const traceColor = view === 'sales' ? 500 : 600;
        // Determine total sales or units based on view
        const totalSalesAndUnits = view === 'sales' ? 'totalSales' : 'totalUnits';

         // Prepare data for the chart
        return [
            {
                id: totalSalesAndUnits,
                color: theme.palette.secondary[traceColor],
                data: Object.entries(overallDataStatistics[0].monthlyData).map(([month, data]) => ({
                    x: isDashboard ? month.slice(0, 3) : month,
                    y: data[totalSalesAndUnits],
                })),
            },
        ];
    }, [overallDataStatistics, theme.palette.secondary, view, isDashboard]);
    // Return message if data is not available
    if (!overallDataStatistics.length) return 'Data not available';

    return (
        // boilerplate from nivo 
        //Render the line chart using ResponsiveLine from nivo
        <ResponsiveLine
            data={arrangedStats}
            theme={getChartTheme(theme)}
            colors={{ datum: 'color' }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            areaBaselineValue={isDashboard ? 40 : 0}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => v,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? '' : 'Month',
                legendOffset: 36,
                legendPosition: 'middle',
                tickValues: 'every 1 month',
                tickTextColor: theme.palette.text.primary,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? '' : `Total ${view === 'sales' ? 'Revenue' : 'Units'} for Year`,
                legendOffset: -60,
                legendPosition: 'middle',
                tickTextColor: theme.palette.text.primary,
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard
                    ? [
                          {
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: true,
                              translateX: 0,
                              translateY: -40,
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
                      ]
                    : undefined
            }
        />
    );
};

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

export default OverviewGraph;
