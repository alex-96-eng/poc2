import useBands from "@/query/use-bands";
import { Stack, Typography } from "@mui/material";

const ConfigBands = () => {
    const { data } = useBands();
    const bands = data?.bands ?? [];

    return (
        <Stack spacing={2}>
            {
                bands?.map((band, index) => (
                    <Stack key={`${band.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {band.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {band.items?.[0].code}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {band.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigBands;
