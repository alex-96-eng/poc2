"use client";

import React, { useState } from "react";
import { DeleteOutlineOutlined, FileUploadOutlined, InsertDriveFileOutlined, UploadFile } from "@mui/icons-material";
import {
    alpha,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { formatData } from "@/lib/utils";

interface UploadViewProps {
    handleUpload: ({ deliveryFile, supplierFile }: { deliveryFile: File, supplierFile: File }) => void;
    isPending: boolean;
}

const UploadView = ({ handleUpload, isPending = false }: UploadViewProps) => {
    // Delivery File
    const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
    const {
        acceptedFiles: deliveryAcceptedFiles,
        getRootProps: getDeliveryRootProps,
        getInputProps: getDeliveryInputProps,
    } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setDeliveryFile(acceptedFiles[0]);
        },
        maxFiles: 1,
        accept: {
            "application/pdf": [".pdf"]
        }
    });
    const handleRemoveDeliveryFile = () => {
        setDeliveryFile(null);
    };

    // Supplier File
    const [supplierFile, setSupplierFile] = useState<File | null>(null);
    const {
        acceptedFiles: supplierAcceptedFiles,
        getRootProps: getSupplierRootProps,
        getInputProps: getSupplierInputProps
    } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setSupplierFile(acceptedFiles[0]);
        },
        maxFiles: 1,
        accept: {
            "application/pdf": [".pdf"]
        }
    });
    const handleRemoveSupplierFile = () => {
        setSupplierFile(null);
    };

    const handleClickUpload = () => {
        if (deliveryFile && supplierFile) {
            handleUpload({ deliveryFile, supplierFile });
        } else {
            console.warn("Missing files:", { deliveryFile, supplierFile });
        }
    };

    const isUploadDisabled = !supplierAcceptedFiles.length || !deliveryAcceptedFiles.length;

    return (
        <Stack
            spacing={4}
            justifyContent="center"
            sx={{ flexGrow: 1 }}
        >
            <Box>
                <CardHeader title="Upload Delivery PDF" subheader="Please upload the delivery PDF"/>
                {
                    deliveryFile
                        ? (
                            <Card>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
                                            <Stack
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={(theme) => ({
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.16),
                                                    borderRadius: `${theme.shape.borderRadius}px`,
                                                    p: 1.5,
                                                    aspectRatio: "1/1"
                                                })}
                                            >
                                                <InsertDriveFileOutlined sx={{ color: "primary.main" }}/>
                                            </Stack>

                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={deliveryFile.name}
                                            secondary={deliveryFile.size ? formatData(deliveryFile.size) : null}
                                            slotProps={{
                                                primary: {
                                                    variant: "body2",
                                                    className: "truncate"
                                                }
                                            }}
                                        />
                                        <ListItemIcon>
                                            <Tooltip title="Remove">
                                                <IconButton disabled={isPending} onClick={handleRemoveDeliveryFile}>
                                                    <DeleteOutlineOutlined/>
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            </Card>
                        )
                        : (
                            <Card
                                sx={{
                                    borderStyle: "dashed",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                                {...getDeliveryRootProps({ className: "dropzone" })}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <input {...getDeliveryInputProps()} />
                                        <UploadFile fontSize="large" sx={{ color: "text.secondary" }}/>
                                        <Typography>Drag 'n' drop your file here, or click to select file</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            (PDF only)
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        )
                }
            </Box>

            <Box sx={{ pb: 4 }}>
                <CardHeader title="Upload Supplier PDF" subheader="Please upload the supplier PDF"/>
                {
                    supplierFile
                        ? (
                            <Card>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar sx={{ minWidth: 0, pr: 1 }}>
                                            <Stack
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={(theme) => ({
                                                    backgroundColor: alpha(theme.palette.primary.main, 0.16),
                                                    borderRadius: `${theme.shape.borderRadius}px`,
                                                    p: 1.5,
                                                    aspectRatio: "1/1"
                                                })}
                                            >
                                                <InsertDriveFileOutlined sx={{ color: "primary.main" }}/>
                                            </Stack>

                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={supplierFile.name}
                                            secondary={supplierFile.size ? formatData(supplierFile.size) : null}
                                            slotProps={{
                                                primary: {
                                                    variant: "body2",
                                                    className: "truncate"
                                                }
                                            }}
                                        />
                                        <ListItemIcon>
                                            <Tooltip title="Remove">
                                                <IconButton disabled={isPending} onClick={handleRemoveSupplierFile}>
                                                    <DeleteOutlineOutlined/>
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            </Card>
                        )
                        : (
                            <Card
                                sx={{
                                    borderStyle: "dashed",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                                {...getSupplierRootProps({ className: "dropzone" })}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Stack
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <input {...getSupplierInputProps()} />
                                        <UploadFile fontSize="large" sx={{ color: "text.secondary" }}/>
                                        <Typography>Drag 'n' drop your file here, or click to select file</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            (PDF only)
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        )
                }
            </Box>

            <Button
                loading={isPending}
                onClick={handleClickUpload}
                variant="contained"
                disabled={isUploadDisabled}
                startIcon={<FileUploadOutlined/>}
            >
                Upload Files
            </Button>
        </Stack>
    );
};

export default UploadView;
