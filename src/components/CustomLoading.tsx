import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CustomLoading: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999, // Ensures it's above other content
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default CustomLoading;
