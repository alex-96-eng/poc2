import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const DoorSchema = z.object({
    doors: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string().nullable() })),
        label: z.string()
    }))
});
export type Door = z.infer<typeof DoorSchema>;


const useDoors = () => {
    return useQuery({
        queryKey: ["mapping", "doors"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/doors", {
                method: "GET"
            });
            const json = await res.json();
            return DoorSchema.parse(json);

        }
    });
};

export default useDoors;
