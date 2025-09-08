"use client";

import React from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Stack,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  handleClick: VoidFunction;
};

export default function ConfirmDetailsView({
  handleNext,
  handleReset,
  handleClick,
}: ConfirmDetailsViewProps) {
  const { watch } = useFormContext<ParsedResponse>();
  const wardrobes = watch("wardrobes") || [];

  return (
    <Stack spacing={2}>
      {/* Header with Next & Reset */}
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h4">Confirm Order Details</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<CheckOutlined />}
            variant="contained"
            onClick={handleClick}
          >
            Next: Mappings
          </Button>
          <Button startIcon={<Close />} variant="outlined" onClick={handleReset}>
            Start Over
          </Button>
        </Stack>
      </Stack>

      <Divider />

      {/* Supplier Purchase Order Info (collapsed by default) */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Supplier Purchase Order Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PurchaseOrderInfoForm />
        </AccordionDetails>
      </Accordion>

      {/* Delivery Information (collapsed by default) */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Delivery Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DeliveryInformationForm />
        </AccordionDetails>
      </Accordion>

      {/* Wardrobes (each collapsed by default) */}
      {wardrobes.map((w, wIdx) => (
        <Accordion key={wIdx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Wardrobe #{w.wardrobeNumber} Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <WardrobeVisual wardrobe={w} />
              <WardrobeDetailsForm wardrobe={w} wardrobeIndex={wIdx} />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
