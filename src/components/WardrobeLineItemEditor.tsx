"use client";

import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ParsedResponse, Wardrobe } from "@/types";

type Props = {
    wardrobe: Wardrobe;
    index: number;
};

export default function WardrobeLineItemEditor({ wardrobe, index }: Props) {
    const { control, register } = useFormContext<ParsedResponse>();

    // Hook call is at top‐level of this component—compliant with React rules
    const { fields } = useFieldArray({
        control,
        name: `wardrobes.${index}.lineItems` as const,
    });

    // Prefix for register paths
    const pathPrefix = `wardrobes.${index}.lineItems` as const;

    return (
        <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Wardrobe #{wardrobe.wardrobeNumber}
            </Typography>

            <Box
                component="table"
                sx={{ width: "100%", mt: 1, borderCollapse: "collapse" }}
            >
                <thead>
                <tr>
                    <th style={{ textAlign: "left", padding: "6px" }}>Code</th>
                    <th style={{ textAlign: "left", padding: "6px" }}>Qty</th>
                    <th style={{ textAlign: "left", padding: "6px" }}>Comment</th>
                </tr>
                </thead>
                <tbody>
                {fields.map((field, idx) => (
                    <tr key={field.id}>
                        <td style={{ padding: "6px" }}>
                            <TextField
                                fullWidth
                                size="small"
                                defaultValue={field.code}
                                // Use `as const` so TS accepts this dynamic path
                                {...register(`${pathPrefix}.${idx}.code` as const)}
                            />
                        </td>
                        <td style={{ padding: "6px" }}>
                            <TextField
                                fullWidth
                                size="small"
                                defaultValue={String(field.qty)}
                                {...register(`${pathPrefix}.${idx}.qty` as const)}
                            />
                        </td>
                        <td style={{ padding: "6px" }}>
                            <TextField
                                fullWidth
                                size="small"
                                defaultValue={field.comment}
                                {...register(`${pathPrefix}.${idx}.comment` as const)}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Box>
        </Box>
    );
}
