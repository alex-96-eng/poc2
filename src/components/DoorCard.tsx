import { DoorDetail } from "@/types";
import { SensorDoorOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

type DoorCardProps = {
    door: DoorDetail
}
const DoorCard = ({ door }: DoorCardProps) => {
    return (
        <Card sx={{ height: "100%" }}>
            <CardHeader
                sx={{ pb: 0.5 }}
                avatar={
                    <SensorDoorOutlined sx={{ color: "primary.main" }}/>
                }
                title={door.doorNumber}
                subheader={door.doorCost}
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
                        Door Panel:{" "}
                    </Box>
                    {door.doorPanel}
                </Typography>
                <Typography variant="body2">
                    <Box
                        component="span"
                        sx={{ color: "text.secondary" }}
                    >
                        Soft Close:{" "}
                    </Box>
                    {door.softClose}
                </Typography>

                <Typography variant="body2">
                    <Box
                        component="span"
                        sx={{ color: "text.secondary" }}
                    >
                        Quantity:{" "}
                    </Box>
                    {door.quantity}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DoorCard;

