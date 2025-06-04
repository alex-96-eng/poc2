// src/components/Viewer.tsx
"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Viewer() {
  // Mock data for now
  const [values, setValues] = useState({ name: "John Doe" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", values);
    // later: replace with real PDF‐parsed data
  };

  return (
    <Box
      maxWidth="sm"
      mx="auto"
      mt={8}
      px={2}
      py={4}
      border="1px solid"
      borderColor="grey.300"
      borderRadius={2}
      boxShadow={2}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        PDF Content (Mocked)
      </Typography>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
}
