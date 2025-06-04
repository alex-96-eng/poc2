"use client";
import { PropsWithChildren } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const theme = createTheme({
    palette: {
        background: {
            default: "#f5f6f7"
        }
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: "var(--font-geist-sans)"
    },
    components: {
        MuiCard: {
            defaultProps: {
                variant: "outlined"
            }
        },
    }
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <AppRouterCacheProvider>
            <MuiThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {children}
                </LocalizationProvider>
            </MuiThemeProvider>
        </AppRouterCacheProvider>
    );
};

export default ThemeProvider;
