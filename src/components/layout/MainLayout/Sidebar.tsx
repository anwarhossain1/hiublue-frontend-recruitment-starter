"use client";

import DashboardIconSVG from "@/components/svg-icons/DashboardIconSVG";
import OnboardingIconSVG from "@/components/svg-icons/OnboardingIconSVG";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const menuSections = [
  {
    title: "Overview",
    items: [
      { text: "Dashboard", icon: <DashboardIconSVG />, path: "/" },
      { text: "Onboarding", icon: <OnboardingIconSVG />, path: "/onboarding" },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
}: SidebarProps) {
  const pathname = usePathname();

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={48} height={48} />
        </Link>
        <IconButton
          sx={{ display: { sm: "none" } }}
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      {menuSections.map((section) => (
        <List
          key={section.title}
          subheader={
            <ListSubheader
              sx={{
                color: "gray",
                fontSize: "0.85rem",
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </ListSubheader>
          }
        >
          {section.items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.text}
                href={item.path}
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      bgcolor: isActive ? "primary.light" : "transparent",
                      color: isActive ? "white" : "inherit",
                      "&:hover": { bgcolor: "primary.light" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "32px",
                        "& svg": {
                          fontSize: "20px",
                        },
                        color: isActive ? "white" : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
          <Divider />
        </List>
      ))}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
