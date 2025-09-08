import { useMutation } from "@tanstack/react-query";
import { MappedWardrobe, MappedWardrobeSchema, SalesOrder, SalesOrderSchema } from "@/types";

type useMapPdfProps = {
    onSuccess?: (data: MappedWardrobe) => void;
};

const useMapPdf = ({ onSuccess }: useMapPdfProps) => {
    return useMutation({
        mutationFn: async (data: SalesOrder) => {
            const body = SalesOrderSchema.parse(data);
            console.log(JSON.stringify(body, null, 2));
            const response = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/map", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            });
            const json = await response.json();
            console.log(json);
            return MappedWardrobeSchema.parse(json);
        },
        onSuccess: async (data) => {
            onSuccess?.(data);
        },
        onError: (err) => {
            console.error("Mapping failed:", err);
            alert("Mapping failed. Please try again.");
        }
    });
};

export default useMapPdf;
