"use client";

import React from "react";
import Button from "@mui/material/Button";
import {Box, Card, CardContent, CardHeader, Chip, Grid, Stack} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ParsedResponse } from "@/types";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { formatDate } from "@/lib/utils";
import DoorCard from "@/components/DoorCard";
import AccessoryCard from "@/components/AccessoryCard";
import { EditOutlined, FileUploadOutlined } from "@mui/icons-material";
import DescriptionItem from "@/components/DescriptionItem";

type ReviewViewProps = {
    handleEdit: VoidFunction
    handleUpload: VoidFunction
}

const ReviewView = ({ handleEdit, handleUpload }: ReviewViewProps) => {
    const methods = useFormContext<ParsedResponse>();
    const wardrobes = methods.watch("wardrobes");
    const supplierHeader = methods.watch("supplierHeader");
    const deliveryInfo = methods.watch("deliveryInfo");

    const handleClickEdit = () => {
        handleEdit();
    };
    const handleClickUpload = () => {
        handleUpload();
    };

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Review
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
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

                                        <Stack spacing={2}>
  <Typography
    variant="subtitle1"
    sx={{ pb: 1, color: "text.secondary" }}
  >
    Accessories
  </Typography>

  <Stack direction="row" spacing={2} flexWrap="wrap">
    {wardrobes[wIdx].accessories.map((accessory, aIdx) => (
      <Box key={aIdx} sx={{ width: "50%" }}>
        <AccessoryCard accessory={accessory} />
      </Box>
    ))}
  </Stack>

  <Typography variant="subtitle1" sx={{ pt: 2, color: "text.secondary" }}>
    Mapped Line Item Codes
  </Typography>
  <Stack direction="row" spacing={1} flexWrap="wrap">
    {w.lineItems?.map((item, idx) => (
      <Chip key={idx} label={item.code} size="small" />
    ))}
  </Stack>
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
};

export default ReviewView;
