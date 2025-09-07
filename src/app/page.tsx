"use client";
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Stack, Step, StepLabel, Stepper } from "@mui/material";
import Image from "next/image";
import UploadView from "@/views/UploadView";
import DetailedOrderView from "@/views/DetailedOrderView";
import { ParsedResponse, ParsedResponseSchema } from "@/types";
import CompleteView from "@/views/CompleteView";
import useParsePdfs from "@/mutation/use-parse-pdfs";
import ConfigDrawer from "@/components/ConfigDrawer";

const drawerWidth = 480;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: "relative",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: 0,
            },
        },
    ],
}));

export default function PersistentDrawerRight() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const steps = [
        "Upload Files",
        "Confirm Details",
        "Confirm Mappings",
        "Review",
        "Done",
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [parsedData, setParsedData] = useState<ParsedResponse | null>(null);

    const { mutate: handleUpload, isPending } = useParsePdfs({
        onSuccess: (data: ParsedResponse) => {
            setParsedData(data);
            setActiveStep(1); // jump to Confirm Details
        }
    });

    return (
        <Box sx={{ display: "flex" }}>
            <Main open={open}>
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
                            {activeStep === 0 && <UploadView isPending={isPending} handleUpload={handleUpload}/>}
                            {parsedData && activeStep > 0 && activeStep < 4 && (
                                <DetailedOrderView
                                    handleOpenConfigDrawer={handleDrawerOpen}
                                    initialData={ParsedResponseSchema.parse(parsedData)}
                                    activeStep={activeStep}
                                    setActiveStep={setActiveStep}
                                />
                            )}
                            {activeStep === 4 && <CompleteView handleReset={() => setActiveStep(0)}/>}
                        </Container>
                    </Box>
                </Stack>
            </Main>
            <ConfigDrawer
                open={open}
                handleDrawerClose={handleDrawerClose}
                drawerWidth={drawerWidth}
            />
        </Box>
    );
}
