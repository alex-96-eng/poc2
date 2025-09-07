import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const FrameSchema = z.object({
    frames: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
    }))
});
export type Frame = z.infer<typeof FrameSchema>;

const useFrames = () => {
    return useQuery({
        queryKey: ["mapping", "frames"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/frames", {
                method: "GET"
            });
            const json = await res.json();
            return FrameSchema.parse(json);
        }
    });
};

export default useFrames;
