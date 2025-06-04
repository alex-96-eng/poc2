import { Box, CardContent, CardHeader, Grid, MenuItem } from "@mui/material";
import RHFTextField from "@/components/hook-form/RHFTextField";
import RHFDatePicker from "./hook-form/RHFDatePicker";
import RHFSelect from "./hook-form/RHFSelect";
import { SupplierAdminChargeType } from "@/types";

const PurchaseOrderInfoForm = () => {
    return (
        <Box>
            <CardHeader
                sx={{ px: 0 }}
                title="Supplier Purchase Order Info"
            />
            <CardContent sx={{ px: 0 }}>
                <Grid spacing={2} container>
                    <Grid size={6}>
                        <RHFTextField
                            label="Supplier Order #"
                            name="supplierHeader.orderNumber"
                        />
                    </Grid>
                    <Grid size={6}>
                        <RHFDatePicker
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
                        <RHFSelect label="Admin Charge" name="supplierHeader.supplierAdminCharge">
                            {
                                [SupplierAdminChargeType.Yes, SupplierAdminChargeType.No].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))
                            }
                        </RHFSelect>
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
        </Box>
    );
};

export default PurchaseOrderInfoForm;
