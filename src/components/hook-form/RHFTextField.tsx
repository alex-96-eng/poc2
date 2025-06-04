"use client";

import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps, TextFieldVariants } from "@mui/material";

type Props = Omit<TextFieldProps, "variant"> & {
    name: string;
    variant?: TextFieldVariants;
};

/**
 * This component integrates the MUI TextField with React Hook Form (RHF) for form management.
 * Must be a child of FormProvider
 *
 * Props:
 *   - name (string): The name attribute for the form control, crucial for registering with React Hook Form.
 *   - helperText (string | ReactNode | undefined): Optional helper text or error message displayed below the input.
 *   - type (string): Optional type of the input, such as 'text' or 'number'.
 *   - other (TextFieldProps): Additional props from MUIs TextField are spread onto the component for customization.
 *
 * Example Usage:
 * ```jsx
 * <FormProvider methods={useForm()}>
 *   <RHFTextField
 *     name="email"
 *     label="Email"
 *     type="email"
 *     helperText="Please enter a valid email."
 *   />
 * </FormProvider>
 * ```
 */
const RHFTextField = forwardRef<HTMLDivElement, Props>(({
                                                            InputProps,
                                                            name,
                                                            helperText,
                                                            type,
                                                            inputRef,
                                                            ...other
                                                        }, ref) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    error={!!error}
                    fullWidth
                    helperText={error ? error?.message : helperText}
                    inputRef={inputRef}
                    onChange={(event) => {
                        if (type === "number") {
                            field.onChange(event.target.value === "" ? null : Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                    }}
                    slotProps={{
                        input: {
                            ...InputProps,
                            required: false // props.required messes with RHF validators, passing required still shows * in field
                        }
                    }}
                    type={type}
                    value={type === "number" && field.value === 0 ? "" : field.value} // FIXME
                    {...other}
                />
            )}
        />
    );
});

RHFTextField.displayName = "RHFTextField";

export default RHFTextField;
