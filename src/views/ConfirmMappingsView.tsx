"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ParsedResponse, Wardrobe } from "@/types";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";
import { CheckOutlined, ChevronLeft } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import GearIcon from "next/dist/client/components/react-dev-overlay/ui/icons/gear-icon";

type Props = {
    handleOpenConfigDrawer: VoidFunction;
    handleBack: () => void;
    handleNext: () => void;
};

export default function ConfirmMappingsView({ handleOpenConfigDrawer, handleBack, handleNext }: Props) {
    const { getValues } = useFormContext<ParsedResponse>();
    const wardrobes = getValues("wardrobes");
    console.log(wardrobes);

    return (
        <Stack spacing={4}>
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
                <Typography variant="h4">Confirm Mappings</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
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
                    <IconButton
                        onClick={handleOpenConfigDrawer}
                    >
                        <GearIcon/>
                    </IconButton>
                </Stack>
            </Stack>

            {
                wardrobes.map((wardrobe: Wardrobe, idx: number) => (
                    <WardrobeLineItemEditor key={idx} wardrobe={wardrobe} index={idx}/>
                ))
            }

        </Stack>
    );
}
