"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import WardrobeDetailsForm from "@/components/WardrobeDetailsForm";
import WardrobeVisual from "@/components/WardrobeVisual";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import PurchaseOrderInfoForm from "@/components/PurchaseOrderInfoForm";
import DeliveryInformationForm from "@/components/DeliveryInformationForm";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { formatDate } from "@/lib/utils";
import DoorCard from "@/components/DoorCard";
import AccessoryCard from "@/components/AccessoryCard";
import { CheckOutlined, EditOutlined, FileUploadOutlined } from "@mui/icons-material";

type DescriptionItemProps = {
    label: string;
    value: string | number;
}
const DescriptionItem = ({ label, value }: DescriptionItemProps) => {
    return (
        <Stack>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {label}
            </Typography>
            <Typography variant="body2">
                {value}
            </Typography>
        </Stack>
    );
};
type DetailedOrderViewProps = {
    initialData: ParsedResponse;
}

export default function DetailedOrderView({ initialData }: DetailedOrderViewProps) {
    const methods = useForm<ParsedResponse>({
        reValidateMode: "onChange",
        mode: "onChange",
        defaultValues: initialData,
        resolver: zodResolver(ParsedResponseSchema)
    });

    const wardrobes = methods.watch("wardrobes");
    const supplierHeader = methods.watch("supplierHeader");
    const deliveryInfo = methods.watch("deliveryInfo");

    const [isReviewMode, setIsReviewMode] = useState(false);
    const handleClickReview = methods.handleSubmit(() => {
        setIsReviewMode(true);
    });

    const renderForm = (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Review
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button startIcon={<CheckOutlined/>} variant="contained" onClick={handleClickReview}>
                        Review
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

    const handleClickEdit = () => {
        setIsReviewMode(false);
    };
    const handleClickUpload = () => {
        alert("DONE!");
    };

    const renderReview = (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Review
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button startIcon={<EditOutlined/>} variant="outlined" onClick={handleClickEdit}>
                        Edit
                    </Button>
                    <Button startIcon={<FileUploadOutlined/>} variant="contained" onClick={handleClickUpload}>
                        Upload to Unleashed
                    </Button>
                </Stack>
            </Stack>
            <Divider/>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardHeader title="Supplier Purchase Order Info"/>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Supplier Order #"
                                        value={supplierHeader.orderNumber}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Date Ordered"
                                        value={formatDate(supplierHeader.dateOrdered)}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <DescriptionItem
                                        label="No. of Wardrobes"
                                        value={supplierHeader.numberOfWardrobes}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Net Goods"
                                        value={supplierHeader.netGoods}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Net Delivery"
                                        value={supplierHeader.netDelivery}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Discount %"
                                        value={supplierHeader.discountPercent}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Discount Amount"
                                        value={supplierHeader.discountAmount}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <DescriptionItem
                                        label="Admin Charge"
                                        value={supplierHeader.supplierAdminCharge}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Net Total"
                                        value={supplierHeader.netTotal}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="VAT"
                                        value={supplierHeader.vat}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Gross Total"
                                        value={supplierHeader.grossTotal}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardHeader title="Delivery Information"/>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Order Number"
                                        value={deliveryInfo.orderNumber}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Date Ordered"
                                        value={formatDate(deliveryInfo.dateOrdered)}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="No. of Wardrobes"
                                        value={deliveryInfo.numberOfWardrobes}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Customer Name"
                                        value={deliveryInfo.customerName}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Phone"
                                        value={deliveryInfo.customerPhone}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Address Line 1"
                                        value={deliveryInfo.addressLine1}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Address Line 2"
                                        value={deliveryInfo.addressLine2}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem
                                        label="Address Line 3"
                                        value={deliveryInfo.addressLine3}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <DescriptionItem
                                        label="Delivery Notes"
                                        value={deliveryInfo.deliveryNotes}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {
                    wardrobes.map((w, wIdx) => (
                        <Grid size={12} key={wIdx}>
                            <Card>
                                <CardHeader title={`Wardrobe #${w.wardrobeNumber} Details`}/>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Opening Width (mm)"
                                                    value={wardrobes[wIdx].dims.slidingOpeningWidth}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Opening Height (mm)"
                                                    value={wardrobes[wIdx].dims.slidingOpeningHeight}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Door Width (mm)"
                                                    value={wardrobes[wIdx].dims.doorWidth}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Front Door Type"
                                                    value={wardrobes[wIdx].dims.frontDoorType}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Rear Door Type"
                                                    value={wardrobes[wIdx].dims.rearDoorType}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Framework Type"
                                                    value={wardrobes[wIdx].dims.frameworkType}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Framework Colour"
                                                    value={wardrobes[wIdx].dims.frameworkColour}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <DescriptionItem
                                                    label="Track Length (mm)"
                                                    value={wardrobes[wIdx].dims.trackLength}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Stack>
                                            <Typography variant="subtitle1" sx={{ pb: 1, color: "text.secondary" }}>
                                                Door Details
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {
                                                    wardrobes[wIdx].doorDetails.map((doorDetail, dIdx) => (
                                                        <Grid key={dIdx} size={3}>
                                                            <DoorCard door={doorDetail}/>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        </Stack>

                                        <Stack>
                                            <Typography variant="subtitle1" sx={{ pb: 1, color: "text.secondary" }}>
                                                Accessories
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {
                                                    wardrobes[wIdx].accessories.map((accessory, aIdx) => (
                                                        <Grid key={aIdx} size={6}>
                                                            <AccessoryCard accessory={accessory}/>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        </Stack>

                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Stack>
    );

    return (
        <FormProvider methods={methods} style={{ width: "100%" }}>
            {
                isReviewMode
                    ? renderReview
                    : renderForm
            }
        </FormProvider>
    );
}
