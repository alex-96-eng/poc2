import { z } from "zod";

// -----------------------------
// Delivery & Supplier Header
// -----------------------------
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
  No = "No"
}

export const SupplierHeaderSchema = z.object({
  orderNumber: z.string(),
  dateOrdered: z.coerce.date().nullable(),
  numberOfWardrobes: z.coerce.number(),
  netGoods: z.string(),
  netDelivery: z.string(),
  discountPercent: z.string(),
  discountAmount: z.string(),
  supplierAdminCharge: z.union([
    z.nativeEnum(SupplierAdminChargeType),
    z.string()
  ]),
  netTotal: z.string(),
  vat: z.string(),
  grossTotal: z.string(),
});
export type SupplierHeader = z.infer<typeof SupplierHeaderSchema>;

// -----------------------------
// Wardrobe & Components
// -----------------------------
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

export const DoorDetailSchema = z.object({
  doorNumber: z.string(),
  quantity: z.coerce.number(),
  doorCost: z.string(),
  softClose: z.string(),
  doorPanel: z.string(),
});
export type DoorDetail = z.infer<typeof DoorDetailSchema>;

export const AccessorySchema = z.object({
  quantity: z.coerce.number(),
  componentName: z.string(),
  netCost: z.string(),
});
export type Accessory = z.infer<typeof AccessorySchema>;

export const UnleashedLineItemSchema = z.object({
  code: z.string(),
  qty: z.union([z.number(), z.string()]),
  comment: z.string(),
});
export type UnleashedLineItem = z.infer<typeof UnleashedLineItemSchema>;

export const WardrobeSchema = z.object({
  wardrobeNumber: z.coerce.number(),
  dims: WardrobeDimsSchema,
  doorDetails: z.array(DoorDetailSchema),
  accessories: z.array(AccessorySchema),
  lineItems: z.array(UnleashedLineItemSchema).optional(),
});
export type Wardrobe = z.infer<typeof WardrobeSchema>;

// -----------------------------
// Mapping Configs (Flat/Legacy)
// -----------------------------
export const FrameConfigSchema = z.object({
  mswColour: z.string(),
  mswFrameworkType: z.string(),
  unleashedFrameworkType: z.string(),
  unleashedColour: z.string(),
  unleashedTrackPackCode: z.string(),
});
export type FrameConfig = z.infer<typeof FrameConfigSchema>;

export const PanelConfigSchema = z.object({
  mswPanel: z.string(),
  unleashedPanelName: z.string(),
  priceBand: z.string(),
  panelCode: z.string(),
});
export type PanelConfig = z.infer<typeof PanelConfigSchema>;

export const DoorConfigSchema = z.object({
  mswDoorType: z.string(),
  code: z.string(),
});
export type DoorConfig = z.infer<typeof DoorConfigSchema>;

// -----------------------------
// Final parsed wardrobe structure
// -----------------------------
export const ParsedResponseSchema = z.object({
  delivery: DeliverySchema,
  supplierHeader: SupplierHeaderSchema,
  wardrobes: z.array(WardrobeSchema),
});
export type ParsedResponse = z.infer<typeof ParsedResponseSchema>;

// -----------------------------
// Suffix Config (Record<string, string>)
// -----------------------------
export const SuffixConfigSchema = z.record(z.string());
export type SuffixConfig = z.infer<typeof SuffixConfigSchema>;

// -----------------------------
// Normalized Configs: Accessories & Extras
// -----------------------------
export enum QuantityRule {
  Match = "MATCH",
  Multiply = "MULTIPLY",
  Fixed = "FIXED"
}

// Accessory entries
export const AccessoryEntrySchema = z.object({
  code: z.string(),                 // renamed from prefix
  quantityRule: z.nativeEnum(QuantityRule),
  multiplier: z.number().nullable().optional(),
  fixedQuantity: z.number().nullable().optional(),
  noSuffix: z.boolean()
});

export const AccessoryConfigSchema = z.object({
  componentName: z.string(),
  entries: z.array(AccessoryEntrySchema)
});
export type AccessoryConfig = z.infer<typeof AccessoryConfigSchema>;

// Extras entries (standalone code)
export const ExtraEntrySchema = z.object({
  code: z.string(),
  quantityRule: z.nativeEnum(QuantityRule),
  multiplier: z.number().nullable().optional(),
  fixedQuantity: z.number().nullable().optional()
});

export const ExtrasConfigSchema = z.object({
  componentName: z.string(),
  entries: z.array(ExtraEntrySchema)
});
export type ExtrasConfig = z.infer<typeof ExtrasConfigSchema>;
