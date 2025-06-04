"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Review, { ReviewData } from "@/components/Review";

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data") || "";

  let parsed: ReviewData | null = null;
  try {
    parsed = JSON.parse(dataParam);
  } catch {
    parsed = null;
  }

  if (!parsed) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">
          Invalid or missing data to preview.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const handleUpload = () => {
    // Replace with real upload logic
    alert("Uploading to Unleashed…");
  };

  return <Review data={parsed} onUpload={handleUpload} />;
}
