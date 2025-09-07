import { CardContent, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Wardrobe } from "@/types";

type WardrobeDetailsCardProps = {
  wardrobe: Wardrobe;
  wardrobeIndex: number;
};

const WardrobeDetailsForm = ({ wardrobe, wardrobeIndex }: WardrobeDetailsCardProps) => {
  const hasAccessories = !!wardrobe.accessories?.length;
  const hasInternals = !!wardrobe.internals?.length;
  const hasExtras = !!wardrobe.extras?.length;

  return (
    <CardContent sx={{ px: 0 }}>
      <Stack spacing={4}>
        {/* Dimensions */}
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

        {/* Door Details */}
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Door Details
          </Typography>

          {wardrobe.doorDetails.map((door, dIdx) => (
            <Stack key={dIdx} spacing={2}>
              <Typography variant="subtitle2" sx={{ color: "text.secondary", pb: 1 }}>
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
                    label="Soft Close"
                    name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.softClose`}
                  />
                </Grid>

                {/* Panels: array of { name } */}
                {(door.panels ?? []).map((_, pIdx) => (
                  <Grid key={pIdx} size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label={`Panel ${pIdx + 1}`}
                      name={`wardrobes.${wardrobeIndex}.doorDetails.${dIdx}.panels.${pIdx}.name`}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>

        {/* Accessories (only if data present) */}
        {hasAccessories && (
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Accessories
            </Typography>

            {wardrobe.accessories!.map((_, aIdx) => (
              <Stack key={aIdx} spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  Accessory {aIdx + 1}
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Name"
                      name={`wardrobes.${wardrobeIndex}.accessories.${aIdx}.name`}
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
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Colour"
                      name={`wardrobes.${wardrobeIndex}.accessories.${aIdx}.colour`}
                    />
                  </Grid>
                </Grid>
              </Stack>
            ))}
          </Stack>
        )}

        {/* Internals (only if data present) */}
        {hasInternals && (
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Internals
            </Typography>

            {wardrobe.internals!.map((_, iIdx) => (
              <Stack key={iIdx} spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  Internal {iIdx + 1}
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Name"
                      name={`wardrobes.${wardrobeIndex}.internals.${iIdx}.name`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Quantity"
                      name={`wardrobes.${wardrobeIndex}.internals.${iIdx}.quantity`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Net Cost"
                      name={`wardrobes.${wardrobeIndex}.internals.${iIdx}.netCost`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Colour"
                      name={`wardrobes.${wardrobeIndex}.internals.${iIdx}.colour`}
                    />
                  </Grid>
                </Grid>
              </Stack>
            ))}
          </Stack>
        )}

        {/* Extras (only if data present) */}
        {hasExtras && (
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Extras
            </Typography>

            {wardrobe.extras!.map((_, eIdx) => (
              <Stack key={eIdx} spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  Extra {eIdx + 1}
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Name"
                      name={`wardrobes.${wardrobeIndex}.extras.${eIdx}.name`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Quantity"
                      name={`wardrobes.${wardrobeIndex}.extras.${eIdx}.quantity`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Net Cost"
                      name={`wardrobes.${wardrobeIndex}.extras.${eIdx}.netCost`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <RHFTextField
                      label="Colour"
                      name={`wardrobes.${wardrobeIndex}.extras.${eIdx}.colour`}
                    />
                  </Grid>
                </Grid>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </CardContent>
  );
};

export default WardrobeDetailsForm;
