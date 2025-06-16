"use client";

import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
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
  const methods = useForm<ParsedResponse>({
    defaultValues: initialData,
    resolver: zodResolver(ParsedResponseSchema),
    mode: "onChange",
  });

  return (
    <FormProvider methods={methods}>
      {activeStep === 1 && (
        <ConfirmDetailsView
          handleReset={() => {
            methods.reset();
            setActiveStep(0);
          }}
          handleNext={() => setActiveStep(2)}
        />
      )}
      {activeStep === 2 && (
        <ConfirmMappingsView
          handleBack={() => setActiveStep(1)}
          handleNext={() => setActiveStep(3)}
        />
      )}
      {activeStep === 3 && (
        <ReviewView
          handleEdit={() => setActiveStep(1)}
          handleUpload={() => setActiveStep(4)}
        />
      )}
    </FormProvider>
  );
}
