"use client";

import { Controller, useFormContext } from "react-hook-form";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

interface RHFDatePickerProps extends DatePickerProps {
    label?: string;
    name: string;
    required?: boolean;
}

/**
 * This component integrates the MUI DatePicker with React Hook Form (RHF) for form management.
 * Must be a child of FormProvider
 *
 * Props:
 *  - label (string): Label text for the date picker input.
 *  - name (string): The name of the form field to identify it in the form.
 *  - other (DatePickerProps<Date>): Other props from MUI DatePicker are spread onto the component,
 *
 * Example Usage:
 * ```jsx
 * <FormProvider methods={useForm()}>
 *   <RHFDatePicker
 *     name="birthdate"
 *     label="Birth Date"
 *     disableFuture
 *     shouldDisableDate={disableWeekends}
 *     renderInput={(params) => <TextField {...params} />}
 *   />
 * </FormProvider>
 * ```
 *
 * @see {https://react-hook-form.com/api/useformcontext}
 */
const RHFDatePicker = ({ label, name, required, slotProps, ...other }: RHFDatePickerProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...field}
                    format="dd/MM/yyyy"
                    label={label + (required ? " *" : "")}
                    slotProps={{
                        ...slotProps,
                        textField: {
                            "aria-label": label,
                            error: !!error,
                            helperText: error?.message,
                            size: "small",
                            ...slotProps?.textField
                        }
                    }}
                    {...other}
                />
            )}
        />
    );
};

export default RHFDatePicker;
