import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const PrefixSchema = z.object({
    prefixes: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
    }))
});
export type Prefix = z.infer<typeof PrefixSchema>;

const usePrefixes = () => {
    return useQuery({
        queryKey: ["mapping", "prefixes"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/prefixes", {
                method: "GET"
            });
            const json = await res.json();
            return PrefixSchema.parse(json);
        }
    });
};

export default usePrefixes;
