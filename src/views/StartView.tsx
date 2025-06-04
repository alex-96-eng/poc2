import { Box, Button, Typography } from "@mui/material";
import React from "react";

type StartViewProps = {
    handleStart: VoidFunction;
}

const StartView = ({ handleStart }: StartViewProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" gutterBottom>
                Start New Order
            </Typography>
            <Button variant="contained" onClick={handleStart}>
                Start
            </Button>
        </Box>
    );
};

export default StartView;
