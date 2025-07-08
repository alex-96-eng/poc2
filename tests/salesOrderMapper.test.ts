import { ParsedResponse, SupplierAdminChargeType } from "@/types";
import { mapSalesOrderRequest } from "@/utils/mapping/salesOrderMapper";

describe("mapSalesOrderRequest", () => {
  it("maps a ParsedResponse into a valid SalesOrderCreateRequest payload", () => {
    const parsed: ParsedResponse = {
      delivery: {
        customerName: "John Doe",
        addressLine1: "123 High St",
        addressLine2: "London",
        addressLine3: "NW1 2DB",
        customerPhone: "07000000000",
        deliveryNotes: "Ring the bell and wait",
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

    expect(result.CustomerReference).toBe("CMS001");
    expect(result.Delivery.Name).toBe("John Doe");
    expect(result.Delivery.AddressLine1).toBe("123 High St");
    expect(result.Delivery.City).toBe("London");
    expect(result.Delivery.Postcode).toBe("NW1 2DB");
    expect(result.Delivery.Instructions).toBe("Ring the bell and wait");

    // lets add the files names that we parsed the info from
    expect(result.Comments).toBe("Auto-uploaded from PDF Parser");

    expect(Array.isArray(result.Lines)).toBe(true);
    expect(result.Lines.length).toBe(2);
    expect(result.Lines[0]).toMatchObject({
      ProductCode: "DRS-S200-B-1035",
      OrderQuantity: 2,
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


describe("mapSalesOrderRequest - full integration", () => {
  it("maps a full ParsedResponse into SalesOrderCreateRequest with door and accessory codes", () => {
    const parsed: ParsedResponse = {
      delivery: {
        customerName: "Alice Smith",
        addressLine1: "456 Elm Street",
        addressLine2: "Manchester",
        addressLine3: "M1 2AB",
        customerPhone: "07123456789",
        deliveryNotes: "Back door please"
      },
      supplierHeader: {
        orderNumber: "SUP-321",
        dateOrdered: new Date("2025-07-01"),
        numberOfWardrobes: 1,
        netGoods: "£200.00",
        netDelivery: "£15.00",
        discountPercent: "5%",
        discountAmount: "£10.00",
        supplierAdminCharge: "No",
        netTotal: "£205.00",
        vat: "£41.00",
        grossTotal: "£246.00"
      },
      wardrobes: [
        {
          wardrobeNumber: 1,
          dims: {
            slidingOpeningWidth: 1200,
            slidingOpeningHeight: 2300,
            frontDoorType: "Classic",
            rearDoorType: "Classic",
            frameworkType: "Steel S200",
            frameworkColour: "Bright White",
            trackLength: 2400,
            doorWidth: 600
          },
          doorDetails: [
              {
                  doorNumber: "Door 1",
                  quantity: 1,
                  doorCost: "£100",
                  softClose: "None",
                  doorPanel: "Matt White (Glass)"
              }
          ],
          accessories: [
            {
              componentName: "Finished Board End Panel (640mm x 2800mm)",
              quantity: 2,
              netCost: "£0.00"
            }
          ],
          lineItems: [
            {
              code: "DRS-S200-A-1200",
              qty: 2,
              comment: "Main sliding door set"
            }
          ]
        }
      ]
    };

    const result = mapSalesOrderRequest(parsed);

    expect(result.CustomerReference).toBe("CMS001");
    expect(result.Delivery).toMatchObject({
      Name: "Alice Smith",
      AddressLine1: "456 Elm Street",
      City: "Manchester",
      Postcode: "M1 2AB",
      Instructions: "Back door please"
    });

    expect(result.Comments).toContain("Auto-uploaded");

    const hasMainDoor = result.Lines.find(l => l.ProductCode === "DRS-S200-A-1200");
    const hasAccessory = result.Lines.find(l => l.ProductCode.startsWith("MFC-ENDPANEL"));

    expect(hasMainDoor).toMatchObject({
      ProductCode: "DRS-S200-A-1200",
      OrderQuantity: 2,
      Comment: "Main sliding door set"
    });

    expect(hasAccessory).toMatchObject({
      OrderQuantity: 2,
      Comment: "Finished Board End Panel (640mm x 2800mm)"
    });

    expect(result.Lines.length).toBeGreaterThanOrEqual(2);
  });
});

it("merges line items from multiple wardrobes into a single Lines array", () => {
  const parsed: ParsedResponse = {
    delivery: {
      customerName: "Multi Wardrobe User",
      addressLine1: "1 Merge Lane",
      addressLine2: "Leeds",
      addressLine3: "LS1 1AA",
      customerPhone: "07000000001",
      deliveryNotes: ""
    },
    supplierHeader: {
      orderNumber: "SUP-999",
      dateOrdered: new Date("2025-07-08"),
      numberOfWardrobes: 2,
      netGoods: "£300.00",
      netDelivery: "£20.00",
      discountPercent: "0%",
      discountAmount: "£0.00",
      supplierAdminCharge: "No",
      netTotal: "£320.00",
      vat: "£64.00",
      grossTotal: "£384.00"
    },
    wardrobes: [
      {
        wardrobeNumber: 1,
        dims: {
          slidingOpeningWidth: 1000,
          slidingOpeningHeight: 2200,
          frontDoorType: "Classic",
          rearDoorType: "Classic",
          frameworkType: "Steel S200",
          frameworkColour: "Bright White",
          trackLength: 2000,
          doorWidth: 500
        },
        doorDetails: [],
        accessories: [],
        lineItems: [
          {
            code: "DRS-DOOR-A-1000",
            qty: 1,
            comment: "Wardrobe 1 door"
          }
        ]
      },
      {
        wardrobeNumber: 2,
        dims: {
          slidingOpeningWidth: 1200,
          slidingOpeningHeight: 2300,
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
            code: "DRS-DOOR-B-1200",
            qty: 2,
            comment: "Wardrobe 2 door"
          }
        ]
      }
    ]
  };

  const result = mapSalesOrderRequest(parsed);

  expect(result.Lines.length).toBe(2);

  expect(result.Lines).toEqual(
    expect.arrayContaining([
      {
        ProductCode: "DRS-DOOR-A-1000",
        OrderQuantity: 1,
        Comment: "Wardrobe 1 door"
      },
      {
        ProductCode: "DRS-DOOR-B-1200",
        OrderQuantity: 2,
        Comment: "Wardrobe 2 door"
      }
    ])
  );
});
