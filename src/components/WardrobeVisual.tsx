import { Box, Stack, Typography } from "@mui/material";
import { Wardrobe } from "@/views/DetailedOrderView";

type WardrobeVisualProps = {
    wardrobe: Wardrobe;
}
const WardrobeVisual = ({ wardrobe }: WardrobeVisualProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 4,
                mb: 4,
            }}
        >
            {
                wardrobe.doorDetails.map((door, dIdx) => (
                    <Stack
                        spacing={1}
                        alignItems="center"
                        key={dIdx}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: 150,
                                height: 375,
                                bgcolor: "#f9f9f9",
                                border: "2px solid #374151",
                            }}
                        >
                            {/* Vertical dashed line */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: -25,
                                    top: 0,
                                    height: "100%",
                                    width: 0,
                                    borderRight: "1px dashed #6b7280",
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    position: "absolute",
                                    right: -70,
                                    top: "50%",
                                    transform: "translateY(-50%) rotate(90deg)",
                                    fontSize: 12,
                                    color: "text.secondary",
                                }}
                            >
                                {wardrobe.dims.slidingOpeningHeight} mm
                            </Typography>

                            {/* Horizontal dashed line */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: -25,
                                    left: 0,
                                    width: "100%",
                                    height: 0,
                                    borderBottom: "1px dashed #6b7280",
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    position: "absolute",
                                    bottom: -50,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    fontSize: 12,
                                    color: "text.secondary",
                                }}
                            >
                                {wardrobe.dims.doorWidth} mm
                            </Typography>

                            {/* Door panel label */}
                            <Typography
                                variant="body2"
                                sx={{
                                    position: "absolute",
                                    top: -28,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    fontSize: 12,
                                    color: "text.secondary",
                                }}
                            >
                                {door.doorPanel}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                            {door.doorNumber}
                        </Typography>
                    </Stack>
                ))
            }
        </Box>
    );
};

export default WardrobeVisual;
