"use client";

import React from "react";
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

interface UploadViewProps {
    handleUpload: ({ deliveryFile, supplierFile }: { deliveryFile: File, supplierFile: File }) => void;
}

const UploadView = ({ handleUpload }: UploadViewProps) => {
    // Delivery File
    const {
        acceptedFiles: deliveryAcceptedFiles,
        getRootProps: getDeliveryRootProps,
        getInputProps: getDeliveryInputProps
    } = useDropzone({
        accept: {
            "application/pdf": [".pdf"]
        }
    });

    // Supplier File
    const {
        acceptedFiles: supplierAcceptedFiles,
        getRootProps: getSupplierRootProps,
        getInputProps: getSupplierInputProps
    } = useDropzone({
        accept: {
            "application/pdf": [".pdf"]
        }
    });

    const handleClickUpload = () => {
        handleUpload({ deliveryFile: deliveryAcceptedFiles[0], supplierFile: supplierAcceptedFiles[0] });
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
                    deliveryAcceptedFiles.length
                        ? (
                            <Card>
                                <List>
                                    {
                                        deliveryAcceptedFiles.map(file => (
                                            <ListItem key={file.path}>
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
                                                    primary={file.name}
                                                    // secondary={attachment.size ? formatData(attachment.size) : null}
                                                    secondary={`${file.size.toFixed()} bytes`}
                                                    slotProps={{
                                                        primary: {
                                                            variant: "body2",
                                                            className: "truncate"
                                                        }
                                                    }}
                                                />
                                                <ListItemIcon>
                                                    <Tooltip title="Remove">
                                                        <IconButton
                                                            // onClick={onClickPreview}
                                                        >
                                                            <DeleteOutlineOutlined/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemIcon>
                                            </ListItem>
                                        ))
                                    }
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
                    supplierAcceptedFiles.length
                        ? (
                            <Card>
                                <List>
                                    {
                                        supplierAcceptedFiles.map(file => (
                                            <ListItem key={file.path}>
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
                                                    primary={file.name}
                                                    // secondary={attachment.size ? formatData(attachment.size) : null}
                                                    secondary={`${file.size.toFixed()} bytes`}
                                                    slotProps={{
                                                        primary: {
                                                            variant: "body2",
                                                            className: "truncate"
                                                        }
                                                    }}
                                                />
                                                <ListItemIcon>
                                                    <Tooltip title="Remove">
                                                        <IconButton
                                                            // onClick={onClickPreview}
                                                        >
                                                            <DeleteOutlineOutlined/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemIcon>
                                            </ListItem>
                                        ))
                                    }
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
