"use client";

import React from "react";
import { RestartAlt, TaskAlt } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

interface CompleteViewProps {
    handleReset: VoidFunction;
}

const CompleteView = ({ handleReset }: CompleteViewProps) => {
    const handleClickReset = () => {
        handleReset();
    };

    return (
        <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ flexGrow: 1 }}
        >
            <TaskAlt fontSize="large" sx={{ color: "primary.main" }}/>
            <Typography variant="h6">
                Upload Complete
            </Typography>
            <Button
                onClick={handleClickReset}
                variant="contained"
                startIcon={<RestartAlt/>}
            >
                Start Over
            </Button>
        </Stack>
    );
};

export default CompleteView;
