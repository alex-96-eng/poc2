import { Stack, Typography } from "@mui/material";

type DescriptionItemProps = {
    label: string;
    value: string | number;
}

const DescriptionItem = ({ label, value }: DescriptionItemProps) => {
    return (
        <Stack>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {label}
            </Typography>
            <Typography variant="body2">
                {value}
            </Typography>
        </Stack>
    );
};

export default DescriptionItem;
