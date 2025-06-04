// src/components/Review.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface DeliveryInfo {
  orderNumber: string;
  dateOrdered: string;
  numberOfWardrobes: string;
  customerName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  customerPhone: string;
  deliveryNotes: string;
}

export interface SupplierHeader {
  orderNumber: string;
  dateOrdered: string;
  numberOfWardrobes: string;
  netGoods: string;
  netDelivery: string;
  discountPercent: string;
  discountAmount: string;
  supplierAdminCharge: string;
  netTotal: string;
  vat: string;
  grossTotal: string;
}

export interface WardrobeDims {
  slidingOpeningWidth: string;
  slidingOpeningHeight: string;
  frontDoorType: string;
  rearDoorType: string;
  frameworkType: string;
  frameworkColour: string;
  trackLength: string;
  doorWidth: string;
}

export interface DoorDetail {
  doorNumber: string;
  quantity: string;
  doorCost: string;
  softClose: string;
  doorPanel: string;
}

export interface Accessory {
  quantity: string;
  componentName: string;
  netCost: string;
}

export interface Wardrobe {
  wardrobeNumber: number;
  dims: WardrobeDims;
  doorDetails: DoorDetail[];
  accessories: Accessory[];
}

export interface ReviewData {
  deliveryInfo: DeliveryInfo;
  supplierHeader: SupplierHeader;
  wardrobes: Wardrobe[];
}

interface ReviewProps {
  data: ReviewData;
  onUpload: () => void;
}

