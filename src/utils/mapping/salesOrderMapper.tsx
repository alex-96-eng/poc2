import { ParsedResponse } from "@/types";
import { mapWardrobeToUnleashedItems } from "./wardrobeMapper";

export function mapSalesOrderRequest(parsed: ParsedResponse) {

  const requiredDate = new Date(); // todo;
  requiredDate.setDate(requiredDate.getDate() + 7);

  const Lines = parsed.wardrobes.flatMap(wardrobe => {
    const items = wardrobe.lineItems ?? mapWardrobeToUnleashedItems(wardrobe as any);
    return items
      .filter(item => item.code && item.code.trim() !== "")
      .map(item => ({
        ProductCode: item.code,
        OrderQuantity:
          typeof item.qty === "string" ? parseInt(item.qty, 10) : item.qty,
        Comment: item.comment || undefined
      }));
  });

  return {
    CustomerReference: "CU0001",
    RequiredDate: requiredDate.toISOString(),
    Delivery: {
      Name: parsed.delivery.customerName,
      AddressLine1: parsed.delivery.addressLine1,
      City: parsed.delivery.addressLine2 || "",
      Postcode: parsed.delivery.addressLine3 || "",
      Instructions: parsed.delivery.deliveryNotes || ""
    },
    Lines,
    Comments: `Auto-uploaded from PDF Parser Order`
  };
}
