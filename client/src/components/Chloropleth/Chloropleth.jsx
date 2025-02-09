import { useState, useEffect } from 'react'
import { ResponsiveChoropleth } from '@nivo/geo';
import { getISO3FromISO2 } from '../../scenes/Demographics/convertISO.js';
import { useTheme } from '@mui/material';
import { geoSpatialStats } from '../../data/geoData.js';
import { dataUser } from '../../data/faker.js';

const Chloropleth = () => {
    const theme = useTheme();
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        // Aggregate user data by country to count the number of users in each country
        const countryCounts = dataUser.reduce((acc, user) => {
            const countryISO3 = getISO3FromISO2(user.country); // Function to convert ISO 3166-1 alpha-2 to alpha-3
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        // Format data for choropleth
        const arrangedStats = Object.entries(countryCounts).map(([countryCode, count]) => ({
            id: countryCode, // ISO 3166-1 alpha-3 country code
            value: count,
        }));

        setCountryData(arrangedStats);
    }, []);

    return <ResponsiveChoropleth
            data={countryData}
            theme={{
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
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: 'black',
                    },
                },
            }}
            features={geoSpatialStats.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={0.5}
            borderColor="#000"
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: -125,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: theme.palette.secondary[200],
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor:
                                    theme.palette.background.alt,
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
}

export default Chloropleth;