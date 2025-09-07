"use client";

import { useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ParsedResponse, Wardrobe } from "@/types";
import { mapWardrobeToUnleashedItems } from "@/utils/mapping/wardrobeMapper";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";
import { CheckOutlined, ChevronLeft } from "@mui/icons-material";

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

            {wardrobes.map((wardrobe: Wardrobe, idx: number) => (
                <WardrobeLineItemEditor key={idx} wardrobe={wardrobe} index={idx}/>
            ))}
        </Stack>
    );
}
