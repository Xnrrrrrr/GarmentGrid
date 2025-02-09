import { Box, useTheme } from '@mui/material';
import { Header, Chloropleth } from '../../components';

// Demographics 
const Demographics = () => {
    const theme = useTheme();

    return (
        <Box className="demographics-box-parent">
            <Header
                title="DEMOGRAPHICS"
                subtitle="Where are our customers located?"
            />
            <Box
                className="demographics-box-child"
                border={`1px solid ${theme.palette.secondary[200]}`}
            >
                <Chloropleth />
            </Box>
        </Box>
    );
};
export default Demographics;
