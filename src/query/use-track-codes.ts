import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const TrackCodeSchema = z.object({
    "track-codes": z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
        quantity_multiplier: z.number(),
    }))
});
export type TrackCode = z.infer<typeof TrackCodeSchema>;

const useTrackCodes = () => {
    return useQuery({
        queryKey: ["mapping", "track-codes"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/track-codes", {
                method: "GET"
            });
            const json = await res.json();
            console.log(json);
            return TrackCodeSchema.parse(json);
        },
        throwOnError: true
    });
};

export default useTrackCodes;
