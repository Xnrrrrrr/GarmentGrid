import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from './theme.js';
import { 
    Administrators, Distribution, Dashboard, ProductCatalogue, CustomerDirectory, TransactionLedger, Demographics, Overview, DailyAnalytics, MonthlyAnalytics, AffiliateMetrics, Layout, NotFound 
} from './scenes';

// boilerplate
function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            {/* Simulates signing in */}
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path='/product_catalogue' element={<ProductCatalogue />} />
                            <Route path='/customer_directory' element={<CustomerDirectory />} />
                            <Route path='/transaction_ledger' element={<TransactionLedger />} />
                            <Route path='/demographics' element={<Demographics />} />
                            <Route path='/overview' element={<Overview />} />
                            <Route path='/daily_analytics' element={<DailyAnalytics />} />
                            <Route path='/monthly_analytics' element={<MonthlyAnalytics />} />
                            <Route path='/distribution' element={<Distribution />} />
                            <Route path='/administrative' element={<Administrators />} />
                            <Route path='/affiliate_metrics' element={<AffiliateMetrics />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
