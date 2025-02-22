import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

type CustomTabsProps = {
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
};

const CustomTabs: React.FC<CustomTabsProps> = ({
  options,
  value,
  onChange,
}) => {
  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: string | number
  ) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {options.map((option) => (
            <Tab key={option.value} label={option.label} value={option.value} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default CustomTabs;
