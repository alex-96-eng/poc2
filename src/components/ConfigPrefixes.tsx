import usePrefixes from "@/query/use-prefixes";
import { Stack, Typography } from "@mui/material";

const ConfigPrefixes = () => {
    const { data } = usePrefixes();
    const prefixes = data?.prefixes ?? [];

    return (
        <Stack spacing={2}>
            {
                prefixes?.map((prefix, index) => (
                    <Stack key={`${prefix.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {prefix.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {prefix.items?.[0].code}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {prefix.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigPrefixes;
