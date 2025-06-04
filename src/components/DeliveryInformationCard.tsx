import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";

const DeliveryInformationCard = () => {
    return (
        <Card>
            <CardHeader title="Delivery Information"/>
            <CardContent>
                <Grid spacing={2} container>
                    <Grid size={6}>
                        <RHFTextField
                            label="Order Number"
                            name="deliveryInfo.orderNumber"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
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
        </Card>
    );
};

export default DeliveryInformationCard;
