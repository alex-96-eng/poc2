import { useMutation } from "@tanstack/react-query";
import { SalesOrder, SalesOrderSchema } from "@/types";

type useParsedPdfsProps = {
    onSuccess?: (data: SalesOrder) => void;
};

const useParsePdfs = ({ onSuccess }: useParsedPdfsProps) => {
    return useMutation({
        mutationFn: async ({ deliveryFile, supplierFile }: { deliveryFile: File; supplierFile: File }) => {
            const formData = new FormData();
            formData.append("files", deliveryFile);
            formData.append("files", supplierFile);
            const response = await fetch("https://api-sandbox-da41.up.railway.app/api/v1/pdf/parse", {
                method: "POST",
                body: formData,
            });
            const json = await response.json();
            return SalesOrderSchema.parse(json);
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

export default useParsePdfs;
