"use client";

import React from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ParsedResponse, Wardrobe } from "@/types";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";

type Props = {
  handleBack: () => void;
  handleNext: () => void;
};

export default function ConfirmMappingsView({ handleBack, handleNext }: Props) {
  const { getValues } = useFormContext<ParsedResponse>();
  const wardrobes = getValues("wardrobes");
  return (
    <Stack spacing={4}>
      <Typography variant="h4">Confirm Mappings</Typography>
      {wardrobes.map((wardrobe: Wardrobe, idx: number) => (
        <WardrobeLineItemEditor key={idx} wardrobe={wardrobe} index={idx} />
      ))}

      <Divider />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={handleBack}>
          Back to Details
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next: Review
        </Button>
      </Stack>
    </Stack>
  );
}
