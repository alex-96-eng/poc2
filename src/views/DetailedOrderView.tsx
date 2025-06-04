"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, CardHeader, Stack } from "@mui/material";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import WardrobeDetailsForm from "@/components/WardrobeDetailsForm";
import WardrobeVisual from "@/components/WardrobeVisual";
import { ParsedResponse, ParsedResponseSchema, Wardrobe } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import PurchaseOrderInfoForm from "@/components/PurchaseOrderInfoForm";
import DeliveryInformationForm from "@/components/DeliveryInformationForm";
import Divider from "@mui/material/Divider";

type DetailedOrderViewProps = {
    initialData: ParsedResponse;
}

export default function DetailedOrderView({ initialData }: DetailedOrderViewProps) {
    const [deliveryInfo] = useState(initialData.deliveryInfo);
    const [supplierHeader] = useState(initialData.supplierHeader);
    const [wardrobes] = useState<Wardrobe[]>(initialData.wardrobes);

    const handleReview = () => {
        // If you still want to re‐encode & push to /review, do so here
        const combined = { deliveryInfo, supplierHeader, wardrobes };
        const json = encodeURIComponent(JSON.stringify(combined));
        window.location.href = `/review?data=${json}`;
    };

    const methods = useForm<ParsedResponse>({
        reValidateMode: "onChange",
        mode: "onChange",
        defaultValues: initialData,
        resolver: zodResolver(ParsedResponseSchema)
    });

    const [isReviewMode, setIsReviewMode] = useState(false);
    const handleClickReview = methods.handleSubmit(() => {
        setIsReviewMode(true);
    });

    useEffect(() => {
        console.log(isReviewMode);
    }, [isReviewMode]);

    const renderForm = (
        <Stack spacing={2}>
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
            <Button variant="contained" onClick={handleClickReview}>
                Review
            </Button>
        </Stack>
    );

    const renderReview = (
        <>
            <Button
                variant="outlined"
                onClick={() => {
                    setIsReviewMode(false);
                }}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    alert("DONE!");
                }}
            >
                Upload to Unleashed
            </Button>
        </>
    );

    return (
        <FormProvider methods={methods}>
            {
                isReviewMode
                    ? renderReview
                    : renderForm
            }
        </FormProvider>
    );
}
