import AccountInfoWithAvatar from "@/components/AccountInfoWithAvatar";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";

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
        <Stack
          direction="row"
          spacing={2}
          sx={{ flexGrow: 1 }}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" }, mr: 2, color: "primary.main" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AccountInfoWithAvatar />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
