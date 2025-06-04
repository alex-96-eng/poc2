// src/components/DetailedOrderView.tsx
"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface DeliveryInfo {
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

interface SupplierHeader {
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

interface WardrobeDims {
  slidingOpeningWidth: string;
  slidingOpeningHeight: string;
  frontDoorType: string;
  rearDoorType: string;
  frameworkType: string;
  frameworkColour: string;
  trackLength: string;
  doorWidth: string;
}

interface DoorDetail {
  doorNumber: string;
  quantity: string;
  doorCost: string;
  softClose: string;
  doorPanel: string;
}

interface Accessory {
  quantity: string;
  componentName: string;
  netCost: string;
}

interface Wardrobe {
  wardrobeNumber: number;
  dims: WardrobeDims;
  doorDetails: DoorDetail[];
  accessories: Accessory[];
}

interface ParsedResponse {
  deliveryInfo: DeliveryInfo;
  supplierHeader: SupplierHeader;
  wardrobes: Wardrobe[];
}

interface DetailedOrderViewProps {
  initialData: ParsedResponse;
}

export default function DetailedOrderView({ initialData }: DetailedOrderViewProps) {
  // Initialize all state from the server‐parsed JSON
  const [deliveryInfo, setDeliveryInfo] = useState(initialData.deliveryInfo);
  const [supplierHeader, setSupplierHeader] = useState(initialData.supplierHeader);
  const [wardrobes, setWardrobes] = useState<Wardrobe[]>(initialData.wardrobes);

  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSupplierHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSupplierHeader((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWardrobeDimChange = (
    wIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newArr = [...wardrobes];
    newArr[wIndex] = {
      ...newArr[wIndex],
      dims: {
        ...newArr[wIndex].dims,
        [e.target.name]: e.target.value,
      },
    };
    setWardrobes(newArr);
  };

  const handleDoorDetailChange = (
    wIndex: number,
    dIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newArr = [...wardrobes];
    const updatedDoors = [...newArr[wIndex].doorDetails];
    updatedDoors[dIndex] = {
      ...updatedDoors[dIndex],
      [e.target.name]: e.target.value,
    };
    newArr[wIndex] = {
      ...newArr[wIndex],
      doorDetails: updatedDoors,
    };
    setWardrobes(newArr);
  };

  const handleAccessoryChange = (
    wIndex: number,
    aIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newArr = [...wardrobes];
    const updatedAcc = [...newArr[wIndex].accessories];
    updatedAcc[aIndex] = {
      ...updatedAcc[aIndex],
      [e.target.name]: e.target.value,
    };
    newArr[wIndex] = {
      ...newArr[wIndex],
      accessories: updatedAcc,
    };
    setWardrobes(newArr);
  };

  const handleReview = () => {
    // If you still want to re‐encode & push to /review, do so here
    const combined = { deliveryInfo, supplierHeader, wardrobes };
    const json = encodeURIComponent(JSON.stringify(combined));
    window.location.href = `/review?data=${json}`;
  };

  return (
    <Box sx={{ bgcolor: "#f3f4f6", p: 2 }}>
      {/* SUPPLIER HEADER & DELIVERY INFO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        {/* Supplier Header */}
        <Box
          sx={{
            flexBasis: { xs: "100%", md: "40%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Paper elevation={2} sx={{ bgcolor: "#ffffff", p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Supplier Purchase Order Info
            </Typography>
            <Divider sx={{ mb: 2 }} />
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
                name="orderNumber"
                value={supplierHeader.orderNumber}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Date Ordered"
                name="dateOrdered"
                value={supplierHeader.dateOrdered}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="No. of Wardrobes"
                name="numberOfWardrobes"
                value={supplierHeader.numberOfWardrobes}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Net Goods"
                name="netGoods"
                value={supplierHeader.netGoods}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Net Delivery"
                name="netDelivery"
                value={supplierHeader.netDelivery}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Discount %"
                name="discountPercent"
                value={supplierHeader.discountPercent}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Discount Amount"
                name="discountAmount"
                value={supplierHeader.discountAmount}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Admin Charge"
                name="supplierAdminCharge"
                value={supplierHeader.supplierAdminCharge}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
                sx={{ gridColumn: "1 / -1" }}
              />
              <TextField
                label="Net Total"
                name="netTotal"
                value={supplierHeader.netTotal}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="VAT"
                name="vat"
                value={supplierHeader.vat}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Gross Total"
                name="grossTotal"
                value={supplierHeader.grossTotal}
                onChange={handleSupplierHeaderChange}
                fullWidth
                size="small"
              />
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ bgcolor: "#ffffff", p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
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
                name="orderNumber"
                value={deliveryInfo.orderNumber}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Date Ordered"
                name="dateOrdered"
                value={deliveryInfo.dateOrdered}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
              />
              <TextField
                label="No. of Wardrobes"
                name="numberOfWardrobes"
                value={deliveryInfo.numberOfWardrobes}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Customer Name"
                name="customerName"
                value={deliveryInfo.customerName}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
                sx={{ gridColumn: { xs: "1 / -1", sm: "1 / 3", md: "1 / 3" } }}
              />
              <TextField
                label="Phone"
                name="customerPhone"
                value={deliveryInfo.customerPhone}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
                sx={{ gridColumn: { xs: "1 / -1", sm: "2 / 4", md: "3 / 4" } }}
              />
              <TextField
                label="Address Line 1"
                name="addressLine1"
                value={deliveryInfo.addressLine1}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
                sx={{ gridColumn: "1 / -1" }}
              />
              <TextField
                label="Address Line 2"
                name="addressLine2"
                value={deliveryInfo.addressLine2}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "1 / 3", md: "1 / 3" },
                }}
              />
              <TextField
                label="Address Line 3"
                name="addressLine3"
                value={deliveryInfo.addressLine3}
                onChange={handleDeliveryChange}
                fullWidth
                size="small"
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "3 / 4", md: "3 / 4" },
                }}
              />
              <TextField
                label="Delivery Notes"
                name="deliveryNotes"
                value={deliveryInfo.deliveryNotes}
                onChange={handleDeliveryChange}
                fullWidth
                multiline
                minRows={3}
                size="small"
                sx={{ gridColumn: "1 / -1" }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* ==== WARDROBE SECTIONS: each with its own visual AND form ==== */}
      {wardrobes.map((w, wIdx) => (
        <Box key={wIdx} sx={{ mb: 6 }}>
          {/* 1) Visual for THIS wardrobe */}
          <Typography variant="h6" gutterBottom>
            Wardrobe #{w.wardrobeNumber} Visual
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              mb: 4,
            }}
          >
            {w.doorDetails.map((door, dIdx) => (
              <Box
                key={dIdx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 150,
                    height: 375,
                    bgcolor: "#f9f9f9",
                    border: "2px solid #374151",
                  }}
                >
                  {/* Vertical dashed line */}
                  <Box
                    sx={{
                      position: "absolute",
                      right: -25,
                      top: 0,
                      height: "100%",
                      width: 0,
                      borderRight: "1px dashed #6b7280",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      right: -70,
                      top: "50%",
                      transform: "translateY(-50%) rotate(90deg)",
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  >
                    {w.dims.slidingOpeningHeight} mm
                  </Typography>

                  {/* Horizontal dashed line */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -25,
                      left: 0,
                      width: "100%",
                      height: 0,
                      borderBottom: "1px dashed #6b7280",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      bottom: -50,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  >
                    {w.dims.doorWidth} mm
                  </Typography>

                  {/* Door panel label */}
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      top: -28,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  >
                    {door.doorPanel}
                  </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                  {door.doorNumber}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* 2) Editable form for THIS wardrobe */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Wardrobe #{w.wardrobeNumber} Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

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
                mb: 3,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Opening Width (mm)"
                name="slidingOpeningWidth"
                value={w.dims.slidingOpeningWidth}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Opening Height (mm)"
                name="slidingOpeningHeight"
                value={w.dims.slidingOpeningHeight}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Door Width (mm)"
                name="doorWidth"
                value={w.dims.doorWidth}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Front Door Type"
                name="frontDoorType"
                value={w.dims.frontDoorType}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Rear Door Type"
                name="rearDoorType"
                value={w.dims.rearDoorType}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Framework Type"
                name="frameworkType"
                value={w.dims.frameworkType}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Framework Colour"
                name="frameworkColour"
                value={w.dims.frameworkColour}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
              />
              <TextField
                label="Track Length (mm)"
                name="trackLength"
                value={w.dims.trackLength}
                onChange={(e) => handleWardrobeDimChange(wIdx, e)}
                fullWidth
                size="small"
                sx={{
                  gridColumn: { xs: "1 / -1", sm: "1 / 3", md: "1 / 3" },
                }}
              />
            </Box>

            {/* Door Details */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Door Details
            </Typography>
            {w.doorDetails.map((door, dIdx) => (
              <Box
                key={dIdx}
                component="form"
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr 1fr",
                    md: "repeat(4, 1fr)",
                  },
                  mb: 3,
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Door #"
                  name="doorNumber"
                  value={door.doorNumber}
                  onChange={(e) => handleDoorDetailChange(wIdx, dIdx, e)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={door.quantity}
                  onChange={(e) => handleDoorDetailChange(wIdx, dIdx, e)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Door Cost"
                  name="doorCost"
                  value={door.doorCost}
                  onChange={(e) => handleDoorDetailChange(wIdx, dIdx, e)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Door Panel"
                  name="doorPanel"
                  value={door.doorPanel}
                  onChange={(e) => handleDoorDetailChange(wIdx, dIdx, e)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Soft Close"
                  name="softClose"
                  value={door.softClose}
                  onChange={(e) => handleDoorDetailChange(wIdx, dIdx, e)}
                  fullWidth
                  size="small"
                  sx={{ gridColumn: { md: "1 / 5" } }}
                />
              </Box>
            ))}

            {/* Accessories */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Accessories
            </Typography>
            {w.accessories.map((acc, aIdx) => (
              <Box
                key={aIdx}
                component="form"
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "repeat(3, 1fr)",
                  },
                  mb: 3,
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={acc.quantity}
                  onChange={(e) => handleAccessoryChange(wIdx, aIdx, e)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Component Name"
                  name="componentName"
                  value={acc.componentName}
                  onChange={(e) => handleAccessoryChange(wIdx, aIdx, e)}
                  fullWidth
                  size="small"
                  sx={{ gridColumn: { md: "1 / 3" } }}
                />
                <TextField
                  label="Net Cost"
                  name="netCost"
                  value={acc.netCost}
                  onChange={(e) => handleAccessoryChange(wIdx, aIdx, e)}
                  fullWidth
                  size="small"
                  sx={{ gridColumn: { md: "3 / 4" } }}
                />
              </Box>
            ))}
          </Paper>
        </Box>
      ))}

      {/* Review Button */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Button variant="contained" onClick={handleReview}>
          Review
        </Button>
      </Box>
    </Box>
  );
}
