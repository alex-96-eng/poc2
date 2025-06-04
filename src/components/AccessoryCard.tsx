import { PlaylistAddOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Accessory } from "@/types";

type AccessoryCardProps = {
    accessory: Accessory;
};
const AccessoryCard = ({ accessory }: AccessoryCardProps) => {
    return (
        <Card sx={{ height: "100%" }}>
            <CardHeader
                sx={{ pb: 0.5 }}
                avatar={
                    <PlaylistAddOutlined sx={{ color: "primary.main" }}/>
                }
                title={accessory.componentName}
                subheader={accessory.netCost}
                slotProps={{
                    subheader: {
                        variant: "caption"
                    }
                }}
            />
            <CardContent
                sx={(theme) => ({
                    pt: 0,
                    pb: `${theme.spacing(1)} !important`
                })}
            >
                <Typography variant="body2">
                    <Box
                        component="span"
                        sx={{ color: "text.secondary" }}
                    >
                        Quantity:{" "}
                    </Box>
                    {accessory.quantity}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AccessoryCard;
