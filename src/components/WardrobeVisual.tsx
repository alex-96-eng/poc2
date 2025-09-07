import { Box, Stack, Typography } from "@mui/material";
import { Wardrobe } from "@/types";
import Divider from "@mui/material/Divider";

type WardrobeVisualProps = {
    wardrobe: Wardrobe;
}
const WardrobeVisual = ({ wardrobe }: WardrobeVisualProps) => {
    return (
        <Stack direction="row" spacing={5} justifyContent="center" flexWrap="wrap">
            {
                wardrobe.doorDetails.map((door, dIdx) => (
                    <Stack
                        spacing={0.5}
                        alignItems="center"
                        key={dIdx}
                        direction="row"
                    >
                        <Stack spacing={1}>
                            <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                                {door.doorNumber}
                            </Typography>

                           <Typography
                              variant="caption"
                              sx={{ textAlign: "center", color: "text.secondary" }}
                            >
                              {(Array.isArray(door.panels)
                                ? door.panels.map((p: any) => (typeof p === "string" ? p : p?.name))
                                : []
                              )
                                .filter(Boolean)
                                .join(" / ") || "—"}
                            </Typography>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: 150,
                                    height: 375,
                                    bgcolor: "background.default",
                                    borderColor: "text.secondary",
                                    borderWidth: 2,
                                    borderStyle: "solid"
                                }}
                            >
                                <Stack direction="row" alignItems="center" justifyContent="center"
                                       sx={{ position: "absolute", top: 0, right: -28, height: "100%" }}
                                >
                                    <Divider
                                        orientation="vertical"
                                        flexItem
                                        sx={{ height: 375, borderStyle: "dashed" }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "text.secondary",
                                            textOrientation: "sideways",
                                            textAlign: "center",
                                            writingMode: "vertical-lr"
                                        }}
                                    >
                                        {wardrobe.dims.slidingOpeningHeight} mm
                                    </Typography>
                                </Stack>
                            </Box>
                            <Divider flexItem sx={{ borderStyle: "dashed" }}/>
                            <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center" }}>
                                {wardrobe.dims.doorWidth} mm
                            </Typography>
                        </Stack>
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default WardrobeVisual;
