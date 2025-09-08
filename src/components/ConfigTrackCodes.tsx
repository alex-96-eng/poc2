import useTrackCodes from "@/query/use-track-codes";
import { Box, Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";

const ConfigTrackCodes = () => {
    const { data, isLoading } = useTrackCodes();
    const trackCodes = data?.["track-codes"] ?? [];

    if (isLoading) return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
            <CircularProgress/>
        </Stack>
    );

    return (
        <Stack spacing={2} divider={<Divider/>}>
            {
                trackCodes?.map((trackCode, index) => (
                    <Stack key={`${trackCode.label}-${index}`} spacing={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {trackCode.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {trackCode.items?.[0].code}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography variant="subtitle2" color="text.secondary">
                                Will match on...
                            </Typography>
                            <Stack direction="row" useFlexGap spacing={0.5} flexWrap="wrap">
                                {
                                    trackCode.aliases.map((item, index) => (
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
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigTrackCodes;
