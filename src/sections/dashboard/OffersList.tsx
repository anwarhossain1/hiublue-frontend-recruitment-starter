import CustomSelect from "@/components/ui/CustomSelect";
import CustomTabs from "@/components/ui/CustomTabs";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { planOptions } from "../onboarding/views/onboarding-view";

type tabsType = string | number;
const tabsData = [
  { value: "all", label: "All" },
  { value: "accepted", label: "Accepted" },
];

const OffersList = () => {
  const [currentTab, setCurrentTab] = useState<tabsType>(tabsData[0].value);
  const [type, setType] = useState<string | number>(planOptions[0].value);
  const handleTabChange = (value: string | number) => {
    setCurrentTab(value);
  };
  const handleTypeChange = (value: string | number) => {
    setType(value);
  };
  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12 }}>
            {" "}
            <Typography variant="h6" fontWeight={"bold"}>
              Offers List
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <CustomTabs
              value={currentTab}
              onChange={handleTabChange}
              options={tabsData}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>Search</Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CustomSelect
              options={planOptions}
              onChange={handleTypeChange}
              value={type}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default OffersList;
