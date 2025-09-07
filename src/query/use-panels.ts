import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const PanelSchema = z.object({
    panels: z.array(z.object({
        aliases: z.array(z.string()),
        items: z.array(z.object({ code: z.string() })),
        label: z.string(),
    }))
});
export type Panel = z.infer<typeof PanelSchema>;

const usePanels = () => {
    return useQuery({
        queryKey: ["mapping", "panels"],
        queryFn: async () => {
            const res = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/mappings/panels", {
                method: "GET"
            });
            const json = await res.json();
            return PanelSchema.parse(json);
        }
    });
};

export default usePanels;
