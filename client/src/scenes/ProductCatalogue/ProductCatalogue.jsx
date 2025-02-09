import { useState } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';
import { Header } from '../../components';
import { dataProduct } from '../../data/faker.js';
import { overallDataStatistics } from "../../data/faker.js";

// Product represents an individual product in the catalogue.

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    sales,
    sold,
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card sx={styles.card}>
            <CardContent>
                <Typography variant="subtitle2" sx={styles.category}>
                    {category}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body1" sx={styles.price}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2" sx={styles.description}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'See Less' : 'See More'}
                </Button>
            </CardActions>
            <Collapse in={isExpanded} unmountOnExit>
                <CardContent sx={styles.additionalInfo}>
                    <Typography>ID: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Total Sales: ${sales}</Typography>
                    <Typography>Total Units Sold: {sold}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

// ProductCatalogue displays a catalogue of products.

const ProductCatalogue = () => {
    const theme = useTheme();
    const isTabletView = useMediaQuery('(min-width: 1000px)');

    return (
        <Box className="product-catalougue-box-parent">
            <Header title="PRODUCT CATALOGUE" subtitle="See our catalogue of products." />
            {dataProduct ? (
                <Box
                    className="product-catalougue-box-child"
                    gridTemplateColumns={isTabletView ? 'repeat(4, minmax(0, 1fr))' : '1fr'}
                    gap={isTabletView ? '20px' : '10px'}
                >
                    {dataProduct.map(product => (
                        <Product
                            key={product._id}
                            {...product}
                            yearlySalesTotal={overallDataStatistics[0].yearlySalesTotal}
                            yearlyTotalSoldUnits={overallDataStatistics[0].yearlyTotalSoldUnits}
                        />
                    ))}
                </Box>
            ) : (
                <CircularProgress sx={{ color: theme.palette.primary.main }} />
            )}
        </Box>
    );
};

// Styles for the Product component

const styles = {
    card: {
        borderRadius: '0.55rem',
        backgroundColor: theme => theme.palette.background.default,
        '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
    },
    category: {
        color: theme => theme.palette.secondary.main,
    },
    price: {
        color: theme => theme.palette.secondary.dark,
        marginBottom: '1rem',
    },
    description: {
        color: theme => theme.palette.text.secondary,
        marginBottom: '1rem',
    },
    additionalInfo: {
        color: theme => theme.palette.text.secondary,
    },
};

export default ProductCatalogue;
