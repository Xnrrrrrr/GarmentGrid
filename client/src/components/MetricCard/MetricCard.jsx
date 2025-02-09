import { Box, Typography, useTheme } from '@mui/material';
import { FlexBetween } from '../';

// MetricCard component displays statistical information with a title, value, increase indicator, icon, and description.
// Props:
//   - title: title of the statistic
//   - value: value of the statistic
//   - increase: indicator of increase/decrease in the statistic
//   - icon: icon representing the statistic
//   - description: description of the statistic
const MetricCard = ({ title, value, increase, icon, description }) => {
    const theme = useTheme();

    return (
        <Box sx={styles.container}>
            <FlexBetween sx={styles.header}>
                <Typography variant="h6" sx={styles.title}>
                    {title}
                </Typography>
                {icon}
            </FlexBetween>
            <Typography variant="h3" sx={styles.value}>
                {value}
            </Typography>
            <FlexBetween gap="1rem" sx={styles.footer}>
                <Typography variant="h5" sx={styles.increase}>
                    {increase}
                </Typography>
                <Typography sx={styles.description}>{description}</Typography>
            </FlexBetween>
        </Box>
    );
};

// Styles for the MetricCard component
const styles = {
    container: {
        gridColumn: 'span 2',
        gridRow: 'span 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        flex: '1 1 100%',
        backgroundColor: theme => theme.palette.background.alt,
        borderRadius: '0.55rem',
    },
    header: {
        marginBottom: '1rem',
    },
    title: {
        color: theme => theme.palette.secondary[300],
    },
    value: {
        color: theme => theme.palette.secondary[400],
        fontWeight: '600',
    },
    footer: {
        gap: '1rem',
    },
    increase: {
        color: theme => theme.palette.secondary.light,
        fontStyle: 'italic',
    },
    description: {
        color: theme => theme.palette.text.secondary,
    },
};

export default MetricCard;
