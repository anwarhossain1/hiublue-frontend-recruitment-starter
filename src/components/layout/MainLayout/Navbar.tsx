import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

interface NavbarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "background.paper",
      }}
    >
      <Toolbar>
        {/* Hamburger Icon for Mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          My Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
