"use client";

import React from "react";
import OrderFlow from "@/components/OrderFlow";
import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";

export default function Page() {
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
                <Typography>
                    TODO: STEPPER
                </Typography>
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
                        height: "100%",
                        width: "100%",
                        py: 4,
                        backgroundColor: "background.paper",
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            flexGrow: 1,
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <OrderFlow/>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
}
