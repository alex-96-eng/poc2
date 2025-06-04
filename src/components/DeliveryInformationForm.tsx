import { Box, CardContent, CardHeader, Grid } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";

const DeliveryInformationForm = () => {
    return (
        <Box>
            <CardHeader
                sx={{ px: 0 }}
                title="Delivery Information"
            />
            <CardContent
                sx={{ px: 0 }}
            >
                <Grid spacing={2} container>
                    <Grid size={6}>
                        <RHFTextField
                            label="Order Number"
                            name="deliveryInfo.orderNumber"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFDatePicker
                            label="Date Ordered"
                            name="deliveryInfo.dateOrdered"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="No. of Wardrobes"
                            name="deliveryInfo.numberOfWardrobes"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Customer Name"
                            name="deliveryInfo.customerName"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Phone"
                            name="deliveryInfo.customerPhone"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Address Line 1"
                            name="deliveryInfo.addressLine1"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Address Line 2"
                            name="deliveryInfo.addressLine2"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Address Line 3"
                            name="deliveryInfo.addressLine3"
                        />
                    </Grid>
                    <Grid size={12}>
                        <RHFTextField
                            label="Delivery Notes"
                            name="deliveryInfo.deliveryNotes"
                            multiline
                            minRows={3}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Box>
    );
};

export default DeliveryInformationForm;
