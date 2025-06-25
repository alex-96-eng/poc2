"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Image from "next/image";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
import UploadView from "@/views/UploadView";
import DetailedOrderView from "@/views/DetailedOrderView";
import CompleteView from "@/views/CompleteView";

export default function Page() {
  const steps = [
    "Upload Files",
    "Confirm Details",
    "Confirm Mappings",
    "Review",
    "Done",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [parsedData, setParsedData] = useState<ParsedResponse | null>(null);
  // const [files, setFiles] = useState<{ deliveryFile: File | null; supplierFile: File | null }>({
  //   deliveryFile: null,
  //   supplierFile: null,
  // });
  // const handleUpload = useCallback(
  //   ({ deliveryFile, supplierFile }: { deliveryFile: File; supplierFile: File }) => {
  //     setFiles({ deliveryFile, supplierFile });
  //   },
  //   []
  // );
  // useEffect(() => {
  //   if (files.deliveryFile && files.supplierFile) {
  //     fetch("/mocks/orderData.json")
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setParsedData(json);
  //         setActiveStep(1); // jump to Confirm Details
  //       })
  //       .catch(() => {
  //         console.error("Failed to load mock JSON");
  //       });
  //   }
  // }, [files]);
     const handleUpload = useCallback(
      async ({ deliveryFile, supplierFile }: { deliveryFile: File; supplierFile: File }) => {
        const formData = new FormData();
        formData.append("files", deliveryFile);
        formData.append("files", supplierFile);
        try {
          const res = await fetch("http://0.0.0.0:8000/api/v1/pdf", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Parsing failed: ${errorText}`);
          }

          const json = await res.json();
          setParsedData(json);
          setActiveStep(1); // jump to Confirm Details
        } catch (err) {
          console.error("Upload failed:", err);
          alert("Upload failed. Please try again.");
        }
      },
      []
  );
  return (
    <Stack direction="row" sx={{ height: "100vh" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "background.default", width: "25%", overflowY: "auto" }}
      >
        <Image
          alt="global doors logo"
          src="/global_doors_logo.png"
          height={100}
          width={100}
          style={{ position: "absolute", top: 16, left: 16 }}
        />
        <Stepper orientation="vertical" sx={{ p: 2 }} activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Container
          maxWidth="md"
          sx={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            py: 4,
            backgroundColor: "background.paper",
          }}
        >
          {activeStep === 0 && <UploadView handleUpload={handleUpload} />}
          {parsedData && activeStep > 0 && activeStep < 4 && (
            <DetailedOrderView
              initialData={ParsedResponseSchema.parse(parsedData)}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 4 && <CompleteView handleReset={() => setActiveStep(0)} />}
        </Container>
      </Box>
    </Stack>
  );
}
