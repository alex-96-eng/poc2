import usePanels from "@/query/use-panels";
import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const ConfigPanels = () => {
    const { data, isLoading } = usePanels();
    const panels = data?.panels ?? [];

    if (isLoading) return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
            <CircularProgress/>
        </Stack>
    );


    return (
        <Stack spacing={2} divider={<Divider/>}>
            {
                panels?.map((panel, index) => (
                    <Stack key={`${panel.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {panel.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {panel.items?.[0].code}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Will match on...
                        </Typography>
                        <Stack direction="row" useFlexGap spacing={0.5} flexWrap="wrap">
                            {
                                panel.aliases.map((item, index) => (
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

export default ConfigPanels;
