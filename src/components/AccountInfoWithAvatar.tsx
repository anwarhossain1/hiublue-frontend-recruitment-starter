import { useAuth } from "@/contexts/AuthContexts";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
const AccountInfoWithAvatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { user, logoutHandler } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar src="/images/account.png" alt={user?.name} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ padding: 2, width: 200 }}>
          <Typography variant="subtitle1">{user?.name}</Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            {user?.email}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountInfoWithAvatar;
