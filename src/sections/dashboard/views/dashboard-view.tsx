"use client";

import { Stack } from "@mui/material";
import DashboardSummaryWithStats from "../DashboardSummaryWithStats";
import OffersList from "../OffersList";

export default function DashboardView() {
  return (
    <Stack spacing={3}>
      <DashboardSummaryWithStats />
      <OffersList />
    </Stack>
  );
}
