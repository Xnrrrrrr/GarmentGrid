import { useState } from 'react';
import { Box, useTheme, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridColumnMenu, DataGridToolbar, Header } from '../../components';
import { dataUser } from '../../data/faker.js';

//TODO:
// Fix spacing/ padding on data Options under search
// Fix search functionality on search bar
const Administrators = () => {
    const theme = useTheme();

    // values to manage searchTerming
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Define columns for the DataGrid
    const columns = [
        { field: '_id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 0.5 },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.5,
            renderCell: (params) => formatPhoneNumber(params.value),
        },
        { field: 'city', headerName: 'City', flex: 0.5 },
        { field: 'country', headerName: 'Country', flex: 0.4 },
        { field: 'role', headerName: 'Role', flex: 0.3 },
    ];

    // Filter out only the admins from dataUser
    const admins = dataUser.filter(user => user.role === 'admin');

    // Function to format phone number
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
    };

    return (
        <Box component="div" className='administrators-box-parent'>
            <Header title="ADMINISTRATORS" subtitle="List of Administrators" />
            <Box component="div" marginTop="20px" height="calc(80vh - 88px)" sx={styles.dataGridContainer}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    sx={{ marginBottom: '10px' }}
                />
                <DataGrid
                    rows={admins || []}
                    columns={columns}
                    getRowId={row => row._id}
                    components={{
                        ColumnMenu: DataGridColumnMenu,
                        Toolbar: CustomToolbar // Add CustomToolbar component
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

// CustomToolbar component to integrate DataGridToolbar with additional search functionality
const CustomToolbar = () => {
    return (
        <Box className="administrators-custom-toolbar-parent">
            <DataGridToolbar />
        </Box>
    );
};

export default Administrators;
