import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme, Box, TextField } from '@mui/material';
import { DataGridToolbar, Header } from '../../components';
import { dataTransaction } from '../../data/faker.js';

// TODO: 
// Fix rows per page on transaction ledger
const TransactionLedger = () => {
    const theme = useTheme();

    // values to manage pagination, sorting, and searchTerming
    const [page, setPage] = useState(0);
    const [pageRowCount, setpageRowCount] = useState(20);
    //const [sortModel, setSortModel] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    useEffect(() => {
        console.log('searchTerm value:', searchTerm); // Add this line to see the value of searchTerm
    }, [searchTerm]);

    const handlesearchTermChange = (event) => {
        setsearchTerm(event.target.value);
    };

    const filteredRows = dataTransaction.filter((row) =>
        Object.values(row).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Apply sorting based on sortModel
    // const sortedData = [...dataTransaction].sort((a, b) => {
    //     if (sortModel.length === 0) return 0;

    //     const sortField = sortModel[0].field;
    //     const sortDirection = sortModel[0].sort;

    //     if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    //     if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    //     return 0;
    // });

    //Apply filtering
    // const filteredData = sortedData.filter(transaction =>
    //     transaction.userId.toLowerCase().includes(searchTerm?.toLowerCase() ?? '')
    // );

    // Calculate the start and end index of the current page
    const startIdx = page * pageRowCount;
    const endIdx = Math.min(startIdx + pageRowCount, filteredRows.length);

    // Extract the data for the current page
    const currentPageData = filteredRows.slice(startIdx, endIdx);

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 0.9,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length,
        },
        {
            // set as a string instead of number so wont work properly
            field: 'cost',
            headerName: 'Cost',
            flex: 0.5,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ];
    return (
        <Box className="transaction-ledger-box-parent">
            <Header title="TRANSACTION LEDGER" subtitle="List of Transactions" />
            <Box
                className="transaction-ledger-box-child"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
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
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handlesearchTermChange}
                />
                <DataGrid
                    rows={currentPageData || []}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowCount={filteredRows.length}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageRowCount={pageRowCount}
                    paginationMode="server" // app breaks if switched to client
                    sortingMode="server" // app breaks if switched to client
                    onPageChange={(newPage) => setPage(newPage)}
                    onpageRowCountChange={(newpageRowCount) => setpageRowCount(newpageRowCount)}
                    onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
                    components={{ Toolbar: DataGridToolbar }}
                />
            </Box>
        </Box>
    );
};
export default TransactionLedger;
