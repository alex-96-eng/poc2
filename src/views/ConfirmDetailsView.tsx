"use client";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormContext } from "react-hook-form";
import { CheckOutlined, Close, Settings } from "@mui/icons-material";
import { SalesOrder } from "@/types";
import PurchaseOrderInfoForm from "@/components/PurchaseOrderInfoForm";
import DeliveryInformationForm from "@/components/DeliveryInformationForm";
import WardrobeVisual from "@/components/WardrobeVisual";
import WardrobeDetailsForm from "@/components/WardrobeDetailsForm";

type ConfirmDetailsViewProps = {
    handleOpenConfigDrawer: VoidFunction;
    handleNext: VoidFunction;
    handleReset: VoidFunction;
    handleClick: VoidFunction;
};

export default function ConfirmDetailsView(
    {
        handleOpenConfigDrawer,
        handleNext,
        handleReset,
        handleClick,
    }: ConfirmDetailsViewProps
) {
    const { watch } = useFormContext<SalesOrder>();
    const wardrobes = watch("wardrobes") || [];

    return (
        <Stack spacing={2}>
            {/* Header with Next & Reset */}
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4">Confirm Order Details</Typography>
                <Stack direction="row" spacing={1}>
                    <Button startIcon={<Close/>} variant="outlined" onClick={handleReset}>
                        Start Over
                    </Button>
                    <Button
                        startIcon={<CheckOutlined/>}
                        variant="contained"
                        onClick={handleClick}
                    >
                        Next: Mappings
                    </Button>
                    <IconButton onClick={handleOpenConfigDrawer}>
                        <Settings/>
                    </IconButton>
                </Stack>
            </Stack>

            <Divider/>

            <Stack>
                {/* Supplier Purchase Order Info (collapsed by default) */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="h6">Supplier Purchase Order Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PurchaseOrderInfoForm/>
                    </AccordionDetails>
                </Accordion>

                {/* Delivery Information (collapsed by default) */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="h6">Delivery Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DeliveryInformationForm/>
                    </AccordionDetails>
                </Accordion>

                {/* Wardrobes (each collapsed by default) */}
                {wardrobes.map((w, wIdx) => (
                    <Accordion key={wIdx}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="h6">Wardrobe #{w.wardrobeNumber} Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <WardrobeVisual wardrobe={w}/>
                                <WardrobeDetailsForm wardrobe={w} wardrobeIndex={wIdx}/>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Stack>
    );
}
