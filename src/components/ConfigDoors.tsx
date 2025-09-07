import useDoors from "@/query/use-doors";
import { Stack, Typography } from "@mui/material";

const ConfigDoors = () => {
    const { data } = useDoors();
    const doors = data?.doors ?? [];

    return (
        <Stack spacing={2}>
            {
                doors?.map((door, index) => (
                    <Stack key={`${door.label}-${index}`}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Label
                                </Typography>
                                <Typography>
                                    {door.label}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Code
                                </Typography>
                                <Typography>
                                    {door.items?.[0].code ?? "-"}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                            Aliases
                        </Typography>
                        <Typography variant="body2">
                            {door.aliases.join(", ")}
                        </Typography>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default ConfigDoors;
