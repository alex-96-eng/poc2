"use client";

import React from "react";
import Button from "@mui/material/Button";
import { Box, CardHeader, Divider, Stack, Typography } from "@mui/material";
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
    const wardrobes = watch("wardrobes");

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

            <Divider/>

            {/* Forms */}
            <PurchaseOrderInfoForm/>
            <Divider/>
            <DeliveryInformationForm/>
            <Divider/>

            {/* Wardrobes */}
            {wardrobes.map((w, wIdx) => (
                <Box key={wIdx}>
                    <CardHeader title={`Wardrobe #${w.wardrobeNumber} Details`} sx={{ px: 0 }}/>
                    <WardrobeVisual wardrobe={w}/>
                    <WardrobeDetailsForm wardrobe={w} wardrobeIndex={wIdx}/>
                </Box>
            ))}
        </Stack>
    );
}
