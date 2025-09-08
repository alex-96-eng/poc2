"use client";

import React from "react";
import { Box, Typography, TextField, IconButton, Stack, Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MappedWardrobe } from "@/types";

export default function WardrobeLineItemEditor() {
  const { control, register, watch, setValue } = useFormContext<MappedWardrobe>();

  // Top-level Lines from mapping API
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Lines" as const,
  });

  // Top-level RequiredDate (ISO "YYYY-MM-DD")
  const requiredDate = watch("RequiredDate") as string | undefined;

  // ISO <-> Date helpers
  const toDate = (v?: string) => (v ? new Date(v) : null);
  const toISODate = (d: Date | null) =>
    d
      ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
          .toISOString()
          .slice(0, 10)
      : "";

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Mapped Line Items</Typography>

        {/* Required Date (top-level) */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name={"RequiredDate" as const}
            render={({ field }) => (
              <DatePicker
                label="Required Date"
                value={toDate(requiredDate)}
                onChange={(val) => {
                  const iso = toISODate(val);
                  setValue("RequiredDate" as const, iso, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  field.onChange(iso);
                }}
                slotProps={{ textField: { size: "small", sx: { minWidth: 220 } } }}
              />
            )}
          />
        </LocalizationProvider>
      </Stack>

      {/* Editable Lines table */}
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "6px", width: "40%" }}>Product Code</th>
            <th style={{ textAlign: "left", padding: "6px", width: "15%" }}>Qty</th>
            <th style={{ textAlign: "left", padding: "6px" }}>Comment</th>
            <th style={{ padding: "6px" }} />
          </tr>
        </thead>
        <tbody>
          {fields.map((field, idx) => (
            <tr key={field.id}>
              <td style={{ padding: "6px", verticalAlign: "top" }}>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue={(field as any).ProductCode ?? ""}
                  {...register(`Lines.${idx}.ProductCode` as const)}
                />
              </td>
              <td style={{ padding: "6px", verticalAlign: "top" }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  inputProps={{ min: 0 }}
                  defaultValue={(field as any).OrderQuantity ?? ""}
                  {...register(`Lines.${idx}.OrderQuantity` as const)}
                />
              </td>
              <td style={{ padding: "6px", verticalAlign: "top" }}>
                <TextField
                  fullWidth
                  size="small"
                  defaultValue={(field as any).Comment ?? ""}
                  {...register(`Lines.${idx}.Comment` as const)}
                />
              </td>
              <td style={{ padding: "6px", verticalAlign: "top", whiteSpace: "nowrap" }}>
                <IconButton aria-label="remove line" onClick={() => remove(idx)} size="small">
                  <Delete fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={() => append({ ProductCode: "", OrderQuantity: 1, Comment: "" } as any)}
        >
          Add Line
        </Button>
      </Box>
    </Box>
  );
}
