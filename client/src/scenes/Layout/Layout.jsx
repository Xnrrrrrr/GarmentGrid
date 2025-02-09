import { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../../components';

// Layout to manage the overall structure of the application
const Layout = () => {
    // Determine if the current view is tablet size or larger
    const isTabletView = useMediaQuery('(min-width: 600px)');
    // Persists sidebar state on refresh for mobile, tablet, and desktop view
    const [isSideBarVisible, setisSideBarVisible] = useState(() => {
        // Retrieve the sidebar state from local storage on initial load
        const storedValue = localStorage.getItem('SIDEBAR_STATE');
        // Parse the stored value or default to false if not found
        return storedValue ? JSON.parse(storedValue) : false;
    });

    // Effect to persist the sidebar state in local storage

    useEffect(() => {
        localStorage.setItem('SIDEBAR_STATE', JSON.stringify(isSideBarVisible));
    }, [isSideBarVisible]);

    // Props to pass to the Sidebar component

    const sidebarProps = {
        isTabletView,
        sideBarWidth: '250px',
        isSideBarVisible,
        setisSideBarVisible,
    };

    return (
        <Box className="layout-box-parent">
            {isTabletView && <Sidebar {...sidebarProps} />}
            <Box flexGrow={1}>
                <Navbar
                    isSideBarVisible={isSideBarVisible}
                    setisSideBarVisible={setisSideBarVisible}
                />
                <Outlet />
            </Box>
            {!isTabletView && (
                <Sidebar
                    {...sidebarProps}
                    sideBarWidth="250px"
                    isSideBarVisible={isSideBarVisible}
                    setisSideBarVisible={setisSideBarVisible}
                />
            )}
        </Box>
    );
};

export default Layout;
