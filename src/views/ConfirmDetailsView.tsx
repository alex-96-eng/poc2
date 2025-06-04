"use client";

import Button from "@mui/material/Button";
import { Box, CardHeader, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import WardrobeDetailsForm from "@/components/WardrobeDetailsForm";
import WardrobeVisual from "@/components/WardrobeVisual";
import { ParsedResponse } from "@/types";
import PurchaseOrderInfoForm from "@/components/PurchaseOrderInfoForm";
import DeliveryInformationForm from "@/components/DeliveryInformationForm";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { CheckOutlined, Close } from "@mui/icons-material";

type DetailedOrderViewProps = {
    handleReset: VoidFunction;
    handleReview: VoidFunction;
}

const ConfirmDetailsView = ({ handleReview, handleReset }: DetailedOrderViewProps) => {
    const methods = useFormContext<ParsedResponse>();

    const wardrobes = methods.watch("wardrobes");

    const handleClickReview = methods.handleSubmit(() => {
        handleReview();
    });
    const handleClickReset = () => {
        handleReset();
    };

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Confirm Order Details
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button startIcon={<CheckOutlined/>} variant="contained" onClick={handleClickReview}>
                        Review
                    </Button>
                    <Button startIcon={<Close/>} variant="outlined" onClick={handleClickReset}>
                        Start Over
                    </Button>
                </Stack>
            </Stack>
            <Divider/>
            <PurchaseOrderInfoForm/>
            <Divider/>
            <DeliveryInformationForm/>
            <Divider/>
            {
                wardrobes.map((w, wIdx) => (
                    <Box key={wIdx}>
                        <CardHeader
                            sx={{ px: 0 }}
                            title={`Wardrobe #${w.wardrobeNumber} Details`}
                        />
                        <WardrobeVisual wardrobe={w}/>
                        <WardrobeDetailsForm
                            wardrobe={w}
                            wardrobeIndex={wIdx}
                        />
                    </Box>
                ))
            }
        </Stack>
    );
};

export default ConfirmDetailsView;
