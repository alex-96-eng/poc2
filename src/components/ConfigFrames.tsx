import useFrames from "@/query/use-frames";
import { Box, Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";

const ConfigFrames = () => {
    const { data, isLoading } = useFrames();
    const frames = data?.frames ?? [];

    if (isLoading) return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
            <CircularProgress/>
        </Stack>
    );

    return (
        <Stack spacing={2} divider={<Divider/>}>
            {
                frames?.map((frame, index) => (
                    <Stack key={`${frame.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {frame.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {frame.items?.[0].code ?? "-"}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Will match on...
                        </Typography>
                        <Stack direction="row" useFlexGap spacing={0.5} flexWrap="wrap">
                            {
                                frame.aliases.map((item, index) => (
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

export default ConfigFrames;
