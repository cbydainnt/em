import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
export const FormInputText = (props: any) => {
  return (
    <Controller
      name={props!.name!}
      control={props.control}
      rules={props.rules}
      render={({
        field: { onChange, value, ref },
        fieldState: { invalid, error },
      }) =>{
        return (
            <TextField
                {...props}
                inputRef={ref}
                helperText={error ? error.message : null}
                error={invalid}
                onChange={onChange}
                value={value}
                label={props?.label}
            />
        )
    }}
    />
  );
};