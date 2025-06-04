export interface DeliveryInfo {
    orderNumber: string;
    dateOrdered: string;
    numberOfWardrobes: string;
    customerName: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    customerPhone: string;
    deliveryNotes: string;
}

export interface SupplierHeader {
    orderNumber: string;
    dateOrdered: string;
    numberOfWardrobes: string;
    netGoods: string;
    netDelivery: string;
    discountPercent: string;
    discountAmount: string;
    supplierAdminCharge: string;
    netTotal: string;
    vat: string;
    grossTotal: string;
}

export interface WardrobeDims {
    slidingOpeningWidth: string;
    slidingOpeningHeight: string;
    frontDoorType: string;
    rearDoorType: string;
    frameworkType: string;
    frameworkColour: string;
    trackLength: string;
    doorWidth: string;
}

export interface DoorDetail {
    doorNumber: string;
    quantity: string;
    doorCost: string;
    softClose: string;
    doorPanel: string;
}

export interface Accessory {
    quantity: string;
    componentName: string;
    netCost: string;
}

export interface Wardrobe {
    wardrobeNumber: number;
    dims: WardrobeDims;
    doorDetails: DoorDetail[];
    accessories: Accessory[];
}

export interface ParsedResponse {
    deliveryInfo: DeliveryInfo;
    supplierHeader: SupplierHeader;
    wardrobes: Wardrobe[];
}
