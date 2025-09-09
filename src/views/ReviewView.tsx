"use client";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { EditOutlined, FileUploadOutlined, Settings } from "@mui/icons-material";
import DescriptionItem from "@/components/DescriptionItem";
import DoorCard from "@/components/DoorCard";
import AccessoryCard from "@/components/AccessoryCard";
import { MappedWardrobe, SalesOrder } from "@/types";
import { formatDate } from "@/lib/utils";
import useSubmitSale, { SalesOrderCreateInput } from "@/mutation/use-submit-sale";
import LoadingView from "@/views/LoadingView";

type ReviewViewProps = {
    handleOpenConfigDrawer: VoidFunction;
    salesOrder: SalesOrder;          // Step 1 data (wardrobes etc.)
    mapping: MappedWardrobe;      // Step 2 data (RequiredDate + Lines)
    handleEdit: VoidFunction;
    onSubmitSuccess: VoidFunction;
};

const ReviewView = ({ handleOpenConfigDrawer, salesOrder, mapping, handleEdit, onSubmitSuccess }: ReviewViewProps) => {
    const { supplierHeader, delivery, wardrobes } = salesOrder;

    const { mutate: submitSale, isPending } = useSubmitSale({
        onSuccess: () => {
            onSubmitSuccess();
        },
    });
    const uploadToUnleashed = async () => {
        const body: SalesOrderCreateInput = {
            customer_reference: mapping.CustomerReference || supplierHeader.orderNumber,
            required_date: mapping.RequiredDate, // "YYYY-MM-DD"
            delivery: {
                name: mapping.Delivery?.Name ?? delivery.customerName ?? "",
                address_line1: mapping.Delivery?.AddressLine1 ?? delivery.addressLine1 ?? "",
                city:
                    mapping.Delivery?.City ??
                    delivery.addressLine2 ??
                    delivery.addressLine3 ??
                    "",
                postcode: mapping.Delivery?.Postcode ?? delivery.addressLine3 ?? "",
                instructions: (mapping.Delivery?.Instructions ?? delivery.deliveryNotes ?? "").trim(),
            },
            lines: (mapping.Lines ?? []).map((l) => ({
                product_code: l.ProductCode,
                order_quantity: Number(l.OrderQuantity),
                comment: l.Comment && l.Comment.trim() ? l.Comment : null, // keep null if empty
                // unitPrice: ... // only include if your server requires it for a special SKU
            })),
            comments: null,
        };
        submitSale(body);
    };

    const messages = [
        "Uploading your line items...",
        "Analysing your line items...",
        "Extracting data...",
        "Finalising..."
    ];

    if (isPending) {
        return (
            <LoadingView messages={messages}/>
        )
    }

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Review
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Button startIcon={<EditOutlined/>} variant="outlined" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button
                        startIcon={<FileUploadOutlined/>}
                        variant="contained"
                        onClick={uploadToUnleashed}
                        disabled={isPending || !mapping}
                    >
                        {isPending ? "Uploading..." : "Upload to Unleashed"}
                    </Button>
                    <IconButton onClick={handleOpenConfigDrawer}>
                        <Settings/>
                    </IconButton>
                </Stack>
            </Stack>

            <Divider/>

            <Grid container spacing={2}>
                {/* Supplier PO */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardHeader title="Supplier Purchase Order Info"/>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <DescriptionItem label="Supplier Order #" value={supplierHeader.orderNumber}/>
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
                                    <DescriptionItem label="Net Goods" value={supplierHeader.netGoods}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Net Delivery" value={supplierHeader.netDelivery}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Discount %" value={supplierHeader.discountPercent}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Discount Amount" value={supplierHeader.discountAmount}/>
                                </Grid>
                                <Grid size={12}>
                                    <DescriptionItem
                                        label="Admin Charge"
                                        value={supplierHeader.supplierAdminCharge}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Net Total" value={supplierHeader.netTotal}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="VAT" value={supplierHeader.vat}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Gross Total" value={supplierHeader.grossTotal}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Delivery */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardHeader title="Delivery Information"/>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <DescriptionItem label="Customer Name" value={delivery.customerName}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Phone" value={delivery.customerPhone}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Address Line 1" value={delivery.addressLine1}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Address Line 2" value={delivery.addressLine2}/>
                                </Grid>
                                <Grid size={6}>
                                    <DescriptionItem label="Address Line 3" value={delivery.addressLine3}/>
                                </Grid>
                                <Grid size={12}>
                                    <DescriptionItem label="Delivery Notes" value={delivery.deliveryNotes}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Wardrobes */}
                {wardrobes.map((w, wIdx) => (
                    <Grid size={12} key={wIdx}>
                        <Card>
                            <CardHeader title={`Wardrobe #${w.wardrobeNumber} Details`}/>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <DescriptionItem
                                                label="Opening Width (mm)"
                                                value={w.dims.slidingOpeningWidth}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem
                                                label="Opening Height (mm)"
                                                value={w.dims.slidingOpeningHeight}
                                            />
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem label="Door Width (mm)" value={w.dims.doorWidth}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem label="Front Door Type" value={w.dims.frontDoorType}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem label="Rear Door Type" value={w.dims.rearDoorType}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem label="Framework Type" value={w.dims.frameworkType}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem label="Framework Colour" value={w.dims.frameworkColour}/>
                                        </Grid>
                                        <Grid size={6}>
                                            <DescriptionItem label="Track Length (mm)" value={w.dims.trackLength}/>
                                        </Grid>
                                    </Grid>

                                    {/* Door details */}
                                    <Stack>
                                        <Typography variant="subtitle1" sx={{ pb: 1, color: "text.secondary" }}>
                                            Door Details
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {w.doorDetails.map((doorDetail, dIdx) => (
                                                <Grid key={dIdx} size={3}>
                                                    <DoorCard door={doorDetail}/>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Stack>

                                    {/* Accessories (only if present) */}
                                    {!!w.accessories?.length && (
                                        <Stack spacing={2}>
                                            <Typography variant="subtitle1" sx={{ pb: 1, color: "text.secondary" }}>
                                                Accessories
                                            </Typography>
                                            <Stack direction="row" spacing={2} flexWrap="wrap">
                                                {w.accessories.map((accessory, aIdx) => (
                                                    <Box key={aIdx} sx={{ width: "50%" }}>
                                                        <AccessoryCard accessory={accessory}/>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Stack>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {/* Mapping summary (order-level) */}
                <Grid size={12}>
                    <Card>
                        <CardHeader
                            title="Mapped Line Items"
                            subheader={
                                mapping
                                    ? `Customer Reference: ${mapping.CustomerReference}`
                                    : "No mappings available"
                            }
                        />
                        {mapping && (
                            <CardContent>
                                <Stack spacing={2}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <DescriptionItem label="Required Date"
                                                             value={mapping.RequiredDate.toDateString()}/>
                                        </Grid>
                                    </Grid>

                                    <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mt: 1 }}>
                                        <thead>
                                        <tr>
                                            <th style={{ textAlign: "left", padding: 6, width: "40%" }}>Product Code
                                            </th>
                                            <th style={{ textAlign: "left", padding: 6, width: "15%" }}>Qty</th>
                                            <th style={{ textAlign: "left", padding: 6 }}>Comment</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {mapping.Lines.map((line, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: 6, verticalAlign: "top" }}>{line.ProductCode}</td>
                                                <td style={{
                                                    padding: 6,
                                                    verticalAlign: "top"
                                                }}>{line.OrderQuantity}</td>
                                                <td style={{ padding: 6, verticalAlign: "top" }}>
                                                    {line.Comment ?? "—"}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Box>
                                </Stack>
                            </CardContent>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default ReviewView;
