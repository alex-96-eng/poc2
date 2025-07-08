import { ParsedResponse } from "@/types";
import { mapWardrobeToUnleashedItems } from "./wardrobeMapper";
import { mapAccessoriesToUnleashedItems } from "./accessoryMapper";

export function mapSalesOrderRequest(parsed: ParsedResponse) {
  const requiredDate = new Date();
  requiredDate.setDate(requiredDate.getDate() + 7);

  const Lines = parsed.wardrobes.flatMap(wardrobe => {
    const wardrobeItems = wardrobe.lineItems ?? mapWardrobeToUnleashedItems(wardrobe);

    const inferredPanel =
      wardrobe.doorDetails.find(d => d.doorPanel)?.doorPanel ??
      wardrobe.dims.frameworkColour;

    let accessoryItems: any[] = [];
    try {
      accessoryItems = mapAccessoriesToUnleashedItems(wardrobe.accessories, inferredPanel);
      console.log(`Wardrobe #${wardrobe.wardrobeNumber} accessory items:`, accessoryItems);
    } catch (err) {
      console.warn(`Accessory mapping failed for wardrobe #${wardrobe.wardrobeNumber}: ${err}`);
    }

    return [...wardrobeItems, ...accessoryItems]
      .filter(item => item.code && item.code.trim() !== "")
      .map(item => ({
        ProductCode: item.code,
        OrderQuantity:
          typeof item.qty === "string" ? parseInt(item.qty, 10) : item.qty,
        Comment: item.comment || undefined
      }));
  });

  return {
    CustomerReference: "CMS001",
    RequiredDate: requiredDate.toISOString(),
    Delivery: {
      Name: parsed.delivery.customerName,
      AddressLine1: parsed.delivery.addressLine1,
      City: parsed.delivery.addressLine2 || "",
      Postcode: parsed.delivery.addressLine3 || "",
      Instructions: parsed.delivery.deliveryNotes || ""
    },
    Lines,
    Comments: `Auto-uploaded from PDF Parser`
  };
}