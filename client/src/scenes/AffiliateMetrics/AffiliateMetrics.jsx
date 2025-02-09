import { useState } from 'react';
import { Box, useTheme, Toolbar, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridColumnMenu, DataGridToolbar, Header } from '../../components'; // Import DataGridToolbar and Header
import { dataTransaction } from '../../data/faker.js';

const AffiliateMetrics = () => {
    const theme = useTheme();

    // values to manage searchTerming
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = dataTransaction.filter((row) =>
        Object.values(row).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Define columns for the DataGrid
    const columns = [
        { field: '_id', headerName: 'ID', flex: 1.2 },
        { field: 'userId', headerName: 'User ID', flex: 1.5 },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 1,
            sortable: false,
            renderCell: params => params.value.length,
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 0.4,
            renderCell: params => `$${Number(params.value).toFixed(2)}`,
        },
    ];

    return (
        <Box className="affiliate-metrics-box-parent">
            <Header title="AFFILIATE METRICS" subtitle="Affiliate Sales Tracking" />
            <Box marginTop="20px" height="calc(80vh - 88px)" sx={styles.dataGridContainer}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <DataGrid
                    rows={filteredRows || []}
                    columns={columns}
                    getRowId={row => row._id}
                    components={{
                        ColumnMenu: DataGridColumnMenu,
                        Toolbar: DataGridToolbar // Add DataGridToolbar component
                    }}
                    toolbarComponents={[
                        'columns', // Enable Columns option
                        'density', // Enable Density option
                        'export', // Enable Export option
                    ]}
                />
            </Box>
        </Box>
    );
};

// Define styles for the DataGrid container
const styles = {
    dataGridContainer: {
        '& .MuiDataGrid-root': { border: 'none' },
        '& .MuiDataGrid-cell': { borderBottom: 'none' },
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme => theme.palette.background.alt,
            color: theme => theme.palette.secondary[100],
            borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme => theme.palette.primary.light,
        },
        '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme => theme.palette.background.alt,
            color: theme => theme.palette.secondary[100],
            borderTop: 'none',
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: theme => `${theme.palette.secondary[200]} !important`,
        },
    },
};

export default AffiliateMetrics;
