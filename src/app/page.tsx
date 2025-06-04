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
        "Review",
        "Done"
    ];

    const [activeStep, setActiveStep] = useState(0);

    const [files, setFiles] = useState<{ deliveryFile: File | null, supplierFile: File | null }>({
        deliveryFile: null,
        supplierFile: null
    });

    // Once the backend returns parsed JSON, we store it here
    const [parsedData, setParsedData] = useState<ParsedResponse | null>(null);

    const handleUpload = useCallback(({ deliveryFile, supplierFile }: { deliveryFile: File, supplierFile: File }) => {
        setFiles({ deliveryFile, supplierFile });
    }, []);

    // Whenever both deliveryFile and supplierFile are non-null, POST them together
    useEffect(() => {
        const uploadBoth = async (deliveryFile: File, supplierFile: File) => {
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
                setActiveStep(1);
            } catch (err) {
                console.error("Failed to load mock JSON:", err);
                // Optional: set an error state or roll back to a previous step
            }
        };

        if (!!files.deliveryFile && !!files.supplierFile) {
            uploadBoth(files.deliveryFile, files.supplierFile);
        }
    }, [files]);

    return (
        <Stack
            direction="row"
            sx={{
                height: "100vh",
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                    backgroundColor: "background.default",
                    width: "25%",
                    overflowY: "auto",
                }}
            >
                <Image
                    alt="global doors logo"
                    src="/global_doors_logo.png"
                    height={100}
                    width={100}
                    style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                    }}
                />
                <Stepper orientation="vertical" sx={{ p: 2 }} activeStep={activeStep}>
                    {
                        steps.map((value) => (
                            <Step key={value}>
                                <StepLabel>{value}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
            </Stack>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                }}
            >
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
                    {
                        activeStep === 0 && <UploadView handleUpload={handleUpload}/>
                    }
                    {
                        (activeStep === 1 || activeStep === 2) && (
                            <>
                                {
                                    parsedData
                                        ? <DetailedOrderView
                                            initialData={ParsedResponseSchema.parse(parsedData)}
                                            activeStep={activeStep}
                                            setActiveStep={setActiveStep}
                                        />
                                        : (
                                            <Box p={4}>
                                                <Typography color="error">
                                                    Parsing in progress or failed. Please wait…
                                                </Typography>
                                            </Box>
                                        )
                                }
                            </>
                        )
                    }
                    {
                        activeStep === 3 && (
                            <CompleteView
                                handleReset={() => setActiveStep(0)}/>
                        )
                    }
                </Container>
            </Box>
        </Stack>
    );
}
