"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ParsedResponse, Wardrobe } from "@/types";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";
import { CheckOutlined, ChevronLeft } from "@mui/icons-material";

type Props = {
  handleBack: () => void;
  handleNext: () => void;
};

export default function ConfirmMappingsView({ handleBack, handleNext }: Props) {
  const { getValues } = useFormContext<ParsedResponse>();
  const wardrobes = getValues("wardrobes");
  return (
    <Stack spacing={4}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h4">Confirm Mappings</Typography>
            <Stack direction="row" spacing={1}>
                <Button
                    startIcon={<ChevronLeft/>}
                    variant="outlined"
                    onClick={handleBack}
                >
                    Back to Details
                </Button>
                <Button
                    startIcon={<CheckOutlined/>}
                    variant="contained"
                    onClick={handleNext}
                >
                    Next: Review
                </Button>
            </Stack>
        </Stack>

      <Typography variant="h4">Confirm Mappings</Typography>
      {wardrobes.map((wardrobe: Wardrobe, idx: number) => (
        <WardrobeLineItemEditor key={idx} wardrobe={wardrobe} index={idx} />
      ))}

    </Stack>
  );
}
