"use client";

import React from "react";
import Button from "@mui/material/Button";
import {
  Box,
  CardHeader,
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
import GearIcon from "next/dist/client/components/react-dev-overlay/ui/icons/gear-icon";
import IconButton from "@mui/material/IconButton";

type ConfirmDetailsViewProps = {
    handleOpenConfigDrawer: VoidFunction;
    handleNext: VoidFunction;
    handleReset: VoidFunction;
};

export default function ConfirmDetailsView(
    {
        handleOpenConfigDrawer,
        handleNext,
        handleReset,
    }: ConfirmDetailsViewProps) {
    const { watch, handleSubmit } = useFormContext<ParsedResponse>();
    const wardrobes = watch("wardrobes") || [];

    return (
        <Stack spacing={2}>
            {/* Header with Next & Reset */}
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4">Confirm Order Details</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                        startIcon={<Close/>}
                        variant="outlined"
                        onClick={handleReset}
                    >
                        Start Over
                    </Button>
                    <Button
                        startIcon={<CheckOutlined/>}
                        variant="contained"
                        onClick={handleSubmit(handleNext)}
                    >
                        Next: Mappings
                    </Button>
                    <IconButton
                        onClick={handleOpenConfigDrawer}
                    >
                        <GearIcon/>
                    </IconButton>
                </Stack>
            </Stack>

      <Divider />

      {/* Supplier Purchase Order Info (collapsed by default) */}
      <Accordion defaultExpanded>
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
