"use client";

import React, { useEffect } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ParsedResponse, Wardrobe } from "@/types";
import { mapWardrobeToUnleashedItems } from "@/utils/mapping/wardrobeMapper";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";

type Props = {
  handleBack: () => void;
  handleNext: () => void;
};

export default function ConfirmMappingsView({ handleBack, handleNext }: Props) {
  const { getValues, setValue } = useFormContext<ParsedResponse>();
  const wardrobes = getValues("wardrobes");

  console.log(wardrobes);

  // Populate lineItems once, using embedded config mappings
  useEffect(() => {
    wardrobes.forEach((wardrobe: Wardrobe, i: number) => {
      const path = `wardrobes.${i}.lineItems` as const;
      if (!getValues(path)?.length) {
        const items = mapWardrobeToUnleashedItems(wardrobe);
        setValue(path, items);
      }
    });
  }, []);

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
