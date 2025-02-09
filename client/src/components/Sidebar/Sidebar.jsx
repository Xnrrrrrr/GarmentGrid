import { useEffect, useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRightOutlined, SettingsOutlined } from '@mui/icons-material';
import { FlexBetween } from '../';
import profileImage from '../../assets/ai-art1.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillGrid1X2Fill, BsGlobeAmericas, BsCalendar3Event, BsCalendar3 } from "react-icons/bs";
import { GiHanger, GiNotebook } from "react-icons/gi";
import { FaPerson } from "react-icons/fa6";
import { RiLineChartFill, RiAdminFill } from "react-icons/ri";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { MdOutlineSsidChart } from "react-icons/md";

const navigationMenuItems = [
    { text: 'Dashboard', icon: <BsFillGrid1X2Fill className="sidebar-nav-items-icons" /> },
    { text: 'Customer Interface', icon: null },
    { text: 'Product Catalogue', icon: <GiHanger className="sidebar-nav-items-icons"  /> },
    { text: 'Customer Directory', icon: <FaPerson className="sidebar-nav-items-icons" /> },
    { text: 'Transaction Ledger', icon: <GiNotebook className="sidebar-nav-items-icons" /> },
    { text: 'Demographics', icon: <BsGlobeAmericas className="sidebar-nav-items-icons" /> },
    { text: 'Sales Interface', icon: null },
    { text: 'Overview', icon: <RiLineChartFill className="sidebar-nav-items-icons" /> },
    { text: 'Daily Analytics', icon: <BsCalendar3Event className="sidebar-nav-items-icons" /> },
    { text: 'Monthly Analytics', icon: <BsCalendar3 className="sidebar-nav-items-icons" /> },
    { text: 'Distribution', icon: <BiSolidPieChartAlt2 className="sidebar-nav-items-icons" /> },
    { text: 'Management Interface', icon: null },
    { text: 'Administrative', icon: <RiAdminFill className="sidebar-nav-items-icons" /> },
    { text: 'Affiliate Metrics', icon: < MdOutlineSsidChart className="sidebar-nav-items-icons" /> },
];
// TODO:
// Fix sidebar hover css over navigationMenuItems
// Add hover and after styles to cog wheel

// Sidebar component renders the application sidebar navigation.
// Props:
//   - sideBarWidth: width of the sidebar
//   - isSideBarVisible: boolean indicating whether the sidebar is visible
//   - setisSideBarVisible: function to set the visibility of the sidebar
//   - isTabletView: boolean indicating whether the view is in tablet mode
function Sidebar({ sideBarWidth, isSideBarVisible, setisSideBarVisible, isTabletView }) {
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const user = {
        _id: "63701cc1f03239b7f700000e",
        name: "Clint",
        occupation: "Owner",
        phoneNumber: "7036619983",
        transactions: [],
        role: "Owner",
    }

    // Set active menu item based on the current pathname
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    // Display toast message for unimplemented features
    const message = () => toast.error("This feature is pending implementation.")

    return (
        <Box component="nav">
            {isSideBarVisible && (
                <Drawer
                    open={isSideBarVisible}
                    onClose={() => setisSideBarVisible(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: sideBarWidth,
                        '& .MuiDrawer-paper': {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: 'border-box',
                            borderWidth: isTabletView ? 0 : '2px',
                            width: sideBarWidth,
                        },
                    }}
                >
                    <Box className="sidebar-drawer-top-box-parent">
                        <Box sx={{margin: "1.5rem 2rem 2rem 3rem"}}>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box>
                                    <Typography variant="h4" fontWeight="bold">
                                        Garment Grid
                                    </Typography>
                                </Box>
                                {!isTabletView && (
                                    // closes sidebar in mobile view
                                    <IconButton
                                        onClick={() =>
                                            setisSideBarVisible(!isSideBarVisible)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navigationMenuItems.map(({ text, icon }) => (
                                <ListItem key={text} disablePadding>
                                    {icon ? (
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${text.replace(/\s+/g, '_').toLowerCase()}`);
                                                setActive(text.toLowerCase());
                                            }}
                                            sx={{
                                                backgroundColor: active === text.toLowerCase() ? theme.palette.secondary[300] : 'transparent',
                                                color: active === text.toLowerCase() ? theme.palette.primary[600] : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    marginLeft: '2rem',
                                                    color: active === text.toLowerCase() ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === text.toLowerCase() && (
                                                <ChevronRightOutlined sx={{ marginLeft: 'auto' }} />
                                            )}
                                        </ListItemButton>
                                    ) : (
                                        <Typography key={text} sx={{ margin: '2.25rem 0 1rem 3rem' }}>{text}</Typography>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box className="sidebar-drawer-bottom-box-parent">
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            margin="1.5rem 2rem 0 3rem"
                        >
                            <Box
                                component="img"
                                alt="profile-image"
                                src={profileImage}
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box>
                                <Typography
                                    component="span"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    Owner
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                onClick={message}
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: '25px ',
                                    cursor: 'pointer',
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
}

export default Sidebar;
