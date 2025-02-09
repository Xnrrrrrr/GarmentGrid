import { Typography, Box, useTheme } from "@mui/material";

// Header component displays a title and subtitle with customized typography
// Props:
// - title: string representing the title text
// - subtitle: string representing the subtitle text
// - This is mandatory crumbs
const Header = ({ title, subtitle }) => {
    const theme = useTheme();

    return (
        <Box>
            <StyledTypography variant="h2" theme={theme}>
                {title}
            </StyledTypography>
            <StyledTypography variant="h5" theme={theme}>
                {subtitle}
            </StyledTypography>
        </Box>
    );
};

// StyledTypography component customizes typography based on variant
// Props:
//   - variant: string representing the typography variant
//   - theme: object representing the MUI theme
//   - children: content to be rendered within the Typography component

const StyledTypography = ({ variant, theme, children }) => {
    // Determine text color, font weight, and margin bottom based on variant
    const textColor = variant === 'h2' ? theme.palette.secondary[200] : theme.palette.secondary[500];
    const fontWeight = variant === 'h2' ? 'bold' : undefined;
    const marginBottom = variant === 'h2' ? '5px' : undefined;

    return (
        <Typography
            variant={variant}
            color={textColor}
            fontWeight={fontWeight}
            sx={{ marginBottom }}
        >
            {children}
        </Typography>
    );
};

export default Header;
