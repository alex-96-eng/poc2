import { z } from "zod";

export const DeliverySchema = z.object({
  customerName: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  addressLine3: z.string(),
  customerPhone: z.string(),
  deliveryNotes: z.string(),
});
export type Delivery = z.infer<typeof DeliverySchema>;

export enum SupplierAdminChargeType {
  Yes = "Yes",
  No = "No",
}

export const SupplierHeaderSchema = z.object({
  orderNumber: z.string(),
  dateOrdered: z.coerce.date(),
  numberOfWardrobes: z.coerce.number(),
  netGoods: z.string(),
  netDelivery: z.string(),
  discountPercent: z.string(),
  discountAmount: z.string(),
  // Python accepts "Yes" | "No" OR a money string (e.g., "£0.00")
  supplierAdminCharge: z.union([z.nativeEnum(SupplierAdminChargeType), z.string()]),
  netTotal: z.string(),
  vat: z.string(),
  grossTotal: z.string(),
});
export type SupplierHeader = z.infer<typeof SupplierHeaderSchema>;

export const WardrobeDimsSchema = z.object({
  slidingOpeningWidth: z.coerce.number(),
  slidingOpeningHeight: z.coerce.number(),
  doorWidth: z.coerce.number(),
  frontDoorType: z.string(),
  rearDoorType: z.string(),
  frameworkType: z.string(),
  frameworkColour: z.string(),
  trackLength: z.coerce.number(),
});
export type WardrobeDims = z.infer<typeof WardrobeDimsSchema>;

export const PanelSchema = z.object({
  name: z.string(),
});
export type Panel = z.infer<typeof PanelSchema>;

export const DoorDetailSchema = z.object({
  doorNumber: z.string(),
  quantity: z.coerce.number(),
  doorCost: z.string(),
  softClose: z.string(),
  // Python expects panels: list[Panel] not a single string
  panels: z.array(PanelSchema),
});
export type DoorDetail = z.infer<typeof DoorDetailSchema>;

export const ItemSchema = z.object({
  quantity: z.coerce.number(),
  name: z.string(),
  netCost: z.string(),
  colour: z.string().optional().nullable(), // optional in Python
});
export type Item = z.infer<typeof ItemSchema>;

export const AccessoriesSchema = z.array(ItemSchema);
export const InternalsSchema = z.array(ItemSchema);
export const ExtrasSchema = z.array(ItemSchema);

export const WardrobeSchema = z.object({
  wardrobeNumber: z.coerce.number(),
  dims: WardrobeDimsSchema,
  doorDetails: z.array(DoorDetailSchema),
  accessories: AccessoriesSchema,
  internals: InternalsSchema,
  extras: ExtrasSchema,
});
export type Wardrobe = z.infer<typeof WardrobeSchema>;

export const ParsedResponseSchema = z.object({
  delivery: DeliverySchema,
  supplierHeader: SupplierHeaderSchema,
  wardrobes: z.array(WardrobeSchema),
});
export type ParsedResponse = z.infer<typeof ParsedResponseSchema>;
