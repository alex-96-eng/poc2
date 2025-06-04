import { Card, CardContent, CardHeader, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Wardrobe } from "@/types";

type WardrobeDetailsCardProps = {
    wardrobe: Wardrobe;
    wardrobeIndex: number;
}

const WardrobeDetailsCard = ({ wardrobe, wardrobeIndex }: WardrobeDetailsCardProps) => {
    return (
        <Card>
            <CardHeader title={`Wardrobe #${wardrobe.wardrobeNumber} Details`}/>
            <CardContent>
                <Typography variant="subtitle1" sx={{ pb: 2, color: "text.secondary" }}>
                    Dimensions
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Opening Width (mm)"
                            name={`wardrobes.${wardrobeIndex}.dims.slidingOpeningWidth`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Opening Height (mm)"
                            name={`wardrobes.${wardrobeIndex}.dims.slidingOpeningHeight`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Door Width (mm)"
                            name={`wardrobes.${wardrobeIndex}.dims.doorWidth`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Front Door Type"
                            name={`wardrobes.${wardrobeIndex}.dims.frontDoorType`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Rear Door Type"
                            name={`wardrobes.${wardrobeIndex}.dims.rearDoorType`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Framework Type"
                            name={`wardrobes.${wardrobeIndex}.dims.frameworkType`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Framework Colour"
                            name={`wardrobes.${wardrobeIndex}.dims.frameworkColour`}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <RHFTextField
                            label="Track Length (mm)"
                            name={`wardrobes.${wardrobeIndex}.dims.trackLength`}
                        />
                    </Grid>
                </Grid>

                {/* Door Details */}
                <Typography variant="subtitle1" sx={{ pb: 2, color: "text.secondary" }}>
                    Door Details
                </Typography>
                <Stack spacing={4}>
                    {
                        wardrobe.doorDetails.map((door, dIdx) => (
                            <Grid container spacing={2} key={dIdx}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Door #"
                                        name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.doorNumber`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Quantity"
                                        name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.quantity`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Door Cost"
                                        name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.doorCost`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Door Panel"
                                        name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.doorPanel`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Soft Close"
                                        name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.softClose`}
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                </Stack>

                {/* Accessories */}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Accessories
                </Typography>
                <Stack spacing={4}>
                    {
                        wardrobe.accessories.map((acc, aIdx) => (
                            <Grid
                                container
                                key={aIdx}
                                spacing={2}
                            >
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Component Name"
                                        name={`wardrobes.${wardrobeIndex}.accessories.${aIdx}.componentName`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Quantity"
                                        name={`wardrobes.${wardrobeIndex}.accessories.${aIdx}.quantity`}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <RHFTextField
                                        label="Net Cost"
                                        name={`wardrobes.${wardrobeIndex}.accessories.${aIdx}.netCost`}
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                </Stack>
            </CardContent>
        </Card>
    );
};

export default WardrobeDetailsCard;
