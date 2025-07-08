import {Accessory, QuantityRule, UnleashedLineItem} from "@/types";
import {applySuffix, calculateQuantity, mapAccessoriesToUnleashedItems} from "@/utils/mapping/accessoryMapper";

// Mock data
const mockAccessories: Accessory[] = [
  {
    componentName: "Finished Board End Panel (640mm x 2800mm)",
    quantity: 2,
    netCost: "£0.00"
  }
];

const expectedOutput: UnleashedLineItem[] = [
  {
    code: "MFC-ENDPANEL-W1000-ST9",
    qty: 2,
    comment: "Finished Board End Panel (640mm x 2800mm)"
  }
];

describe("mapAccessoriesToUnleashedItems", () => {
  it("maps a simple MATCH accessory with correct suffix", () => {
    const result = mapAccessoriesToUnleashedItems(mockAccessories, "Matt White");
    expect(result).toEqual(expectedOutput);
  });
});
describe("mapAccessoriesToUnleashedItems - complex config rules", () => {
  it("handles MULTIPLY and FIXED rules with multiple entries", () => {
    const dummyAccessory: Accessory = {
      componentName: "Dummy Component",
      quantity: 2,
      netCost: "£0.00"
    };

    const dummySuffix = "DUMMY-SFX";

    const dummyConfig = {
      componentName: "Dummy Component",
      entries: [
        {
          prefix: "CODE-MULTI",
          quantityRule: QuantityRule.Multiply,
          multiplier: 3
        },
        {
          prefix: "CODE-FIXED",
          quantityRule: QuantityRule.Fixed,
          fixedQuantity: 7
        }
      ]
    };

    const result = dummyConfig.entries.map(entry => ({
      code: applySuffix(entry.prefix, dummySuffix),
      qty: calculateQuantity(
        entry.quantityRule,
        dummyAccessory.quantity,
        entry.multiplier,
        entry.fixedQuantity
      ),
      comment: dummyAccessory.componentName
    }));

    const expected: UnleashedLineItem[] = [
      {
        code: "CODE-MULTI-DUMMY-SFX",
        qty: 6, // 2 * 3
        comment: "Dummy Component"
      },
      {
        code: "CODE-FIXED-DUMMY-SFX",
        qty: 7,
        comment: "Dummy Component"
      }
    ];

    expect(result).toEqual(expected);
  });
});

it("skips accessories not found in config", () => {
  const accessories: Accessory[] = [
    {
      componentName: "Nonexistent Component",
      quantity: 1,
      netCost: "£0.00"
    }
  ];

  const result = mapAccessoriesToUnleashedItems(accessories, "Matt White");
  expect(result).toEqual([]);
});

it("returns empty array if suffix not found for panel", () => {
  const accessories = [
    { componentName: "Dummy Component", quantity: 1, netCost: "£0.00" }
  ];

  const result = mapAccessoriesToUnleashedItems(accessories, "Unknown Panel");
  expect(result).toEqual([]);
});

it("returns empty array if no accessories provided", () => {
  const result = mapAccessoriesToUnleashedItems([], "Matt White");
  expect(result).toEqual([]);
});