const Review: React.FC<ReviewProps> = ({ data, onUpload }) => {
  const router = useRouter();
  const { deliveryInfo, supplierHeader, wardrobes } = data;

  return (
    <Box sx={{ bgcolor: "#f3f4f6", p: 2 }}>
      {/* === Supplier Header === */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Supplier Purchase Order Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Supplier Order #"
              value={supplierHeader.orderNumber}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Date Ordered"
              value={supplierHeader.dateOrdered}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="No. of Wardrobes"
              value={supplierHeader.numberOfWardrobes}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Net Goods"
              value={supplierHeader.netGoods}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Net Delivery"
              value={supplierHeader.netDelivery}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Discount %"
              value={supplierHeader.discountPercent}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Discount Amount"
              value={supplierHeader.discountAmount}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Admin Charge"
              value={supplierHeader.supplierAdminCharge}
              fullWidth
              size="small"
              sx={{ gridColumn: "1 / -1" }}
              disabled
            />
            <TextField
              label="Net Total"
              value={supplierHeader.netTotal}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="VAT"
              value={supplierHeader.vat}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Gross Total"
              value={supplierHeader.grossTotal}
              fullWidth
              size="small"
              disabled
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* === Delivery Info === */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Delivery Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, 1fr)",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Order Number"
              value={deliveryInfo.orderNumber}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Date Ordered"
              value={deliveryInfo.dateOrdered}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="No. of Wardrobes"
              value={deliveryInfo.numberOfWardrobes}
              fullWidth
              size="small"
              disabled
            />
            <TextField
              label="Customer Name"
              value={deliveryInfo.customerName}
              fullWidth
              size="small"
              disabled
              sx={{ gridColumn: { xs: "1 / -1", sm: "1 / 3", md: "1 / 3" } }}
            />
            <TextField
              label="Phone"
              value={deliveryInfo.customerPhone}
              fullWidth
              size="small"
              disabled
              sx={{ gridColumn: { xs: "1 / -1", sm: "2 / 4", md: "3 / 4" } }}
            />
            <TextField
              label="Address Line 1"
              value={deliveryInfo.addressLine1}
              fullWidth
              size="small"
              disabled
              sx={{ gridColumn: "1 / -1" }}
            />
            <TextField
              label="Address Line 2"
              value={deliveryInfo.addressLine2}
              fullWidth
              size="small"
              disabled
              sx={{
                gridColumn: { xs: "1 / -1", sm: "1 / 3", md: "1 / 3" },
              }}
            />
            <TextField
              label="Address Line 3"
              value={deliveryInfo.addressLine3}
              fullWidth
              size="small"
              disabled
              sx={{
                gridColumn: { xs: "1 / -1", sm: "3 / 4", md: "3 / 4" },
              }}
            />
            <TextField
              label="Delivery Notes"
              value={deliveryInfo.deliveryNotes}
              fullWidth
              multiline
              minRows={3}
              size="small"
              disabled
              sx={{ gridColumn: "1 / -1" }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* ==== Wardrobes: N items ==== */}
      {wardrobes.map((w, wIdx) => (
        <Accordion key={wIdx} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Wardrobe #{w.wardrobeNumber}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Dimensions */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Dimensions
            </Typography>
            <Box
              component="form"
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(3, 1fr)",
                },
                mb: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Opening Width (mm)"
                value={w.dims.slidingOpeningWidth}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Opening Height (mm)"
                value={w.dims.slidingOpeningHeight}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Door Width (mm)"
                value={w.dims.doorWidth}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Front Door Type"
                value={w.dims.frontDoorType}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Rear Door Type"
                value={w.dims.rearDoorType}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Framework Type"
                value={w.dims.frameworkType}
                fullWidth
                size="small"
                disabled
              />
              <TextField
                label="Framework Colour"
                value={w.dims.frameworkColour}
                fullWidth
                size="small"
                disabled
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "1 / 3", md: "1 / 3" },
                }}
              />
              <TextField
                label="Track Length (mm)"
                value={w.dims.trackLength}
                fullWidth
                size="small"
                disabled
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "3 / 4", md: "3 / 4" },
                }}
              />
            </Box>

            {/* Door Details */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Door Details
            </Typography>
            {w.doorDetails.map((door, dIdx) => (
              <Paper
                key={dIdx}
                elevation={1}
                sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 1 }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  {door.doorNumber}
                </Typography>
                <Box
                  component="form"
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                      md: "repeat(4, 1fr)",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Door #"
                    value={door.doorNumber}
                    fullWidth
                    size="small"
                    disabled
                  />
                  <TextField
                    label="Quantity"
                    value={door.quantity}
                    fullWidth
                    size="small"
                    disabled
                  />
                  <TextField
                    label="Door Cost"
                    value={door.doorCost}
                    fullWidth
                    size="small"
                    disabled
                  />
                  <TextField
                    label="Door Panel"
                    value={door.doorPanel}
                    fullWidth
                    size="small"
                    disabled
                  />
                  <TextField
                    label="Soft Close"
                    value={door.softClose}
                    fullWidth
                    size="small"
                    disabled
                    sx={{ gridColumn: { md: "1 / 5" } }}
                  />
                </Box>
              </Paper>
            ))}

            {/* Accessories */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Accessories
            </Typography>
            {w.accessories.map((acc, aIdx) => (
              <Paper
                key={aIdx}
                elevation={1}
                sx={{ p: 2, mb: 2, border: "1px solid #ddd", borderRadius: 1 }}
              >
                <Box
                  component="form"
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Quantity"
                    value={acc.quantity}
                    fullWidth
                    size="small"
                    disabled
                  />
                  <TextField
                    label="Component Name"
                    value={acc.componentName}
                    fullWidth
                    size="small"
                    disabled
                    sx={{ gridColumn: { md: "1 / 3" } }}
                  />
                  <TextField
                    label="Net Cost"
                    value={acc.netCost}
                    fullWidth
                    size="small"
                    disabled
                    sx={{ gridColumn: { md: "3 / 4" } }}
                  />
                </Box>
              </Paper>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* === Final Buttons === */}
      <Box
        textAlign="center"
        sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            router.push("/?step=3");
          }}
        >
          Edit
        </Button>
        <Button variant="contained" onClick={onUpload}>
          Upload to Unleashed
        </Button>
      </Box>
    </Box>
  );
};

export default Review;
