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
                            label="Customer Name"
                            name="delivery.customerName"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Phone"
                            name="delivery.customerPhone"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Address Line 1"
                            name="delivery.addressLine1"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Address Line 2"
                            name="delivery.addressLine2"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Address Line 3"
                            name="delivery.addressLine3"
                        />
                    </Grid>
                    <Grid size={12}>
                        <RHFTextField
                            label="Delivery Notes"
                            name="delivery.deliveryNotes"
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
