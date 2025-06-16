import { Wardrobe, FrameConfig, PanelConfig, UnleashedLineItem } from "@/types";

// Strips anything in parentheses from a panel name (e.g., "Mirror (Mirror)" -> "Mirror")
function normalizePanelName(panel: string): string {
  return panel.split("(")[0].trim();
}

// Finds the matching frame config based on colour and framework type
function getFrameConfig(colour: string, type: string, configs: FrameConfig[]): FrameConfig | undefined {
  return configs.find(c => c.mswColour === colour && type.includes(c.mswFrameworkType));
}

// Finds the matching panel config by normalized panel name
function getPanelConfig(rawPanel: string, configs: PanelConfig[]): PanelConfig | undefined {
  const name = normalizePanelName(rawPanel);
  return configs.find(c => c.mswPanel === name);
}

// Retrieves the design code for the door from the frame configuration
function getDoorDesignCode(colour: string, type: string, frameConfigs: FrameConfig[]): string {
  const frame = getFrameConfig(colour, type, frameConfigs);
  return frame?.unleashedTrackPackCode ?? "";
}

// Classifies door width into predefined brackets: 603, 1035, or 1220
function getDoorWidthBracket(width: number): string {
  if (width <= 603) return "603";
  if (width <= 1035) return "1035";
  return "1220";
}

// Builds a Unleashed door item code from framework, price band, and width bracket
function buildDoorCode(framework: string, band: string, widthBracket: string): string {
  return `DRS-${framework}-${band}-${widthBracket}`;
}

// Builds a human-readable comment for the line item based on dimensions and material mappings
function buildLineItemComment(
  dims: Wardrobe["dims"],
  frame: FrameConfig,
  panel: PanelConfig
): string {
  return [
    `OA ${dims.slidingOpeningWidth}`,
    `CH ${dims.slidingOpeningHeight}`,
    `DW ${dims.doorWidth}`,
    frame.unleashedFrameworkType,
    frame.unleashedColour,
    panel.unleashedPanelName
  ].join(" ");
}

// Builds the full track pack code including length (e.g., DRS-S2-TP38-WH.2000)
function getTrackCode(trackLength: number, frame: FrameConfig): string {
  return `${frame.unleashedTrackPackCode}.${trackLength}`;
}

// Sums the total quantity of soft-close components from accessories
function getSoftCloseCount(accessories: Wardrobe["accessories"]): number {
  return accessories.reduce((acc, cur) =>
    cur.componentName.toLowerCase().includes("soft close")
      ? acc + cur.quantity
      : acc, 0);
}

// Counts how many doors have Left vs. Right soft-close mechanisms
function getSoftCloseDirectionCounts(details: Wardrobe["doorDetails"]): { left: number; right: number } {
  return details.reduce((acc, door) => {
    if (door.softClose === "Left") acc.left++;
    if (door.softClose === "Right") acc.right++;
    return acc;
  }, { left: 0, right: 0 });
}

// Main function: Transforms a wardrobe object into Unleashed line items using provided config mappings
/**
 * Transforms a wardrobe definition into a set of Unleashed line items using config mappings.
 *
 * @param wardrobe - The raw parsed wardrobe input (from order.json)
 * @param frameConfigs - Config list mapping mswColour + frameworkType to Unleashed codes
 * @param panelConfigs - Config list mapping panel names to price bands and descriptions
 *
 * @returns An array of UnleashedLineItem objects representing parts for Unleashed
 *
 * @example
 * Input:
 * {
 *   dims: {
 *     slidingOpeningWidth: 1272,
 *     slidingOpeningHeight: 2310,
 *     doorWidth: 656,
 *     frameworkType: "Steel S200",
 *     frameworkColour: "Bright White",
 *     trackLength: 2000,
 *     frontDoorType: "Denver Single Panel",
 *     rearDoorType: "Denver Single Panel"
 *   },
 *   doorDetails: [
 *     { doorPanel: "Mirror (Mirror)", softClose: "Left", ... },
 *     { doorPanel: "Mirror (Mirror)", softClose: "Right", ... }
 *   ],
 *   accessories: [
 *     { componentName: "Soft Close Device", quantity: 2 },
 *     ...
 *   ]
 * }
 *
 * Output:
 * [
 *   {
 *     code: "DRS-S200-A-1035",
 *     qty: 2,
 *     comment: "OA 1272 CH 2310 DW 656 S200 White Clear Mirror"
 *   },
 *   {
 *     code: "DRS-S2-TP38-WH",
 *     qty: 2,
 *     comment: "Door Design"
 *   },
 *   {
 *     code: "DRS-S2-TP38-WH.2000",
 *     qty: 1,
 *     comment: "Track Kit"
 *   },
 *   {
 *     code: "DRS-Softclose",
 *     qty: 2,
 *     comment: "Soft Close Kit"
 *   },
 *   {
 *     code: "",
 *     qty: "",
 *     comment: "Left: 1, Right: 1"
 *   }
 * ]
 */
export function mapWardrobeToUnleashedItems(
  wardrobe: Wardrobe,
  frameConfigs: FrameConfig[],
  panelConfigs: PanelConfig[],
): UnleashedLineItem[] {
  const result: UnleashedLineItem[] = [];
  const { dims, doorDetails, accessories } = wardrobe;

  const frame = getFrameConfig(dims.frameworkColour, dims.frameworkType, frameConfigs);
  if (!frame) throw new Error("Frame config not found");

  // Group door details by panel type
  const grouped = doorDetails.reduce((acc, door) => {
    const key = normalizePanelName(door.doorPanel);
    acc[key] = acc[key] || [];
    acc[key].push(door);
    return acc;
  }, {} as Record<string, typeof doorDetails>);

  // Generate door line items for each panel group
  for (const [panelName, doors] of Object.entries(grouped)) {
    const panel = getPanelConfig(panelName, panelConfigs);
    if (!panel) continue;
    const code = buildDoorCode(
      frame.unleashedFrameworkType,
      panel.priceBand,
      getDoorWidthBracket(dims.doorWidth)
    );
    const comment = buildLineItemComment(dims, frame, panel);
    result.push({ code, qty: doors.length, comment });
  }

  // Add design code entry
  result.push({
    code: getDoorDesignCode(dims.frameworkColour, dims.frameworkType, frameConfigs),
    qty: doorDetails.length,
    comment: "Door Design"
  });

  // Add track pack code
  result.push({
    code: getTrackCode(dims.trackLength, frame),
    qty: 1,
    comment: "Track Kit"
  });

  // Add soft close pack if present
  const softCloseQty = getSoftCloseCount(accessories);
  if (softCloseQty > 0) {
    result.push({ code: "DRS-Softclose", qty: softCloseQty, comment: "Soft Close Kit" });
  }

  // Add comment line for left/right soft close directions
  const dirs = getSoftCloseDirectionCounts(doorDetails);
  result.push({ code: "", qty: "", comment: `Left: ${dirs.left}, Right: ${dirs.right}` });

  console.log(result)
  return result;
}
