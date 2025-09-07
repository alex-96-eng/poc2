import useTrackCodes from "@/query/use-track-codes";
import { Stack, Typography } from "@mui/material";

const ConfigTrackCodes = () => {
    const { data } = useTrackCodes();
    const trackCodes = data?.["track-codes"] ?? [];

    return (
        <Stack spacing={2}>
            {
                trackCodes?.map((trackCode, index) => (
                    <Stack key={`${trackCode.label}-${index}`}>
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
                        <Typography variant="subtitle2" color="text.secondary">
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {trackCode.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigTrackCodes;
