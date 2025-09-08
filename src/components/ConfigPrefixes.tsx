import usePrefixes from "@/query/use-prefixes";
import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const ConfigPrefixes = () => {
    const { data, isLoading } = usePrefixes();
    const prefixes = data?.["internal-prefixes"] ?? [];

    if (isLoading) return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
            <CircularProgress/>
        </Stack>
    );

    return (
        <Stack spacing={2} divider={<Divider/>}>
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
                            Will match on...
                        </Typography>
                        <Stack direction="row" useFlexGap spacing={0.5} flexWrap="wrap">
                            {
                                prefix.aliases.map((item, index) => (
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

export default ConfigPrefixes;
