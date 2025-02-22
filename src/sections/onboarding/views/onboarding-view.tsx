"use client";

import CustomCheckboxGroup from "@/components/ui/CustomCheckboxGroup";
import CustomRadioGroup from "@/components/ui/CustomRadioGroup";
import { API_ROUTES } from "@/constants/apiRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import UserSelection from "../UserSelection";
const schema = yup.object().shape({
  plan_type: yup.string().required("Plan type is required"),
  additions: yup
    .array()
    .of(yup.string())
    .min(1, "At least one addition is required"),
  user: yup.object().shape({
    name: yup.string().required("User selection is required"),
    id: yup.number().required(),
  }),
  expired: yup.date().required("Expiration date is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
});
export const planOptions = [
  { label: "Pay as you go", value: "pay_as_you_go" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function OnboardingView() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      plan_type: "",
      additions: [],
      user: undefined,
      expired: undefined,
      price: undefined,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const postData = await fetch(API_ROUTES.ONBOARDING.POST, {
        method: "POST",
        body: JSON.stringify({ ...data, user_id: data.user.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const post = await postData.json();
      setIsLoading(false);
      if (post.data) {
        toast.success(post.message);
      } else {
        console.error("Failed to create offer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const additionOptions = [
    { label: "Refundable", value: "refundable" },
    { label: "On Demand", value: "on_demand" },
    { label: "Negotiable", value: "negotiable" },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h6" fontWeight={"bold"}>
            Create Offer
          </Typography>
          <Typography
            variant="body2"
            fontWeight={"bold"}
            color="text.secondary"
          >
            Send onboarding offer to new user
          </Typography>
        </Box>
        <Divider />
        <Box p={3}>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            Plan Type
          </Typography>
          <Controller
            name="plan_type"
            control={control}
            render={({ field }) => (
              <CustomRadioGroup
                options={planOptions}
                field={field}
                direction="row"
              />
            )}
          />
          {errors.plan_type && (
            <p style={{ color: "red" }}>{errors.plan_type.message}</p>
          )}
          <Typography variant="subtitle2" fontWeight={"bold"} mt={2}>
            Additions
          </Typography>
          <Controller
            name="additions"
            control={control}
            render={({ field }) => (
              <CustomCheckboxGroup
                options={additionOptions}
                field={field}
                direction="row"
              />
            )}
          />
          {errors.additions && (
            <p style={{ color: "red" }}>{errors.additions.message}</p>
          )}
          <Typography variant="subtitle2" fontWeight={"bold"} mt={2} mb={1}>
            User
          </Typography>
          <Controller
            name="user"
            control={control}
            render={({ field }) => <UserSelection field={field} />}
          />
          {errors.user && (
            <p style={{ color: "red" }}>{errors.user.name?.message}</p>
          )}
          <Typography variant="subtitle2" fontWeight={"bold"} mt={2} mb={1}>
            Expired Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="expired"
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  onChange={(date) =>
                    field.onChange(date?.format("YYYY-MM-DD"))
                  }
                  value={field.value ? dayjs(field.value) : null}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.expired,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          {errors.expired && (
            <p style={{ color: "red" }}>{errors.expired.message}</p>
          )}

          <Typography variant="subtitle2" fontWeight={"bold"} mt={2} mb={1}>
            Price
          </Typography>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                fullWidth
                type="number"
                placeholder="Price"
                error={!!errors.price}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            )}
          />
          {errors.price && (
            <p style={{ color: "red" }}>{errors.price.message}</p>
          )}
        </Box>
      </Paper>
      <Stack
        direction="row"
        spacing={2}
        mt={2}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Button
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{ mt: 3, backgroundColor: "primary.main" }}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
