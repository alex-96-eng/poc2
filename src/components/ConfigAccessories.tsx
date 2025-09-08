import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import useAccessories from "@/query/use-accessories";
import Box from "@mui/material/Box";

const ConfigAccessories = () => {
    const { data, isLoading } = useAccessories();
    const accessories = data?.accessories ?? [];

    if (isLoading) return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100%"}}>
            <CircularProgress/>
        </Stack>
    );

    return (
        <Stack spacing={2} divider={<Divider/>}>
            {
                accessories?.map((accessory, index) => (
                    <Stack key={`${accessory.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {accessory.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {accessory.items?.[0].code}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Quantity Multiplier
                        </Typography>
                        <Typography variant="body2">
                            {accessory.quantity_multiplier}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Will match on...
                        </Typography>
                        <Stack direction="row" useFlexGap spacing={0.5} flexWrap="wrap">
                            {
                                accessory.aliases.map((item, index) => (
                                    <Box key={`${item}-${index}`}>
                                        <Chip
                                            size="small"
                                            label={item}
                                            clickable={false}
                                        />
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigAccessories;
