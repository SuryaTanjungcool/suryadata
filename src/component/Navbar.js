import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';  // Link for navigation
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';  // Icon for Dashboard
import SchoolIcon from '@mui/icons-material/School';  // Icon for Teachers
import PersonIcon from '@mui/icons-material/Person';  // Icon for Students

const drawerWidth = 240; // Sidebar width
const navItems = [
  { label: 'Dashboard', path: '/Dashboard' },
  { label: 'Dataguru', path: '/DataGuru' },
  { label: 'Datamurid', path: '/DataMurid' },
];

const theme = createTheme({
  palette: {
    primary: { main: '#2c3e50' }, // Dark blue for main elements
    secondary: { main: '#f39c12' }, // Gold for accents
    background: { default: '#ecf0f1' }, // Light background color
  },
});

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();  // Get current URL location to highlight active link

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const drawerContent = (
    <Box
      sx={{
        textAlign: 'center',
        background: '#3498db', // Light blue for sidebar
        height: '100%',
        color: '#fff', // Text and icons in white
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {collapsed ? 'D' : 'Data'}
      </Typography>
      <Divider sx={{ background: '#fff' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}  // Use Link for navigation
              to={item.path}
              sx={{
                textAlign: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: 2,
                backgroundColor: location.pathname === item.path ? '#e74c3c' : 'transparent', // Highlight active route
                '&:hover': {
                  backgroundColor: '#e74c3c', // Red when hovered
                },
              }}
            >
              {item.label === 'Dashboard' && <HomeIcon sx={{ color: '#fff' }} />}  {/* Home Icon */}
              {item.label === 'Dataguru' && <SchoolIcon sx={{ color: '#fff' }} />}  {/* Teacher Icon */}
              {item.label === 'Datamurid' && <PersonIcon sx={{ color: '#fff' }} />}  {/* Student Icon */}
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{ ml: 2, color: '#fff' }}  // White text for menu items
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IconButton
        onClick={handleCollapseToggle}
        sx={{
          position: 'absolute',
          bottom: 10,
          left: collapsed ? 8 : drawerWidth - 48,
          color: '#fff',
        }}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#34495e', // Dark blue for header
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }} // Show only on small screens
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}  // Wrap the Data label with Link for navigation
              to="/Dashboard"  // Link to /Dashboard page
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                color: '#fff',  // White text for Data
                textDecoration: 'none',  // Remove underline
              }}
            >
              Data
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar for Mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' }, // Show only on small screens
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: collapsed ? 60 : drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Sidebar for Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, // Show only on larger screens
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? 60 : drawerWidth,
              transition: 'width 0.3s',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { sm: collapsed ? 0 : `${drawerWidth}px` }, // Adjust margin-left based on collapsed state
            transition: 'margin-left 0.3s',
            zIndex: 1,
            overflowX: 'auto',
          }}
        >
          <Toolbar />
          {/* Main content will go here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
