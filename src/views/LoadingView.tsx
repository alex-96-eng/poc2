import { CircularProgress, keyframes, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const shimmer = keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
`;

const AnimatedText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(
    90deg,
    ${theme.palette.text.primary} 25%,
    white 50%,
    ${theme.palette.text.primary} 75%
  )`,
    backgroundSize: "200% auto",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${shimmer} 3s linear infinite`,
    transition: "opacity 0.6s ease-in-out",
}));

type LoadingViewProps = {
    messages: string[];
    delay?: number;
}
const LoadingView = ({messages, delay = 5000}: LoadingViewProps) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const showNext = () => {
            // Only continue if there is a next message
            if (index < messages.length - 1) {
                // start fade out
                setFade(false);

                timeout = setTimeout(() => {
                    setIndex((prev) => prev + 1);
                    setFade(true);
                    // schedule next step
                    timeout = setTimeout(showNext, delay);
                }, 600); // match transition duration
            }
        };

        timeout = setTimeout(showNext, delay);

        return () => clearTimeout(timeout);
    }, [delay, index, messages.length]);

    return (
        <Stack
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", width: "100%", flexGrow: 1 }}
        >
            <AnimatedText sx={{ opacity: fade ? 1 : 0 }}>
                {messages[index]}
            </AnimatedText>
            <CircularProgress />
        </Stack>
    );
};

export default LoadingView;
