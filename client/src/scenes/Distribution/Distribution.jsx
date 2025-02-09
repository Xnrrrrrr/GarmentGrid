import { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { DistributionGraph, Header } from '../../components';

const Distribution = () => {
    const [isLoading, setIsLoading] = useState(false);

     // Function to handle data fetching
    const handleDataFetching = () => {
        setIsLoading(true);
        // Simulate data fetching
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Box className="distribution-box-parent">
            <Header title="DISTRIBUTION" subtitle="Distribution of Sales by Category" />
            <Box className="distribution-box-child">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDataFetching}
                    disabled={isLoading}
                    sx={{ marginBottom: '20px' }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Fetch Data'}
                </Button>
                {isLoading ? <div>Loading...</div> : <DistributionGraph />}
            </Box>
        </Box>
    );
};

export default Distribution;
