"use client";

import React from "react";
import Button from "@mui/material/Button";
import { Box, CardHeader, Stack, Divider, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { CheckOutlined, Close } from "@mui/icons-material";
import { ParsedResponse } from "@/types";
import PurchaseOrderInfoForm from "@/components/PurchaseOrderInfoForm";
import DeliveryInformationForm from "@/components/DeliveryInformationForm";
import WardrobeVisual from "@/components/WardrobeVisual";
import WardrobeDetailsForm from "@/components/WardrobeDetailsForm";

type ConfirmDetailsViewProps = {
  handleNext: VoidFunction;
  handleReset: VoidFunction;
};

export default function ConfirmDetailsView({
  handleNext,
  handleReset,
}: ConfirmDetailsViewProps) {
  const { watch, handleSubmit } = useFormContext<ParsedResponse>();
  const wardrobes = watch("wardrobes");

  return (
    <Stack spacing={2}>
      {/* Header with Next & Reset */}
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h4">Confirm Order Details</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<CheckOutlined />}
            variant="contained"
            onClick={handleSubmit(handleNext)}
          >
            Next: Mappings
          </Button>
          <Button
            startIcon={<Close />}
            variant="outlined"
            onClick={handleReset}
          >
            Start Over
          </Button>
        </Stack>
      </Stack>

      <Divider />

      {/* Forms */}
      <PurchaseOrderInfoForm />
      <Divider />
      <DeliveryInformationForm />
      <Divider />

      {/* Wardrobes */}
      {wardrobes.map((w, wIdx) => (
        <Box key={wIdx}>
          <CardHeader title={`Wardrobe #${w.wardrobeNumber} Details`} sx={{ px: 0 }} />
          <WardrobeVisual wardrobe={w} />
          <WardrobeDetailsForm wardrobe={w} wardrobeIndex={wIdx} />
        </Box>
      ))}
    </Stack>
  );
}
