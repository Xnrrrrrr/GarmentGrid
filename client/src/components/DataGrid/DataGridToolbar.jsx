import { Box, Typography } from '@mui/material';
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import FlexBetween from '../FlexBetween.jsx';

// Custom toolbar component for the data grid
const DataGridToolbar = () => {
    return (
        // Container for the toolbar
        <GridToolbarContainer>
            <FlexBetween justifyContent="space-between" alignItems="center">
                <Box className="data-grid-toolbar-box-parent">
                    <Typography variant="h6" component="div">
                        Data Options:
                    </Typography>
                    <GridToolbarColumnsButton sx={{ mr: 1 }} />
                    <GridToolbarDensitySelector sx={{ mr: 1 }} />
                    <GridToolbarExport />
                </Box>
            </FlexBetween>
        </GridToolbarContainer>
    );
};

export default DataGridToolbar;
