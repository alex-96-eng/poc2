import { Button, Stack, Typography } from "@mui/material";
import React from "react";

type StartViewProps = {
    handleStart: VoidFunction;
}

const StartView = ({ handleStart }: StartViewProps) => {
    return (
        <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" gutterBottom>
                Start New Order
            </Typography>
            <Button variant="contained" onClick={handleStart}>
                Start
            </Button>
        </Stack>
    );
};

export default StartView;
