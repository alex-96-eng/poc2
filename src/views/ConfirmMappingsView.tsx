import { useEffect } from "react";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/components/hook-form/FormProvider";
import WardrobeLineItemEditor from "@/components/WardrobeLineItemEditor";
import { MappedWardrobe, MappedWardrobeInput, MappedWardrobeSchema } from "@/types";
import { CheckOutlined, ChevronLeft, Settings } from "@mui/icons-material";

type Props = {
    initial: MappedWardrobe;
    handleOpenConfigDrawer: () => void;
    handleBack: () => void;
    handleNext: () => void;
    onSave?: (data: MappedWardrobe) => void;
};

export default function ConfirmMappingsView(
    {
        initial,
        handleOpenConfigDrawer,
        handleBack,
        handleNext,
        onSave,
    }: Props) {
    const methods = useForm<MappedWardrobeInput>({
        defaultValues: initial,
        resolver: zodResolver(MappedWardrobeSchema),
        mode: "onChange",
    });

    // If a parent passes a new initial (e.g., remap), rehydrate the form
    useEffect(
        () => methods.reset(initial),
        [initial, methods]
    );

    const submit = (data: MappedWardrobe) => {
        onSave?.(data);                       // bubble up edited mapping
        handleNext();                         // go to Review
    };

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(submit)}>
            <Stack spacing={2}>
                {/* Header with Next & Reset */}
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Confirm Mappings</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button startIcon={<ChevronLeft/>} variant="outlined" onClick={handleBack}>
                            Back to Details
                        </Button>
                        <Button
                            startIcon={<CheckOutlined/>}
                            variant="contained"
                            type="submit"
                        >
                            Next: Review
                        </Button>
                        <IconButton onClick={handleOpenConfigDrawer}>
                            <Settings/>
                        </IconButton>
                    </Stack>
                </Stack>

                <Divider/>

                <WardrobeLineItemEditor/> {/* edits top-level RequiredDate + Lines */}

            </Stack>
        </FormProvider>
    );
}
