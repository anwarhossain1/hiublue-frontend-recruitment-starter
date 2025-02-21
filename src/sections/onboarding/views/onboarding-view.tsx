"use client";

import CustomCheckboxGroup from "@/components/ui/CustomCheckboxGroup";
import CustomRadioGroup from "@/components/ui/CustomRadioGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormLabel,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
const users = [
  { label: "John Doe", id: 1 },
  { label: "Jane Smith", id: 2 },
  { label: "Alice Johnson", id: 3 },
];
const schema = yup.object().shape({
  plan_type: yup.string().required("Plan type is required"),
  additions: yup
    .array()
    .of(yup.string().required("Addition is required"))
    .required("At least one addition is required"),
  user: yup.object().shape({
    label: yup.string().required("User selection is required"),
    id: yup.number().required(),
  }),
  expired: yup.date().required("Expiration date is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
});

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
      price: 0,
    },
  });
  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
  };
  const planOptions = [
    { label: "Pay as you go", value: "pay_as_you_go" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];
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

          {/* User - Autocomplete */}
          <Typography variant="subtitle2" fontWeight={"bold"} mt={2} mb={1}>
            User
          </Typography>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={users}
                getOptionLabel={(option) => option.label || ""}
                renderInput={(params) => (
                  <TextField {...params} error={!!errors.user} />
                )}
                onChange={(_, data) => field.onChange(data)}
              />
            )}
          />
          {errors.user && (
            <p style={{ color: "red" }}>{errors.user.label?.message}</p>
          )}

          {/* Expired Date - Date Picker */}
          <FormLabel component="legend" sx={{ mt: 2 }}>
            Expired Date
          </FormLabel>
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

          {/* Submit Button */}
          <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
    </form>
  );
}
