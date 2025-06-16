import { mapWardrobeToUnleashedItems } from "@/utils/mapping/wardrobeMapper";
import type { Wardrobe } from "@/types";

describe("mapWardrobeToUnleashedItems", () => {
  const mockWardrobe: Wardrobe = {
    wardrobeNumber: 1,
    dims: {
      slidingOpeningWidth: 1272,
      slidingOpeningHeight: 2310,
      doorWidth: 656,
      frontDoorType: "Denver Single Panel",
      rearDoorType: "Denver Single Panel",
      frameworkType: "Steel S200",
      frameworkColour: "Bright White",
      trackLength: 2000,
    },
    doorDetails: [
      {
        doorNumber: "Door 1",
        quantity: 1,
        doorCost: "£107.80",
        softClose: "Left",
        doorPanel: "Mirror (Mirror)",
      },
      {
        doorNumber: "Door 2",
        quantity: 1,
        doorCost: "£94.60",
        softClose: "Right",
        doorPanel: "Mirror (Mirror)",
      },
    ],
    accessories: [
      {
        quantity: 2,
        componentName: "Soft Close Device & Adapter Plates",
        netCost: "£0.00",
      },
      {
        quantity: 1,
        componentName: "Door Positioner (for top track) Chrome",
        netCost: "£0.41",
      },
    ],
  };

  it("should generate correct Unleashed line items using embedded configs", () => {
    const result = mapWardrobeToUnleashedItems(mockWardrobe);

    expect(result).toEqual([
      {
        code: "DRS-S200-A-1035",
        qty: 2,
        comment: "OA 1272 CH 2310 DW 656 S200 White Clear Mirror",
      },
      {
        code: "DRS-S2-TP38-WH",
        qty: 2,
        comment: "Door Design",
      },
      {
        code: "DRS-S2-TP38-WH.2000",
        qty: 1,
        comment: "Track Kit",
      },
      {
        code: "DRS-Softclose",
        qty: 2,
        comment: "Soft Close Kit",
      },
      {
        code: "",
        qty: "",
        comment: "Left: 1, Right: 1",
      },
    ]);
  });
});
