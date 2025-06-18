import { ParsedResponse, SupplierAdminChargeType } from "@/types";
import { mapSalesOrderRequest } from "@/utils/mapping/salesOrderMapper";

describe("mapSalesOrderRequest", () => {
  it("maps a ParsedResponse into a valid SalesOrderCreateRequest payload", () => {
    const parsed: ParsedResponse = {
      deliveryInfo: {
        orderNumber: "ORD123",
        dateOrdered: new Date("2025-06-18"),
        numberOfWardrobes: 1,
        customerName: "John Doe",
        addressLine1: "123 High St",
        addressLine2: "London",
        addressLine3: "NW1 2DB",
        customerPhone: "07000000000",
        deliveryNotes: "Ring the bell and wait"
      },
      supplierHeader: {
        orderNumber: "SUP-789",
        dateOrdered: new Date("2025-06-18"),
        numberOfWardrobes: 1,
        netGoods: "£100.00",
        netDelivery: "£10.00",
        discountPercent: "10%",
        discountAmount: "£10.00",
        supplierAdminCharge: SupplierAdminChargeType.No,
        netTotal: "£100.00",
        vat: "£20.00",
        grossTotal: "£120.00"
      },
      wardrobes: [
        {
          wardrobeNumber: 1,
          dims: {
            slidingOpeningWidth: 1200,
            slidingOpeningHeight: 2400,
            frontDoorType: "Classic",
            rearDoorType: "Classic",
            frameworkType: "Steel S200",
            frameworkColour: "Bright White",
            trackLength: 2400,
            doorWidth: 600
          },
          doorDetails: [],
          accessories: [],
          lineItems: [
            {
              code: "DRS-S200-B-1035",
              qty: 2,
              comment: "Primary panel"
            },
            {
              code: "ACC-SOFT-CLOSE",
              qty: "1",
              comment: "Soft close mechanism"
            }
          ]
        }
      ]
    };

    const result = mapSalesOrderRequest(parsed);

    expect(result.CustomerReference).toBe("ORD123");
    expect(result.Delivery.Name).toBe("John Doe");
    expect(result.Delivery.AddressLine1).toBe("123 High St");
    expect(result.Delivery.City).toBe("London");
    expect(result.Delivery.Postcode).toBe("NW1 2DB");
    expect(result.Delivery.Instructions).toBe("Ring the bell and wait");

    expect(result.Comments).toBe("Auto-uploaded from PDF Parser Order #ORD123");

    expect(Array.isArray(result.Lines)).toBe(true);
    expect(result.Lines.length).toBe(2);
    expect(result.Lines[0]).toMatchObject({
      ProductCode: "DRS-S200-B-1035",
      OrderQuantity: 1,
      Comment: "Primary panel"
    });
    expect(result.Lines[1]).toMatchObject({
      ProductCode: "ACC-SOFT-CLOSE",
      OrderQuantity: 1,
      Comment: "Soft close mechanism"
    });

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 7);
    const resultDate = new Date(result.RequiredDate);
    expect(resultDate.toDateString()).toBe(expectedDate.toDateString());
  });
});
