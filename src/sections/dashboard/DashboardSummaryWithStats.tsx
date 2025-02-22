import CustomSelect from "@/components/ui/CustomSelect";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Box, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StatCard from "./views/StatCard";

const fetchDashboardSummary = async (filterBy: string | number) => {
  const response = await fetch(
    `${API_ROUTES.DASHBOARD.SUMMARY}?filter=${filterBy}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  if (filterBy === "this-week") {
    return data.current;
  }
  return data.previous;
};
const fetchDashboardStat = async (filterBy: string | number) => {
  const response = await fetch(
    `${API_ROUTES.DASHBOARD.STAT}?filter=${filterBy}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  console.log("stat", data);
  return data;
};

const filterData = [
  { label: "This Week", value: "this-week" },
  { label: "Previous Week", value: "prev-week" },
];
const DashboardSummaryWithStats = () => {
  const [statCardData, setStatCardData] = useState<any>(null);
  const [offersSent, setOffersSent] = useState<any>(null);
  const [websiteVisits, setWebsiteVisits] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | number>(
    filterData[0].value
  );
  useEffect(() => {
    if (selectedFilter) {
      handleDashboardSummary(selectedFilter);
      handleDashboardStat(selectedFilter);
    }
  }, [selectedFilter]);
  const handleDashboardSummary = async (value: string | number) => {
    try {
      const data = await fetchDashboardSummary(value);
      setStatCardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard summary:", error);
    }
  };
  const handleDashboardStat = async (value: string | number) => {
    try {
      const data = await fetchDashboardStat(value);
      if (data) {
        setOffersSent(data.offers_sent);
        setWebsiteVisits(data.website_visits);
      }
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch dashboard summary:", error);
    }
  };
  const handleSelectedFilter = (value: string | number) => {
    setSelectedFilter(value);
  };
  return (
    <Box>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 10 }}>
          <Typography variant="h4" fontWeight={"bold"}>
            Dashboard
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <CustomSelect
            options={filterData}
            value={selectedFilter}
            onChange={handleSelectedFilter}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          {statCardData && (
            <StatCard
              label="Total active users"
              count={statCardData.active_users}
            />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          {statCardData && (
            <StatCard label="Total clicks" count={statCardData.clicks} />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          {statCardData && (
            <StatCard
              label="Total appearances"
              count={statCardData.appearance}
            />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          {websiteVisits && <Typography>Website visit</Typography>}
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
          {offersSent && <Typography>Offers sent</Typography>}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DashboardSummaryWithStats;
