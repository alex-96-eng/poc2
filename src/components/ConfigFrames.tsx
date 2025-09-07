import useFrames from "@/query/use-frames";
import { Stack, Typography } from "@mui/material";

const ConfigFrames = () => {
    const { data } = useFrames();
    console.log(data);
    const frames = data?.frames ?? [];

    return (
        <Stack spacing={2}>
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
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {frame.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigFrames;
