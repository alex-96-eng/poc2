import { z } from "zod";


export const DeliveryInfoSchema = z.object({
    orderNumber: z.string(),
    dateOrdered: z.coerce.date(),
    numberOfWardrobes: z.coerce.number(),
    customerName: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    addressLine3: z.string(),
    customerPhone: z.string(),
    deliveryNotes: z.string(),
});

export type DeliveryInfo = z.infer<typeof DeliveryInfoSchema>;

export enum SupplierAdminChargeType {
    Yes = "Yes",
    No = "No"
}

export const SupplierHeaderSchema = z.object({
    orderNumber: z.string(),
    dateOrdered: z.coerce.date(),
    numberOfWardrobes: z.coerce.number(),
    netGoods: z.string(),
    netDelivery: z.string(),
    discountPercent: z.string(),
    discountAmount: z.string(),
    supplierAdminCharge: z.nativeEnum(SupplierAdminChargeType),
    netTotal: z.string(),
    vat: z.string(),
    grossTotal: z.string(),
});

export type SupplierHeader = z.infer<typeof SupplierHeaderSchema>;

export const WardrobeDimsSchema = z.object({
    slidingOpeningWidth: z.coerce.number(),
    slidingOpeningHeight: z.coerce.number(),
    frontDoorType: z.string(),
    rearDoorType: z.string(),
    frameworkType: z.string(),
    frameworkColour: z.string(),
    trackLength: z.coerce.number(),
    doorWidth: z.coerce.number(),
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

export const WardrobeSchema = z.object({
    wardrobeNumber: z.coerce.number(),
    dims: WardrobeDimsSchema,
    doorDetails: z.array(DoorDetailSchema),
    accessories: z.array(AccessorySchema),
});

export type Wardrobe = z.infer<typeof WardrobeSchema>;

export const ParsedResponseSchema = z.object({
    deliveryInfo: DeliveryInfoSchema,
    supplierHeader: SupplierHeaderSchema,
    wardrobes: z.array(WardrobeSchema)
});

export type ParsedResponse = z.infer<typeof ParsedResponseSchema>;

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
  panelCode: z.string(), // some are empty strings
});

export type PanelConfig = z.infer<typeof PanelConfigSchema>;

export const DoorDesignConfigSchema = z.object({
  internalCode: z.string(),
  description: z.string(),
});

export type DoorDesignConfig = z.infer<typeof DoorDesignConfigSchema>;

export const FrameConfigListSchema = z.array(FrameConfigSchema);
export const PanelConfigListSchema = z.array(PanelConfigSchema);
export const DoorDesignConfigListSchema = z.array(DoorDesignConfigSchema);

export const UnleashedLineItemSchema = z.object({
  code: z.string(),
  qty: z.union([z.number(), z.string()]),
  comment: z.string()
});

export type UnleashedLineItem = z.infer<typeof UnleashedLineItemSchema>;