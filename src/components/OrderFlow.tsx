"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DetailedOrderView from "@/views/DetailedOrderView";
import StartView from "@/views/StartView";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
import UploadView from "@/views/UploadView";

type Step = 0 | 1 | 2;

export default function OrderFlow() {
    const [step, setStep] = useState<Step>(0);

    const [files, setFiles] = useState<{ deliveryFile: File | null, supplierFile: File | null }>({
        deliveryFile: null,
        supplierFile: null
    });

    // Once the backend returns parsed JSON, we store it here
    const [parsedData, setParsedData] = useState<ParsedResponse | null>(null);

    // Step 0 → Step 1: “Start New Order”
    const handleStart = useCallback(() => {
        setStep(1);
    }, []);

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
                setStep(2);
            } catch (err) {
                console.error("Failed to load mock JSON:", err);
                // Optional: set an error state or roll back to a previous step
            }
        };

        if (!!files.deliveryFile && !!files.supplierFile) {
            uploadBoth(files.deliveryFile, files.supplierFile);
        }
    }, [files]);

    switch (step) {
        case 0:
            return (
                <StartView handleStart={handleStart}/>
            );
        case 1:
            return (
                <UploadView handleUpload={handleUpload}/>
            );
        case 2:
            return parsedData
                ? <DetailedOrderView
                    initialData={ParsedResponseSchema.parse(parsedData)}
                />
                : (
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
