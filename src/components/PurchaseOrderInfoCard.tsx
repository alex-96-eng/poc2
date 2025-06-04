import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";

const PurchaseOrderInfoCard = () => {
    return (
        <Card>
            <CardHeader
                title="Supplier Purchase Order Info"
            />
            <CardContent>
                <Grid spacing={2} container>
                    <Grid size={6}>
                        <RHFTextField
                            label="Supplier Order #"
                            name="supplierHeader.orderNumber"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Date Ordered"
                            name="supplierHeader.dateOrdered"
                        />
                    </Grid>
                    <Grid size={12}>
                        <RHFTextField
                            label="No. of Wardrobes"
                            name="supplierHeader.numberOfWardrobes"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Net Goods"
                            name="supplierHeader.netGoods"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Net Delivery"
                            name="supplierHeader.netDelivery"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Discount %"
                            name="supplierHeader.discountPercent"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Discount Amount"
                            name="supplierHeader.discountAmount"
                        />
                    </Grid>
                    <Grid size={12}>
                        <RHFTextField
                            label="Admin Charge"
                            name="supplierHeader.supplierAdminCharge"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="Net Total"
                            name="supplierHeader.netTotal"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFTextField
                            label="VAT"
                            name="supplierHeader.vat"
                        />
                    </Grid>
                    <Grid size={12}>
                        <RHFTextField
                            label="Gross Total"
                            name="supplierHeader.grossTotal"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PurchaseOrderInfoCard;
