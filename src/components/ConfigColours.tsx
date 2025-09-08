import useColours from "@/query/use-colours";
import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const ConfigColours = () => {
    const { data, isLoading } = useColours();
    const colours = data?.colours ?? [];

    if (isLoading) return (
        <Stack justifyContent="center" alignItems="center" sx={{ height: "100%"}}>
            <CircularProgress/>
        </Stack>
    );

    return (
        <Stack spacing={2} divider={<Divider/>}>
            {
                colours?.map((colour, index) => (
                    <Stack key={`${colour.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {colour.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {colour.items?.[0].code}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Will match on...
                        </Typography>
                        <Stack direction="row" useFlexGap spacing={0.5} flexWrap="wrap">
                            {
                                colour.aliases.map((item, index) => (
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

export default ConfigColours;
