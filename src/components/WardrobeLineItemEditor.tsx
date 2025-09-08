"use client";

import React from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MappedWardrobe } from "@/types";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import RHFTextField from "@/components/hook-form/RHFTextField";

export default function WardrobeLineItemEditor() {
    const { control } = useFormContext<MappedWardrobe>();

    // Top-level Lines from mapping API
    const { fields, append, remove } = useFieldArray({
        control,
        name: "Lines" as const,
    });

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Mapped Line Items</Typography>

                {/* Required Date (top-level) */}
                <RHFDatePicker
                    name="RequiredDate"
                    label="Required Date"
                    slotProps={{ textField: { size: "small", sx: { minWidth: 220 } } }}
                />
            </Stack>

            {/* Editable Lines table */}
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ textAlign: "left", padding: "6px", width: "40%" }}>Product Code</th>
                    <th style={{ textAlign: "left", padding: "6px", width: "15%" }}>Qty</th>
                    <th style={{ textAlign: "left", padding: "6px" }}>Comment</th>
                    <th style={{ padding: "6px" }}/>
                </tr>
                </thead>
                <tbody>
                {fields.map((field, idx) => (
                    <tr key={field.id}>
                        <td style={{ padding: "6px", verticalAlign: "top" }}>
                            <RHFTextField
                                name={`Lines.${idx}.ProductCode`}
                                fullWidth
                                size="small"
                                // defaultValue={(field as any).ProductCode ?? ""}
                            />
                        </td>
                        <td style={{ padding: "6px", verticalAlign: "top" }}>
                            <RHFTextField
                                name={`Lines.${idx}.OrderQuantity`}
                                fullWidth
                                size="small"
                                type="number"
                                inputProps={{ min: 0 }}
                                // defaultValue={(field as any).OrderQuantity ?? ""}
                            />
                        </td>
                        <td style={{ padding: "6px", verticalAlign: "top" }}>
                            <RHFTextField
                                name={`Lines.${idx}.Comment`}
                                fullWidth
                                size="small"
                                // defaultValue={(field as any).Comment ?? ""}
                            />
                        </td>
                        <td style={{ padding: "6px", verticalAlign: "top", whiteSpace: "nowrap" }}>
                            <IconButton aria-label="remove line" onClick={() => remove(idx)} size="small">
                                <Delete fontSize="small"/>
                            </IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Box>

            <Box sx={{ mt: 1 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Add/>}
                    onClick={() => append({ ProductCode: "", OrderQuantity: 1, Comment: "" } as any)}
                >
                    Add Line Item
                </Button>
            </Box>
        </Box>
    );
}
