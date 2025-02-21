import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface CustomRadioGroupProps {
  options: { label: string; value: string }[];
  field: any;
  direction?: "row" | "column";
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  options,
  field,
  direction = "row",
}) => {
  return (
    <RadioGroup {...field} row={direction === "row"} color="secondary">
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default CustomRadioGroup;
