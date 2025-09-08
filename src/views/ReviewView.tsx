"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { EditOutlined, FileUploadOutlined } from "@mui/icons-material";
import DescriptionItem from "@/components/DescriptionItem";
import DoorCard from "@/components/DoorCard";
import AccessoryCard from "@/components/AccessoryCard";
import { ParsedResponse, MappedWardrobe } from "@/types";
import { formatDate } from "@/lib/utils";

type ReviewViewProps = {
  salesOrder: ParsedResponse;          // Step 1 data (wardrobes etc.)
  mapping: MappedWardrobe | null;      // Step 2 data (RequiredDate + Lines)
  handleEdit: VoidFunction;
  handleUpload: VoidFunction;          // Called AFTER successful upload (e.g., advance to success)
};

const ReviewView = ({ salesOrder, mapping, handleEdit, handleUpload }: ReviewViewProps) => {
  const { supplierHeader, delivery, wardrobes } = salesOrder;
  const [isUploading, setIsUploading] = React.useState(false);

  const uploadToUnleashed = async () => {
    if (!mapping) {
      alert("No mapped data to upload. Please complete the mapping step first.");
      return;
    }
    if (!mapping.RequiredDate) {
      alert("Required Date is missing. Please set it in Mapped Line Items.");
      return;
    }
    if (!mapping.Lines || mapping.Lines.length === 0) {
      alert("There are no mapped lines to upload.");
      return;
    }

    // Build camelCase payload (backend handles aliasing)
    // Build PascalCase payload (backend expects aliases)
    const body = {
      CustomerReference: mapping.CustomerReference || supplierHeader.orderNumber,
      RequiredDate: mapping.RequiredDate, // "YYYY-MM-DD"
      Delivery: {
        Name: mapping.Delivery?.Name ?? delivery.customerName ?? "",
        AddressLine1: mapping.Delivery?.AddressLine1 ?? delivery.addressLine1 ?? "",
        City: mapping.Delivery?.City ?? delivery.addressLine2 ?? delivery.addressLine3 ?? "",
        Postcode: mapping.Delivery?.Postcode ?? delivery.addressLine3 ?? "",
        Instructions:
          mapping.Delivery?.Instructions ??
          delivery.deliveryNotes ??
          "",
      },
      Lines: mapping.Lines.map((l) => ({
        ProductCode: l.ProductCode,
        OrderQuantity: Number(l.OrderQuantity),
        Comment: l.Comment ?? "",
        // UnitPrice intentionally omitted
      })),
      Comments: null,
    };

    setIsUploading(true);
    try {
      const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/sales-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(text);
        alert("Upload failed:\n" + text);
        setIsUploading(false);
        return;
        }

      // Success — let parent move to the success step
      handleUpload();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Review
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button startIcon={<EditOutlined />} variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            startIcon={<FileUploadOutlined />}
            variant="contained"
            onClick={uploadToUnleashed}
            disabled={isUploading || !mapping}
          >
            {isUploading ? "Uploading..." : "Upload to Unleashed"}
          </Button>
        </Stack>
      </Stack>

      <Divider />

      <Grid container spacing={2}>
        {/* Supplier PO */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Supplier Purchase Order Info" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <DescriptionItem label="Supplier Order #" value={supplierHeader.orderNumber} />
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
                  <DescriptionItem label="Net Goods" value={supplierHeader.netGoods} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Net Delivery" value={supplierHeader.netDelivery} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Discount %" value={supplierHeader.discountPercent} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Discount Amount" value={supplierHeader.discountAmount} />
                </Grid>
                <Grid size={12}>
                  <DescriptionItem
                    label="Admin Charge"
                    value={supplierHeader.supplierAdminCharge}
                  />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Net Total" value={supplierHeader.netTotal} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="VAT" value={supplierHeader.vat} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Gross Total" value={supplierHeader.grossTotal} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Delivery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Delivery Information" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <DescriptionItem label="Customer Name" value={delivery.customerName} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Phone" value={delivery.customerPhone} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Address Line 1" value={delivery.addressLine1} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Address Line 2" value={delivery.addressLine2} />
                </Grid>
                <Grid size={6}>
                  <DescriptionItem label="Address Line 3" value={delivery.addressLine3} />
                </Grid>
                <Grid size={12}>
                  <DescriptionItem label="Delivery Notes" value={delivery.deliveryNotes} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Wardrobes */}
        {wardrobes.map((w, wIdx) => (
          <Grid size={12} key={wIdx}>
            <Card>
              <CardHeader title={`Wardrobe #${w.wardrobeNumber} Details`} />
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
                      <DescriptionItem label="Door Width (mm)" value={w.dims.doorWidth} />
                    </Grid>
                    <Grid size={6}>
                      <DescriptionItem label="Front Door Type" value={w.dims.frontDoorType} />
                    </Grid>
                    <Grid size={6}>
                      <DescriptionItem label="Rear Door Type" value={w.dims.rearDoorType} />
                    </Grid>
                    <Grid size={6}>
                      <DescriptionItem label="Framework Type" value={w.dims.frameworkType} />
                    </Grid>
                    <Grid size={6}>
                      <DescriptionItem label="Framework Colour" value={w.dims.frameworkColour} />
                    </Grid>
                    <Grid size={6}>
                      <DescriptionItem label="Track Length (mm)" value={w.dims.trackLength} />
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
                          <DoorCard door={doorDetail} />
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
                            <AccessoryCard accessory={accessory} />
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
                      <DescriptionItem label="Required Date" value={mapping.RequiredDate} />
                    </Grid>
                  </Grid>

                  <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mt: 1 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: 6, width: "40%" }}>Product Code</th>
                        <th style={{ textAlign: "left", padding: 6, width: "15%" }}>Qty</th>
                        <th style={{ textAlign: "left", padding: 6 }}>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mapping.Lines.map((line, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: 6, verticalAlign: "top" }}>{line.ProductCode}</td>
                          <td style={{ padding: 6, verticalAlign: "top" }}>{line.OrderQuantity}</td>
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
