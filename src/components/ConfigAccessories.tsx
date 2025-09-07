import { Stack, Typography } from "@mui/material";
import useAccessories from "@/query/use-accessories";

const ConfigAccessories = () => {
    const { data } = useAccessories();
    const accessories = data?.accessories ?? [];

    return (
        <Stack spacing={2}>
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
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {accessory.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigAccessories;
