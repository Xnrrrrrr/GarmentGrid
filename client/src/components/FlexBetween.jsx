import { Box } from '@mui/material';
import { styled } from '@mui/system';

// FlexBetween component arranges its children in a flex container with space-between alignment.
// Props:
//   - children: the components or elements to be rendered within FlexBetween
const FlexBetween = ({ children, ...props }) => {
    return (
        <StyledFlexBetween {...props}>
            {children}
        </StyledFlexBetween>
    );
};

// Styled component for FlexBetween, applying custom styling using MUI's styled utility

const StyledFlexBetween = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1), // Add padding for better spacing
    borderRadius: theme.shape.borderRadius, // Add border radius for a rounded appearance
    boxShadow: theme.shadows[1], // Add a subtle box shadow for depth
    backgroundColor: theme.palette.background.default, // Set background color
    color: theme.palette.text.primary, // Set text color
    transition: 'box-shadow 0.3s', // Add transition for smoother hover effect

    '&:hover': {
        boxShadow: theme.shadows[2], // Increase shadow on hover
    },
}));

export default FlexBetween;
