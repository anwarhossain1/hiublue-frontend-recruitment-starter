import CustomSearch from "@/components/ui/CustomSearch";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomTabs from "@/components/ui/CustomTabs";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { planOptions } from "../onboarding/views/onboarding-view";
import OffersTable from "./OffersTable";

type tabsType = string | number;
const tabsData = [
  { value: "all", label: "All" },
  { value: "accepted", label: "Accepted" },
];
const typeOptions = [{ value: "all", label: "All" }, ...planOptions];

const fetchOffers = async () => {
  const response = await fetch(`${API_ROUTES.OFFERS.GET}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
};
const OffersList = () => {
  const [currentTab, setCurrentTab] = useState<tabsType>(tabsData[0].value);
  const [type, setType] = useState<string | number>("all");
  const [search, setSearch] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  useEffect(() => {
    fetchOffers().then((data) => {
      setTableData(data.data);
    });
  }, []);
  const handleTabChange = (value: string | number) => {
    setCurrentTab(value);
  };
  const handleTypeChange = (value: string | number) => {
    setType(value);
  };
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };
  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Grid2 container spacing={2}>
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
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CustomSearch value={search} onChange={handleSearchChange} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CustomSelect
              options={typeOptions}
              onChange={handleTypeChange}
              value={type}
              label="Type"
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <OffersTable data={tableData} />
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default OffersList;
