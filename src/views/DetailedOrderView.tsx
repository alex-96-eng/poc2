"use client";

import React from "react";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { ParsedResponse, ParsedResponseSchema, MappedWardrobe } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmDetailsView from "@/views/ConfirmDetailsView";
import ConfirmMappingsView from "@/views/ConfirmMappingsView";
import ReviewView from "@/views/ReviewView";

type Props = {
  initialData: ParsedResponse;
  activeStep: number;
  setActiveStep: (step: number) => void;
};

export default function DetailedOrderView({ initialData, activeStep, setActiveStep }: Props) {
  // Step 1 form
  const methods = useForm<ParsedResponse>({
    defaultValues: initialData,
    resolver: zodResolver(ParsedResponseSchema),
    mode: "onChange",
  });

  // Step 2 mapped payload
  const [mappedData, setMappedData] = React.useState<MappedWardrobe | null>(null);

  const handleMap = async () => {
    const payload = methods.getValues();
    try {
      const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(text);
        alert("Mapping failed:\n" + text);
        return;
      }
      const data: MappedWardrobe = await res.json();
      setMappedData(data);

      // Go to ConfirmMappings (step 2)
      setActiveStep(2);
    } catch (err) {
      console.error("Mapping failed:", err);
      alert("Mapping failed: " + (err as Error).message);
    }
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
          handleBack={() => setActiveStep(1)}
          handleNext={() => setActiveStep(3)}
          onSave={(edited) => setMappedData(edited)} // keep any user edits
        />
      )}

      {activeStep === 3 && (
      <ReviewView
        salesOrder={methods.getValues()}      // step 1 values (SalesOrder)
        mapping={mappedData}                  // step 2 mapping payload
        handleEdit={() => setActiveStep(2)}
        handleUpload={handleUploadToBackend}
      />
    )}
    </>
  );
}
