import { useEffect } from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';
import { DistributionGraph, Header, FlexBetween, OverviewGraph, MetricCard, Chloropleth } from '../../components';
import { overallDataStatistics, dataTransaction } from "../../data/faker.js";
import { saveAs } from 'file-saver';


// TODO:
// Change icons
// Fix pie chart label
const Dashboard = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery('(min-width: 1200px)');

    const columns = [
        { field: '_id', headerName: 'ID', flex: 0.9 },
        { field: 'userId', headerName: 'User ID', flex: 1 },
        { field: 'products', headerName: '# of Products', flex: 0.5, sortable: false, renderCell: (params) => params.value.length },
        { field: 'cost', headerName: 'Cost', flex: 0.5, renderCell: (params) => `$${Number(params.value).toFixed(2)}` },
    ];

    useEffect(() => {
        // console.log(`${overallDataStatistics[0].totalCustomers}`);
    }, []);

    const handleDownloadReports = () => {
        //  CSV files are stored in the data folder and named accordingly
        const fileNames = ['Administrative Metrics.csv','Overview Sales.png','Demographics.png','Overview Units.png', 'Daily Sales.png','Sales Distribution.png', 'Monthly Sales.png', 'Affiliate Metrics.csv', 'Customer Directory.csv', 'Transaction Ledger.csv'];

        // Loop through each file name and initiate download
        fileNames.forEach(fileName => {
            const filePath = `/data/${fileName}`; 
            fetch(filePath)
                .then(response => response.blob())
                .then(blob => saveAs(blob, fileName))
                .catch(error => console.error('Error downloading file:', error));
        });
    };

    return (
        <Box className="dashboard-box-parent">
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to our Dashboard" />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.alt,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '1rem 2rem',
                    }}
                    onClick={handleDownloadReports}
                >
                    <DownloadOutlined sx={{ marginRight: '1rem' }} />
                    Download Reports
                </Button>
            </FlexBetween>
            <Box className="dashboard-box-child-container" sx={{ '& > div': { gridColumn: isDesktop ? undefined : 'span 12' } }}>
                {/* Row 1 */}
                <MetricCard title="Customers" value={overallDataStatistics?.[0]?.totalCustomers} increase="-8%" description="Since last Month" icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />} />
                <MetricCard title="Daily Sales" value={overallDataStatistics?.[0]?.dailyData?.[199]?.totalSales} increase="+37%" description="Since Yesterday" icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />} />
                <Box className="dashboard-box-third-child" backgroundColor={theme.palette.background.alt}>
                    <OverviewGraph view="sales" isDashboard={true} />
                </Box>
                <MetricCard title="Monthly Sales" value={overallDataStatistics?.[0]?.monthlyData?.[6]?.totalSales} increase="+9%" description="Since last Month" icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />} />
                <MetricCard title="Yearly Sales" value={overallDataStatistics?.[0]?.yearlySalesTotal} increase="+42%" description="Since last Year" icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />} />

                {/* Row 2 */}
                <Box className="dashboard-box-sixth-child" sx={{ '& .MuiDataGrid-root': { border: 'none', borderRadius: '5rem' }, '& .MuiDataGrid-cell': { borderBottom: 'none' }, '& .MuiDataGrid-columnHeaders': { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderBottom: 'none' }, '& .MuiDataGrid-virtualScroller': { backgroundColor: theme.palette.background.alt }, '& .MuiDataGrid-footerContainer': { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: 'none' }, '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${theme.palette.secondary[200]} !important` } }}>
                    <Chloropleth />
                </Box>
                <Box className="dashboard-box-seventh-child" backgroundColor={theme.palette.background.alt}>
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>Sales by Category</Typography>
                    <DistributionGraph isDashboard={true} />
                    <Typography variant='p' sx={{ color: theme.palette.secondary[200] }}>Total Distribution of Sales Based on Category.</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
