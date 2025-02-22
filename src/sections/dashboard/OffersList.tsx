import CustomSearch from "@/components/ui/CustomSearch";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomTabs from "@/components/ui/CustomTabs";
import { API_ROUTES } from "@/constants/apiRoutes";
import { Box, Grid2, LinearProgress, Paper, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { planOptions } from "../onboarding/views/onboarding-view";
import OffersTable from "./OffersTable";

type tabsType = string | number;
const tabsData = [
  { value: "all", label: "All" },
  { value: "accepted", label: "Accepted" },
];
const typeOptions = [{ value: "all", label: "All" }, ...planOptions];

const fetchOffers = async (
  status: string | number,
  type: string | number,
  search: string
) => {
  let url = API_ROUTES.OFFERS.GET;
  const queryParams = new URLSearchParams();

  if (status === "accepted") {
    queryParams.append("status", String(status));
  }
  if (type && type !== "all") {
    queryParams.append("type", String(type));
  }
  if (search) {
    queryParams.append("search", search);
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url, {
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOffersDebounced = useCallback(
    debounce((status, type, search) => {
      setLoading(true);
      fetchOffers(status, type, search).then((data) => {
        setTableData(data.data);
        setLoading(false);
      });
    }, 500),
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchOffers(currentTab, type, search).then((data) => {
      setTableData(data.data);
      setLoading(false);
    });
  }, [currentTab, type]);

  useEffect(() => {
    fetchOffersDebounced(currentTab, type, search);
  }, [search]);

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
    <Paper elevation={3} sx={{ p: 3 }}>
      {loading && <LinearProgress />}
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
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
          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <CustomSelect
              options={typeOptions}
              onChange={handleTypeChange}
              value={type}
              label="Type"
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 12 }}>
          <OffersTable data={tableData} />
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default OffersList;
