// src/components/UploadStep.tsx
"use client";

import React, { ChangeEvent, DragEvent, useCallback, useRef, useState } from "react";
import { UploadFile } from "@mui/icons-material";
import {CardHeader, Stack, Typography, Box} from "@mui/material";

interface UploadStepProps {
  label: string;
  onUploaded: (file: File) => void;
}

export default function UploadStep({ label, onUploaded }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      // Immediately call onUploaded with the raw File, no mock delay here
      onUploaded(file);
    },
    [onUploaded]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const triggerInput = () => {
    inputRef.current?.click();
  };

  return (
    <Stack
      justifyContent="center"
      sx={{
        flexGrow: 1,
        height: "100vh", // full viewport height
      }}
    >
      <CardHeader title={label} subheader={`Please upload the ${label}`} />
      <Box
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={triggerInput}
        sx={{
          mx: "auto",
          width: "80%",
          maxWidth: 400,
          height: 200,
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          bgcolor: isDragging ? "primary.light" : "background.paper",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          p: 2,
          transition: "background-color 0.2s, border-color 0.2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onInputChange}
        />
        <UploadFile sx={{ fontSize: 48, color: "text.secondary" }} />
        <Typography variant="body1" sx={{ mt: 1 }}>
          {isDragging
            ? `Release to upload ${label}`
            : `Drag & drop ${label}, or click to browse`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          (PDF only)
        </Typography>
      </Box>
    </Stack>
  );
}
