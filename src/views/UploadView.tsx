// src/views/UploadView.tsx
"use client";

import React, {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  DragEvent,
} from "react";

import { UploadFile } from "@mui/icons-material";
import { CardHeader, Stack } from "@mui/material";
import Viewer from "@/components/Viewer";

export default function UploadView() {
  // 1) All hooks at the top, unconditionally:
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 2) Handlers—also hooks (useCallback) called before any return:
  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log("Selected file:", file);
        setFileUploaded(true);
      }
    },
    []
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        console.log("Dropped file:", file);
        setFileUploaded(true);
      }
    },
    []
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

  // 3) Only after all hooks do we conditionally render <Viewer />:
  if (fileUploaded) {
    return <Viewer />;
  }

  // 4) Otherwise, render the upload UI:
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ flexGrow: 1, height: "100vh", px: 2 }}
    >
      <CardHeader
        title="Upload File"
        subheader="Drag & drop your PDF, or click to browse"
      />

      <div
        className={`
          flex flex-col items-center justify-center
          w-full max-w-md h-64
          px-6 py-8
          border-2 border-dashed rounded-lg
          transition-colors
          ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}
        `}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={triggerInput}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onInputChange}
        />

        <UploadFile sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />

        <p className="text-lg font-medium text-gray-700 text-center">
          {isDragging
            ? "Release to upload your PDF"
            : "Drag & drop your PDF here, or click to browse"}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          (Accepts only <strong>.pdf</strong>)
        </p>
      </div>
    </Stack>
  );
}
