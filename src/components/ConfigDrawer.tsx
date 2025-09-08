import { Box, CardHeader, Divider, Drawer, IconButton, Paper, Tab, Tabs } from "@mui/material";
import ConfigBands from "@/components/ConfigBands";
import { ReactNode, useState } from "react";
import ConfigAccessories from "@/components/ConfigAccessories";
import ConfigColours from "@/components/ConfigColours";
import ConfigDoors from "@/components/ConfigDoors";
import ConfigFrames from "@/components/ConfigFrames";
import ConfigPanels from "@/components/ConfigPanels";
import ConfigPrefixes from "@/components/ConfigPrefixes";
import ConfigTrackCodes from "@/components/ConfigTrackCodes";
import { Close } from "@mui/icons-material";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            p={3}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{ height: "100%" }}
            {...other}
        >
            {value === index && children}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
        sx: {
            textTransform: "none",
            px: 1.5,
            minWidth: 0
        }
    };
}

type ConfigDrawerProps = {
    handleDrawerClose: VoidFunction;
    drawerWidth: number;
    open: boolean;
};

const ConfigDrawer = ({ drawerWidth, handleDrawerClose, open }: ConfigDrawerProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 0,
                    position: "sticky",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                }}
            >
                <CardHeader
                    title="Config"
                    slotProps={{
                        title: {
                            variant: "h6"
                        }
                    }}
                    avatar={
                        <IconButton onClick={handleDrawerClose}>
                            <Close/>
                        </IconButton>
                    }
                />
                <Divider/>
                <Tabs
                    sx={{ mx: 0 }}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Bands" {...a11yProps(0)} />
                    <Tab label="Accessories" {...a11yProps(1)} />
                    <Tab label="Colours" {...a11yProps(2)} />
                    <Tab label="Doors" {...a11yProps(3)} />
                    <Tab label="Frames" {...a11yProps(4)} />
                    <Tab label="Panels" {...a11yProps(5)} />
                    <Tab label="Prefixes" {...a11yProps(6)} />
                    <Tab label="Track Codes" {...a11yProps(7)} />
                </Tabs>
                <Divider/>
            </Paper>

            {
                [
                    ConfigBands,
                    ConfigAccessories,
                    ConfigColours,
                    ConfigDoors,
                    ConfigFrames,
                    ConfigPanels,
                    ConfigPrefixes,
                    ConfigTrackCodes
                ].map((Item, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                        {<Item/>}
                    </CustomTabPanel>
                ))
            }
        </Drawer>
    );
};

export default ConfigDrawer;
