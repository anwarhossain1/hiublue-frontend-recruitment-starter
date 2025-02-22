import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";

type CustomSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const CustomSearch: React.FC<CustomSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CustomSearch;
