import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

type CustomSelectProps = {
  //   label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  fullWidth?: boolean;
  minWidth?: number;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  //   label,
  options,
  value,
  onChange,
  fullWidth = true,
  minWidth = 120,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth }}>
      <FormControl fullWidth={fullWidth}>
        {/* <InputLabel id={`${label}-select-label`}>{label}</InputLabel> */}
        <Select
          labelId={`-select-label`}
          id={`select`}
          value={String(value)}
          //   label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
