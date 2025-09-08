import { useMutation } from "@tanstack/react-query";
import { SalesOrder } from "@/types";
import { z } from "zod";

export const SalesOrderCreateSchema = z.object({
    customer_reference: z.string(),
    required_date: z.coerce.date(),
    delivery: z.object({
        name: z.string(),
        address_line1: z.string(),
        city: z.string(),
        postcode: z.string(),
        instructions: z.string()
    }),
    lines: z.array(z.object({
        product_code: z.string(),
        order_quantity: z.number(),
        comment: z.string().nullable(),
        unit_price: z.number().nullable().default(null),
    })),
    comments: z.string().nullable()
});
export type SalesOrderCreateRequest = z.infer<typeof SalesOrderCreateSchema>;
export type SalesOrderCreateInput = z.input<typeof SalesOrderCreateSchema>;

type useSubmitSaleProps = {
    onSuccess?: (data: SalesOrder) => void;
};

const useSubmitSale = ({ onSuccess }: useSubmitSaleProps) => {
    return useMutation({
        mutationFn: async (mapping: SalesOrderCreateInput) => {
            if (!mapping) {
                alert("No mapped data to upload. Please complete the mapping step first.");
                return;
            }
            if (!mapping.required_date) {
                alert("Required Date is missing. Please set it in Mapped Line Items.");
                return;
            }
            if (!mapping.lines || mapping.lines.length === 0) {
                alert("There are no mapped lines to upload.");
                return;
            }
            const body = SalesOrderCreateSchema.parse(mapping);
            const response = await fetch("http://localhost:8000/api/v1/sales-order", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            });
            return await response.json();
        },
        onSuccess: async (data) => {
            onSuccess?.(data);
        },
        onError: (err) => {
            console.error("Upload failed:", err);
            alert("Upload failed. Please try again.");
        }
    });
};

export default useSubmitSale;
