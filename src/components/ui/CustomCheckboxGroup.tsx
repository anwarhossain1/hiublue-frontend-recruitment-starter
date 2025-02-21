import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface CustomCheckboxGroupProps {
  options: { label: string; value: string }[];
  field: any;
  direction?: "row" | "column";
}

const CustomCheckboxGroup: React.FC<CustomCheckboxGroupProps> = ({
  options,
  field,
  direction = "row",
}) => {
  return (
    <FormGroup row={direction === "row"}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              {...field}
              value={option.value}
              checked={field.value?.includes(option.value)}
              onChange={(event) => {
                const newValue = event.target.checked
                  ? [...(field.value || []), option.value]
                  : field.value?.filter((v: string) => v !== option.value);
                field.onChange(newValue);
              }}
            />
          }
          label={option.label}
        />
      ))}
    </FormGroup>
  );
};

export default CustomCheckboxGroup;
