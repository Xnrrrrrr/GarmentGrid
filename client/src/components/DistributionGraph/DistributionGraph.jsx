import { Box, Typography, useTheme } from '@mui/material';
import { overallDataStatistics } from "../../data/faker.js";
import { ResponsivePie } from '@nivo/pie';

// DistributionGraph component displays a pie chart of product distro
//Props:
// -isDashboard boolean indicating whether the component is displayed on dashboard
const DistributionGraph = ({ isDashboard = false }) => {
    const theme = useTheme();

    // define color scheme for Overview
    const colorScheme = [
        theme.palette.secondary[800],
        theme.palette.secondary[800],
        theme.palette.secondary[500],
        theme.palette.secondary[500],
    ];

    // prepare data for pie chart
    const formedDataSet = Object.entries(overallDataStatistics[0].productDistribution).map(([category, sales], i) => ({
        id: category,
        label: category,
        value: sales,
        color: colorScheme[i],
    }));

    return (
        // Nivo boilerplate
        <Box
            height={isDashboard ? '400px' : '100%'}
            width="100%"
            position="relative"
        >
            <ResponsivePie
                data={formedDataSet}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[400],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[400],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[400],
                                strokeWidth: 1,
                            },

                            text: {
                                fill: theme.palette.secondary[400],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[400],
                        },
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
                colors={{ datum: 'data.color' }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={2}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['opacity', '0.3']],
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsSkipAngle={-5}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsOffset={-2}
                arcLinkLabelsDiagonalLength={18}
                arcLinkLabelsStraightLength={23}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsRadiusOffset={0.5}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', '2']],
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 85,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: theme.palette.primary[500],
                                },
                            },
                        ],
                    },
                ]}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={theme.palette.secondary[400]}
                textAlign="center"
                pointerEvents="none"
                sx={{
                    transform: isDashboard ? 'translate(-75%, -170%)' : 'translate(-50%, -100%)',
                }}
            >
                <Typography variant="h6">
                    {!isDashboard && 'Total:'} ${overallDataStatistics[0]?.yearlySalesTotal}
                </Typography>
            </Box>
        </Box>
    );
};

export default DistributionGraph;
