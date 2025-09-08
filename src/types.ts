import { z } from "zod";

/* ========== Step 1: SalesOrder (parsed from PDF) ========== */

/** Delivery (Customer Delivery Ticket) */
export const DeliverySchema = z.object({
  customerName: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  addressLine3: z.string(),
  customerPhone: z.string(),
  deliveryNotes: z.string(),
});
export type Delivery = z.infer<typeof DeliverySchema>;

/** Supplier PO Header */
export enum SupplierAdminChargeType {
  Yes = "Yes",
  No = "No",
}
export const SupplierHeaderSchema = z.object({
  orderNumber: z.string(),
  // Python expects a real date; make it required here
  dateOrdered: z.coerce.date(),
  numberOfWardrobes: z.coerce.number(),
  netGoods: z.string(),
  netDelivery: z.string(),
  discountPercent: z.string(),
  discountAmount: z.string(),
  supplierAdminCharge: z.union([z.nativeEnum(SupplierAdminChargeType), z.string()]),
  netTotal: z.string(),
  vat: z.string(),
  grossTotal: z.string(),
});
export type SupplierHeader = z.infer<typeof SupplierHeaderSchema>;

/** Wardrobe dims */
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

/** Panel */
export const PanelSchema = z.object({ name: z.string() });
export type Panel = z.infer<typeof PanelSchema>;

/** Door detail */
export const DoorDetailSchema = z.object({
  doorNumber: z.string(),
  quantity: z.coerce.number(),
  doorCost: z.string(),
  softClose: z.string(),
  panels: z.array(PanelSchema).default([]), // default [] so payload always has the key
});
export type DoorDetail = z.infer<typeof DoorDetailSchema>;

/** Generic item (Accessory / Internal / Extra) — matches Python Item */
export const ItemSchema = z.object({
  quantity: z.coerce.number(),
  name: z.string(),
  netCost: z.string(),
  colour: z.string().optional().nullable(),
});
export type Item = z.infer<typeof ItemSchema>;

/** Wardrobe — REQUIRED lists present even when empty */
export const WardrobeSchema = z.object({
  wardrobeNumber: z.coerce.number(),
  dims: WardrobeDimsSchema,
  doorDetails: z.array(DoorDetailSchema).default([]),
  accessories: z.array(ItemSchema).default([]),
  internals: z.array(ItemSchema).default([]), // required by server
  extras: z.array(ItemSchema).default([]),    // required by server
  // NOTE: Do not include any client-only fields here when posting to Python.
});
export type Wardrobe = z.infer<typeof WardrobeSchema>;

/** Optional: if you still need local "unleashed line items" for UI-only use */
export const UnleashedLineItemSchema = z.object({
  code: z.string(),
  qty: z.union([z.number(), z.string()]),
  comment: z.string(),
});
export type UnleashedLineItem = z.infer<typeof UnleashedLineItemSchema>;

/** SalesOrder (top-level payload expected by the Python API) */
export const SalesOrderSchema = z.object({
  supplierHeader: SupplierHeaderSchema,
  wardrobes: z.array(WardrobeSchema).default([]),
  delivery: DeliverySchema,
});
export type SalesOrder = z.infer<typeof SalesOrderSchema>;

/** Back-compat alias if you’re still importing ParsedResponse elsewhere */
export const ParsedResponseSchema = SalesOrderSchema;
export type ParsedResponse = z.infer<typeof ParsedResponseSchema>;

/* ========== Step 2: Mapping result (separate form) ========== */

/** One mapped line from the mapping API */
export const MappedLineSchema = z.object({
  ProductCode: z.string(),
  OrderQuantity: z.coerce.number(),
  Comment: z.string().optional().nullable(),
});
export type MappedWardrobeLine = z.infer<typeof MappedLineSchema>;

/** Full mapping API payload (order-level) */
export const MappedWardrobeSchema = z.object({
  CustomerReference: z.string(),
  RequiredDate: z.string(), // ISO "YYYY-MM-DD"
  Delivery: z.object({
    Name: z.string(),
    AddressLine1: z.string(),
    City: z.string(),
    Postcode: z.string(),
    Instructions: z.string().optional().nullable(),
  }),
  Lines: z.array(MappedLineSchema).default([]),
});
export type MappedWardrobe = z.infer<typeof MappedWardrobeSchema>;
