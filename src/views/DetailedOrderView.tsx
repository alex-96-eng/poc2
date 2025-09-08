"use client";

import { useState } from "react";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { MappedWardrobe, SalesOrder, SalesOrderInput, SalesOrderSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmDetailsView from "@/views/ConfirmDetailsView";
import ConfirmMappingsView from "@/views/ConfirmMappingsView";
import ReviewView from "@/views/ReviewView";
import useMapPdf from "@/mutation/use-map-pdf";

type Props = {
    initialData: SalesOrder;
    activeStep: number;
    setActiveStep: (step: number) => void;
    handleOpenConfigDrawer: VoidFunction;
};

export default function DetailedOrderView({ initialData, activeStep, setActiveStep, handleOpenConfigDrawer }: Props) {
    // Step 1 form
    const methods = useForm<SalesOrderInput>({
        defaultValues: initialData,
        resolver: zodResolver(SalesOrderSchema),
        mode: "onChange",
    });

    // Step 2 mapped payload
    const [mappedData, setMappedData] = useState<MappedWardrobe | null>(null);

    const { mutate: map } = useMapPdf({
        onSuccess: (data) => {
            setMappedData(data);
            setActiveStep(2);
        }
    });
    const handleMap = async () => {
        const payload = methods.getValues();
        map(SalesOrderSchema.parse(payload));
    };

    const handleUploadToBackend = async () => {
        // Final upload should use mappedData (step 2 result)
        if (!mappedData) {
            alert("No mapped data to upload.");
            return;
        }
        try {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/sales-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mappedData),
            });
            if (!res.ok) {
                const text = await res.text();
                console.error(text);
                alert("Upload failed:\n" + text);
                return;
            }
            setActiveStep(4); // success
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed: " + (err as Error).message);
        }
    };

    return (
        <>
            {activeStep === 1 && (
                <FormProvider methods={methods}>
                    <ConfirmDetailsView
                        handleOpenConfigDrawer={handleOpenConfigDrawer}
                        handleReset={() => {
                            methods.reset();
                            setActiveStep(0);
                        }}
                        handleNext={() => setActiveStep(2)}
                        // Validate step 1 then run mapping
                        handleClick={() => methods.handleSubmit(handleMap)()}
                    />
                </FormProvider>
            )}

            {activeStep === 2 && mappedData && (
                <ConfirmMappingsView
                    initial={mappedData}
                    handleOpenConfigDrawer={handleOpenConfigDrawer}
                    handleBack={() => setActiveStep(1)}
                    handleNext={() => setActiveStep(3)}
                    onSave={(edited) => setMappedData(edited)} // keep any user edits
                />
            )}

            {activeStep === 3 && (
                <ReviewView
                    handleOpenConfigDrawer={handleOpenConfigDrawer}
                    salesOrder={methods.getValues()}      // step 1 values (SalesOrder)
                    mapping={mappedData}                  // step 2 mapping payload
                    handleEdit={() => setActiveStep(2)}
                    handleUpload={handleUploadToBackend}
                />
            )}
        </>
    );
}
