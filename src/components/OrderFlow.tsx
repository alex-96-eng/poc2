// src/components/OrderFlow.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import UploadStep from "./UploadStep";
import DetailedOrderView from "./DetailedOrderView";

type Step = 0 | 1 | 2 | 3;

export default function OrderFlow() {
  const [step, setStep] = useState<Step>(0);

  // Holds the Delivery PDF file once uploaded
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  // Holds the Supplier PDF file once uploaded
  const [supplierFile, setSupplierFile] = useState<File | null>(null);

  // Once the backend returns parsed JSON, we store it here
  const [parsedData, setParsedData] = useState<any>(null);

  // Step 0 → Step 1: “Start New Order”
  const handleStart = useCallback(() => {
    setStep(1);
  }, []);

  // Called by <UploadStep> when Delivery PDF is chosen
  const handleDeliveryUploaded = useCallback((file: File) => {
    setDeliveryFile(file);
    setStep(2);
  }, []);

  // Called by <UploadStep> when Supplier PDF is chosen
  const handleSupplierUploaded = useCallback((file: File) => {
    setSupplierFile(file);
    // Don’t POST here—wait for useEffect to see that both files are set
  }, []);

  // Whenever both deliveryFile and supplierFile are non-null, POST them together
  useEffect(() => {
    if (deliveryFile && supplierFile) {
      const uploadBoth = async () => {
        const formData = new FormData();
        formData.append("files", deliveryFile, deliveryFile.name);
        formData.append("files", supplierFile, supplierFile.name);
        // try {
        //   const res = await fetch("http://0.0.0.0:8000/api/v1/pdf/", {
        //     method: "POST",
        //     body: formData,
        //   });
        //   if (!res.ok) {
        //     throw new Error(`Server returned ${res.status}`);
        //   }
        //   const json = await res.json();
        //   setParsedData(json);
        //   setStep(3);
        // } catch (err) {
        //   console.error("Failed to parse PDFs:", err);
        //   // Optionally: reset to step 2 or show an error to the user
        // }
        try {
          // → Instead of "http://0.0.0.0:8000/api/v1/pdf/", use the public/mocks path:
          const res = await fetch("/mocks/orderData.json");
          if (!res.ok) {
            throw new Error(`Failed to load mock: ${res.status}`);
          }
          const json = await res.json();
          setParsedData(json);
          setStep(3);
        } catch (err) {
          console.error("Failed to load mock JSON:", err);
          // Optional: set an error state or roll back to a previous step
        }
      };
      uploadBoth();
    }
  }, [deliveryFile, supplierFile]);

  switch (step) {
    case 0:
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Start New Order
          </Typography>
          <Button variant="contained" onClick={handleStart}>
            Start
          </Button>
        </Box>
      );

    case 1:
      return (
        <UploadStep
          label="Upload Delivery PDF"
          onUploaded={handleDeliveryUploaded}
        />
      );

    case 2:
      return (
        <UploadStep
          label="Upload Supplier PDF"
          onUploaded={handleSupplierUploaded}
        />
      );

    case 3:
      return parsedData ? (
        <DetailedOrderView initialData={parsedData} />
      ) : (
        <Box p={4}>
          <Typography color="error">
            Parsing in progress or failed. Please wait…
          </Typography>
        </Box>
      );

    default:
      return null;
  }
}
