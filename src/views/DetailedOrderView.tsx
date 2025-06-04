import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmDetailsView from "@/views/ConfirmDetailsView";
import ReviewView from "@/views/ReviewView";

type DetailedOrderViewProps = {
    initialData: ParsedResponse;
    activeStep: number;
    setActiveStep: (step: number) => void;
}

export default function DetailedOrderView({ initialData, activeStep, setActiveStep }: DetailedOrderViewProps) {
    const methods = useForm<ParsedResponse>({
        reValidateMode: "onChange",
        mode: "onChange",
        defaultValues: initialData,
        resolver: zodResolver(ParsedResponseSchema)
    });

    const handleClickReview = methods.handleSubmit(() => {
        setActiveStep(2);
    });

    const handleClickEdit = () => {
        setActiveStep(1);
    };
    const handleClickUpload = () => {
        methods.reset();
        setActiveStep(3);
    };
    const handleClickReset = () => {
        methods.reset();
        setActiveStep(0);
    };

    return (
        <FormProvider methods={methods} style={{ width: "100%" }}>
            {
                activeStep === 1 &&
                <ConfirmDetailsView
                    handleReset={handleClickReset}
                    handleReview={handleClickReview}
                />
            }
            {
                activeStep === 2 &&
                <ReviewView
                    handleEdit={handleClickEdit}
                    handleUpload={handleClickUpload}
                />
            }
        </FormProvider>
    );
}
