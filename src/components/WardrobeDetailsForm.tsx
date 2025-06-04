import { CardContent, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Wardrobe } from "@/types";

type WardrobeDetailsCardProps = {
    wardrobe: Wardrobe;
    wardrobeIndex: number;
}

const WardrobeDetailsForm = ({ wardrobe, wardrobeIndex }: WardrobeDetailsCardProps) => {
    return (
        <CardContent
            sx={{ px: 0 }}
        >
            <Stack spacing={4}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography variant="h6" sx={{ color: "text.secondary" }}>
                            Dimensions
                        </Typography>
                    </Grid>
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

                <Stack spacing={2}>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        Door Details
                    </Typography>
                    {
                        wardrobe.doorDetails.map((door, dIdx) => (
                            <Stack key={dIdx}>
                                <Typography variant="subtitle2" sx={{ pb: 2, color: "text.secondary" }}>
                                    Door {dIdx + 1}
                                </Typography>
                                <Grid container spacing={2}>
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
                            </Stack>
                        ))
                    }
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        Accessories
                    </Typography>
                    {
                        wardrobe.accessories.map((acc, aIdx) => (
                            <Stack key={aIdx}>
                                <Typography variant="subtitle2" sx={{ pb: 2, color: "text.secondary" }}>
                                    Accessory {aIdx + 1}
                                </Typography>
                                <Grid
                                    container
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
                            </Stack>
                        ))
                    }
                </Stack>

            </Stack>
        </CardContent>
    );
};

export default WardrobeDetailsForm;
