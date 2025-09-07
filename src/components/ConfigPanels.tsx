import usePanels from "@/query/use-panels";
import { Stack, Typography } from "@mui/material";

const ConfigPanels = () => {
    const { data } = usePanels();
    const panels = data?.panels ?? [];

    return (
        <Stack spacing={2}>
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
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {panel.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigPanels;
