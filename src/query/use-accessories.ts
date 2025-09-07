import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const AccessoriesSchema = z.object({
    accessories: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
        quantity_multiplier: z.number() // FIXME: Casing
    }))
});
export type Accessories = z.infer<typeof AccessoriesSchema>;

const useAccessories = () => {
    return useQuery({
        queryKey: ["mapping", "accessories"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/accessories", {
                method: "GET"
            });
            const json = await res.json();
            console.log(json);
            return AccessoriesSchema.parse(json);
        }
    });
};

export default useAccessories;
