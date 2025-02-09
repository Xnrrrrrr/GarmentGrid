import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Header, OverviewGraph } from '../../components';

// Overview component displays an overview of revenue and profit.

const Overview = () => {
    const [view, setView] = useState('sales');

    // Function to handle the change of view.
    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <Box className="overview-box-parent">
            <Header title="OVERVIEW" subtitle="Overview of Revenue and Profit" />
            <Box className="overview-box-child-container">
                <ViewSelectionButtons view={view} onViewChange={handleViewChange} />
                <Box className="overview-box-overview-graph-container">
                    <OverviewGraph view={view} />
                </Box>
            </Box>
        </Box>
    );
};

// ViewSelectionButtons renders buttons for selecting the view (sales or units).

const ViewSelectionButtons = ({ view, onViewChange }) => {
    // Determine if the current view is sales or units.

    const isSalesView = view === 'sales';
    const isUnitsView = view === 'units';

    return (
        <Box className="overview-view-selected-buttons-box-parent">
            <Typography variant="h6" gutterBottom>Select View:</Typography>
            <Button
                variant={isSalesView ? 'contained' : 'outlined'}
                onClick={() => onViewChange('sales')}
                sx={{ marginRight: '1rem' }}
            >
                Sales
            </Button>
            <Button
                variant={isUnitsView ? 'contained' : 'outlined'}
                onClick={() => onViewChange('units')}
            >
                Units
            </Button>
        </Box>
    );
};

export default Overview;
