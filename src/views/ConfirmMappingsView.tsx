"use client";

import React, { useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/components/hook-form/FormProvider";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";
import { MappedWardrobe, MappedWardrobeSchema } from "@/types";

type Props = {
  initial: MappedWardrobe;
  handleBack: () => void;
  handleNext: () => void;
  onSave?: (data: MappedWardrobe) => void;
};

export default function ConfirmMappingsView({
  initial,
  handleBack,
  handleNext,
  onSave,
}: Props) {
  const methods = useForm<MappedWardrobe>({
    defaultValues: initial,
    resolver: zodResolver(MappedWardrobeSchema),
    mode: "onChange",
  });

  // If parent passes a new initial (e.g., remap), rehydrate the form
  useEffect(() => {
    methods.reset(initial);
  }, [initial, methods]);

  const submit = (data: MappedWardrobe) => {
    onSave?.(data);                       // bubble up edited mapping
    handleNext();                         // go to Review
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(submit)}>
      <Stack spacing={2}>
        <WardrobeLineItemEditor />        {/* edits top-level RequiredDate + Lines */}
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" type="submit">
            Continue to Review
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
