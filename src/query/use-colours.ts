import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const ColourSchema = z.object({
    colours: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
    }))
});
export type Colour = z.infer<typeof ColourSchema>;

const useColours = () => {
    return useQuery({
        queryKey: ["mapping", "colours"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/colours", {
                method: "GET"
            });
            const json = await res.json();
            return ColourSchema.parse(json);
        }
    });
};

export default useColours;
