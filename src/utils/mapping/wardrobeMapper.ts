import frameConfig from "@/data/frame-config.json";
import panelConfig from "@/data/panel-config.json";
import type { Wardrobe, FrameConfig, PanelConfig, UnleashedLineItem } from "@/types";

const frameConfigs: FrameConfig[] = frameConfig;
const panelConfigs: PanelConfig[] = panelConfig;

// Strips parentheses suffix, e.g. "Mirror (Mirror)" -> "Mirror"
function normalizePanelName(panel: string): string {
  return panel.split("(")[0].trim();
}

// Find matching frame config by colour and framework type substring
function getFrameConfig(colour: string, type: string): FrameConfig {
  const match = frameConfigs.find(
    c => c.mswColour === colour && type.includes(c.mswFrameworkType)
  );
  if (!match) throw new Error(`Frame config not found for ${colour} ${type}`);
  return match;
}

// Find matching panel config by normalized panel name
function getPanelConfig(rawPanel: string): PanelConfig {
  const name = normalizePanelName(rawPanel);
  const match = panelConfigs.find(c => c.mswPanel === name);
  if (!match) throw new Error(`Panel config not found for ${name}`);
  return match;
}

// Determine width bracket
function getDoorWidthBracket(width: number): string {
  if (width <= 603) return "603";
  if (width <= 1035) return "1035";
  return "1220";
}

// Build codes and comments
function buildDoorCode(frame: FrameConfig, panel: PanelConfig, width: number): string {
  const bracket = getDoorWidthBracket(width);
  return `DRS-${frame.unleashedFrameworkType}-${panel.priceBand}-${bracket}`;
}

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

function getTrackCode(dims: Wardrobe["dims"], frame: FrameConfig): string {
  return `${frame.unleashedTrackPackCode}.${dims.trackLength}`;
}

function getSoftCloseCount(accessories: Wardrobe["accessories"]): number {
  return accessories.reduce((acc, cur) =>
    cur.componentName.toLowerCase().includes("soft close") ? acc + cur.quantity : acc
  , 0);
}

function getSoftCloseDirectionCounts(details: Wardrobe["doorDetails"]): { left: number; right: number } {
  return details.reduce((acc, door) => {
    if (door.softClose === "Left") acc.left++;
    if (door.softClose === "Right") acc.right++;
    return acc;
  }, { left: 0, right: 0 });
}

/**
 * Transforms a wardrobe definition into a set of Unleashed line items using config mappings.
 *
 * @param wardrobe - The raw parsed wardrobe input (from order.json)
 * @returns An array of UnleashedLineItem objects representing parts for Unleashed
 *
 * @example
 * const items = mapWardrobeToUnleashedItems(wardrobe);
 * console.log(items);
 */
export function mapWardrobeToUnleashedItems(
  wardrobe: Wardrobe
): UnleashedLineItem[] {
  const { dims, doorDetails, accessories } = wardrobe;
  const frame = getFrameConfig(dims.frameworkColour, dims.frameworkType);

  const result: UnleashedLineItem[] = [];

  // Group doors by panel type
  const groups = doorDetails.reduce((acc, door) => {
    const key = normalizePanelName(door.doorPanel);
    (acc[key] = acc[key] || []).push(door);
    return acc;
  }, {} as Record<string, typeof doorDetails>);

  // Door line items
  Object.entries(groups).forEach(([panelName, doors]) => {
    const panel = getPanelConfig(panelName);
    const code = buildDoorCode(frame, panel, dims.doorWidth);
    const comment = buildLineItemComment(dims, frame, panel);
    result.push({ code, qty: doors.length, comment });
  });

  // Design code entry
  result.push({
    code: frame.unleashedTrackPackCode,
    qty: doorDetails.length,
    comment: "Door Design"
  });

  // Track pack entry
  result.push({
    code: getTrackCode(dims, frame),
    qty: 1,
    comment: "Track Kit"
  });

  // Soft close kit entry
  const scQty = getSoftCloseCount(accessories);
  if (scQty > 0) {
    result.push({ code: "DRS-Softclose", qty: scQty, comment: "Soft Close Kit" });
  }

  // Soft close direction summary
  const dirs = getSoftCloseDirectionCounts(doorDetails);
  result.push({ code: "", qty: "", comment: `Left: ${dirs.left}, Right: ${dirs.right}` });

  return result;
}