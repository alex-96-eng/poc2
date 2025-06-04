"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import PurchaseOrderInfoCard from "@/components/PurchaseOrderInfoCard";
import DeliveryInformationCard from "@/components/DeliveryInformationCard";
import WardrobeDetailsCard from "@/components/WardrobeDetailsCard";
import WardrobeVisual from "@/components/WardrobeVisual";
import { DeliveryInfo, ParsedResponse, SupplierHeader, Wardrobe } from "@/types";

type DetailedOrderViewProps = {
    initialData: ParsedResponse;
}

export default function DetailedOrderView({ initialData }: DetailedOrderViewProps) {
    // Initialize all state from the server‐parsed JSON
    const [deliveryInfo] = useState(initialData.deliveryInfo);
    const [supplierHeader] = useState(initialData.supplierHeader);
    const [wardrobes] = useState<Wardrobe[]>(initialData.wardrobes);

    const handleReview = () => {
        // If you still want to re‐encode & push to /review, do so here
        const combined = { deliveryInfo, supplierHeader, wardrobes };
        const json = encodeURIComponent(JSON.stringify(combined));
        window.location.href = `/review?data=${json}`;
    };

    const methods = useForm<{
        deliveryInfo: DeliveryInfo;
        supplierHeader: SupplierHeader;
        wardrobes: Wardrobe[];
    }>({
        reValidateMode: "onChange",
        mode: "onChange",
        defaultValues: initialData
    });

    return (
        <FormProvider methods={methods}>
            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12, md: 6 }}>
                    <PurchaseOrderInfoCard/>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <DeliveryInformationCard/>
                </Grid>

                {
                    wardrobes.map((w, wIdx) => (
                        <Grid size={12} key={wIdx}>
                            {/* 1) Visual for THIS wardrobe */}
                            <Typography variant="h6" gutterBottom>
                                Wardrobe #{w.wardrobeNumber} Visual
                            </Typography>
                            <Divider sx={{ mb: 2 }}/>

                            <WardrobeVisual
                                wardrobe={w}
                            />

                            <WardrobeDetailsCard
                                wardrobe={w}
                                wardrobeIndex={wIdx}
                            />

                        </Grid>
                    ))}
            </Grid>

            <Button variant="contained" onClick={handleReview}>
                Review
            </Button>
        </FormProvider>
    );
}
