import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const BandSchema = z.object({
    bands: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
    }))
});
export type Band = z.infer<typeof BandSchema>;

const useBands = () => {
    return useQuery({
        queryKey: ["mapping", "bands"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/bands", {
                method: "GET"
            });
            const json = await res.json();
            return BandSchema.parse(json);
        }
    });
};

export default useBands;
