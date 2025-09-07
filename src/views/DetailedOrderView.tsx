"use client";

import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmDetailsView from "@/views/ConfirmDetailsView";
import ConfirmMappingsView from "@/views/ConfirmMappingsView";
import ReviewView from "@/views/ReviewView";


type Props = {
    handleOpenConfigDrawer: VoidFunction;
    initialData: ParsedResponse;
    activeStep: number;
    setActiveStep: (step: number) => void;
};

export default function DetailedOrderView({ handleOpenConfigDrawer, initialData, activeStep, setActiveStep }: Props) {
    const methods = useForm<ParsedResponse>({
        defaultValues: initialData,
        resolver: zodResolver(ParsedResponseSchema),
        mode: "onChange",
    });

    const handleUploadToBackend = async () => {
        const payload = methods.getValues();
        try {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/map", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            console.log(payload);
            if (!res.ok) {
                const text = await res.text();
                console.log(text);
            }

            setActiveStep(4); // success
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed: " + (err as Error).message);
        }
    };

    return (
        <FormProvider methods={methods}>
            {
                activeStep === 1 && (
                    <ConfirmDetailsView
                        handleOpenConfigDrawer={handleOpenConfigDrawer}
                        handleReset={() => {
                            methods.reset();
                            setActiveStep(0);
                        }}
                        handleNext={() => setActiveStep(2)}
                    />
                )
            }
            {
                activeStep === 2 && (
                    <ConfirmMappingsView
                        handleBack={() => setActiveStep(1)}
                        handleNext={() => setActiveStep(3)}
                    />
                )
            }
            {
                activeStep === 3 && (
                    <ReviewView
                        handleEdit={() => setActiveStep(1)}
                        handleUpload={handleUploadToBackend}
                    />
                )
            }
        </FormProvider>
    );
}
