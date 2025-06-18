import { ParsedResponse } from "@/types";

export function mapSalesOrderRequest(parsed: ParsedResponse) {
  const requiredDate = new Date();
  requiredDate.setDate(requiredDate.getDate() + 7);

  return {
    CustomerReference: parsed.deliveryInfo.orderNumber ?? "",
    RequiredDate: requiredDate.toISOString(),
    Delivery: {
      Name: parsed.deliveryInfo.customerName,
      AddressLine1: parsed.deliveryInfo.addressLine1,
      City: parsed.deliveryInfo.addressLine2 || "London",
      Postcode: parsed.deliveryInfo.addressLine3 || "N/A",
      Instructions: parsed.deliveryInfo.deliveryNotes ?? "",
    },
    // Lines: parsed.wardrobes.flatMap(w =>
    //   (w.lineItems ?? []).filter(i => i.code).map(item => ({
    //     ProductCode: item.code,
    //     OrderQuantity: 1,
    //     Comment: item.comment ?? null
    //   }))
    // ),
    Lines: [
        {
          ProductCode: "MFC-LINER-2451 DE",
          OrderQuantity: 1,
          Comment: "Placeholder until mapping is complete"
      }
    ],
    Comments: `Auto-uploaded from PDF Parser Order #${parsed.deliveryInfo.orderNumber}`
  };
}