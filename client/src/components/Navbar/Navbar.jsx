import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMode } from '../../state';
import {
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined
} from '@mui/icons-material';
import { useTheme, AppBar, Toolbar, IconButton, InputBase, Button, Box, Typography } from '@mui/material';
import profileImage from '../../assets/ai-art1.png';
import { BsBrightnessHigh, BsBrightnessHighFill  } from "react-icons/bs";
import { toast } from 'react-toastify';


// Navbar component renders the application's navigation bar
// Props:
//   - isSideBarVisible: boolean representing whether the sidebar is visible
//   - setisSideBarVisible: function to toggle the visibility of the sidebar

const Navbar = ({ isSideBarVisible, setisSideBarVisible }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const user = {
        _id: "63701cc1f03239b7f700000e",
        name: "Clint",
        occupation: "Owner",
        phoneNumber: "7036619983",
        transactions: [],
        role: "Owner",
    }

    const handleClick = () => toast.error("This feature is pending implementation.");

    return (
        <AppBar position="static" sx={{ background: 'none', boxShadow: 'none' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <LeftSideToggle isSideBarVisible={isSideBarVisible} setisSideBarVisible={setisSideBarVisible} />
                <FlexBetween backgroundColor={theme.palette.background.alt}>
                    <SearchInput />
                    <IconButton onClick={handleClick}><Search /></IconButton>
                </FlexBetween>
                <RightSideMenu dispatch={dispatch} theme={theme} user={user} handleClick={handleClick} />
            </Toolbar>
        </AppBar>
    );
};


// LeftSideToggle component renders the toggle button for the sidebar
// Props:
//   - isSideBarVisible: boolean representing whether the sidebar is visible
//   - setisSideBarVisible: function to toggle the visibility of the sidebar

const LeftSideToggle = ({ isSideBarVisible, setisSideBarVisible }) => (
    <FlexBetween>
        <IconButton onClick={() => setisSideBarVisible(!isSideBarVisible)}><MenuIcon /></IconButton>
    </FlexBetween>
);


// FlexBetween component renders a flex container with items spaced between
// Props:
//   - children: components or elements to be rendered within the container

const FlexBetween = ({ children, ...props }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', ...props }}>
        {children}
    </Box>
);

// SearchInput component renders the search input field

const SearchInput = () => (
    <InputBase placeholder="Search..." sx={{ marginBottom: '0.5rem', width: '100%', borderRadius: '10px' }} />
);

// RightSideMenu component renders the menu items on the right side of the navbar
// Props:
//   - dispatch: function to dispatch actions to the Redux store
//   - theme: object representing the MUI theme
//   - user: object representing the user data
//   - handleClick: function to handle click events
const RightSideMenu = ({ dispatch, theme, user, handleClick }) => (
    <FlexBetween>
        <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? <BsBrightnessHighFill  sx={{ fontSize: '25px' }} /> : <BsBrightnessHigh sx={{ fontSize: '25px' }} />}
        </IconButton>
        <IconButton><SettingsOutlined onClick={handleClick} sx={{ fontSize: '25px' }} /></IconButton>
        <UserProfileMenu user={user} handleClick={handleClick} />
    </FlexBetween>
);

// UserProfileMenu component renders the user profile menu
// Props:
//   - user: object representing the user data
//   - handleClick: function to handle click events
const UserProfileMenu = ({ user, handleClick }) => (
    <Button onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'none', gap: '1rem' }}>
        <Box component="img" alt="profile" src={profileImage} className='navbar-user-profile-image' sx={{ objectFit: 'cover' }} />
        <Box className="navbar-user-profile-box-parent">
            <Typography className="navbar-user-profile-first-typography-child" sx={{ color: 'text.secondary' }}>{user.name}</Typography>
            <Typography className="navbar-user-profile-second-typography-child" sx={{ color: 'text.secondary' }}>{user.role}</Typography>
        </Box>
        <ArrowDropDownOutlined sx={{ color: 'text.secondary', fontSize: '25px' }} />
    </Button>
);

export default Navbar;
