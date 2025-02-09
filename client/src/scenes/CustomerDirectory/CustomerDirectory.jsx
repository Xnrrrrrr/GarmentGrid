import { useState } from 'react';
import { Box, useTheme, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Header, DataGridToolbar } from '../../components';
import { DataGrid } from '@mui/x-data-grid';
import { dataUser } from '../../data/faker.js';

const CustomerDirectory = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phoneNumber: '', country: '', role: '' });

    // Define columns for the DataGrid
    const columns = [
        { field: '_id', headerName: 'ID', flex: 0.9 },
        { field: 'name', headerName: 'Name', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.5,
            // Render cell with formatted phone number
            renderCell: (params) => formatPhoneNumber(params.value),
        },
        { field: 'country', headerName: 'Country', flex: 0.4 },
        { field: 'role', headerName: 'Role', flex: 0.2 },
    ];

    // Function to format phone number
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
    };

    // Handler for search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter rows based on search term
    const filteredRows = dataUser.filter((row) =>
        Object.values(row).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Open the dialog to add a new customer
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Close the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handle input change for the new customer form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    // Handle adding a new customer
    const handleAddCustomer = () => {
        // Add your logic to add the new customer to the data
        console.log('New customer added:', newCustomer);
        // Reset newCustomer state
        setNewCustomer({ name: '', email: '', phoneNumber: '', country: '', role: '' });
        // Close the dialog
        handleCloseDialog();
    };

    return (
        <Box className="customer-directory-box-parent">
            <Header title="CUSTOMER DIRECTORY" subtitle="List of Customers" />
            <Box className="customer-directory-box-child">
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Add Customer
                </Button>
            </Box>
            <DataGridContainer
                filteredRows={filteredRows}
                columns={columns}
                theme={theme}
            />
            {/* Add Customer Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    {/* Add form fields for new customer details */}
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCustomer.name}
                        onChange={handleInputChange}
                    />
                    {/* Add other form fields for email, phone number, country, role */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddCustomer} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

// Component to contain the DataGrid with styles
const DataGridContainer = ({ filteredRows, columns, theme }) => {
    return (
        <Box
            height="calc(80vh - 88px)"
            sx={{
                '& .MuiDataGrid-root': { border: 'none' },
                '& .MuiDataGrid-cell': { borderBottom: 'none' },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: theme.palette.primary.light,
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: 'none',
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${theme.palette.secondary[200]} !important`,
                },
            }}
        >
            <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row._id}
                components={{ Toolbar: DataGridToolbar }}
            />
        </Box>
    );
};

export default CustomerDirectory;