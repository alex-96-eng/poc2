"use client";

import React, { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextFieldVariants } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type RHFSelectProps = Omit<TextFieldProps, "variant"> & {
    name: string;
    native?: boolean;
    variant?: TextFieldVariants;
    maxHeight?: number | "unset";
    children: ReactNode;
    paperStyles?: string;
};

/**
 * This component integrates the MUI Select with React Hook Form (RHF) for form management.
 * Must be a child of FormProvider
 *
 * Props:
 *   - name (string): The name attribute for the form control, crucial for registering with React Hook Form.
 *   - native (boolean): Optional. If true, renders a native select element. Defaults to false.
 *   - maxHeight (number | "unset"): Optional. Maximum height for the dropdown. Defaults to 220 pixels.
 *   - helperText (string | ReactNode | undefined): Optional. Helper text or error message displayed below the select.
 *   - children (ReactNode): The options to be rendered within the select component.
 *   - paperStyles (string | undefined): Optional. Additional CSS classes for styling the dropdown's paper component.
 *   - other (TextFieldProps): Other props from MUI TextField are spread onto the component for additional customization.
 *
 * Example Usage:
 * ```jsx
 * <FormProvider methods={useForm()}>
 *   <RHFSelect
 *     name="country"
 *     label="Select Country"
 *     helperText="Choose your country"
 *   >
 *     <MenuItem value="US">United States</MenuItem>
 *     <MenuItem value="CA">Canada</MenuItem>
 *   </RHFSelect>
 * </FormProvider>
 * ```
 */
const RHFSelect = ({
                       name,
                       native = false,
                       maxHeight = 220,
                       helperText,
                       children,
                       paperStyles,
                       ...other
                   }: RHFSelectProps) => {
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
                    helperText={error?.message || helperText}
                    select
                    slotProps={{
                        select: {
                            native,
                            MenuProps: {
                                slotProps: {
                                    paper: {
                                        className: `max-h-[${maxHeight}px] ${paperStyles}`
                                    }
                                }
                            },
                            className: "capitalize"
                        }
                    }}
                    size="small"
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    );
};

export default RHFSelect;
