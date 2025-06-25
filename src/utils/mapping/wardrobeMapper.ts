import frameConfig from "@/data/frame-config.json";
import panelConfig from "@/data/panel-config.json";
import doorConfig from "@/data/door-config.json";
import type { Wardrobe, FrameConfig, PanelConfig, UnleashedLineItem, DoorConfig } from "@/types";

// Cast JSON to typed arrays
const frameConfigs: FrameConfig[] = frameConfig;
const panelConfigs: PanelConfig[] = panelConfig;
const doorConfigs: DoorConfig[] = doorConfig;

// Normalize panel name by stripping parentheses
function normalizePanelName(panel: string): string {
  return panel.split("(")[0].trim();
}

// Lookup frame config by MSW colour & type
function getFrameConfig(colour: string, type: string): FrameConfig {
  const match = frameConfigs.find(
    c => c.mswColour === colour && c.mswFrameworkType === type
  );
  if (!match) {
    const options = frameConfigs.map(c => `${c.mswColour} (${c.mswFrameworkType})`).join("\n");
    throw new Error(`Frame config not found for ${colour} (${type}). Options:\n${options}`);
  }
  return match;
}

// Lookup panel config by normalized name
function getPanelConfig(rawPanel: string): PanelConfig {
  const name = normalizePanelName(rawPanel);
  const match = panelConfigs.find(c => c.mswPanel === name);
  if (!match) throw new Error(`Panel config not found for ${name}`);
  return match;
}

// Determine door design code or skip if Denver
function getDoorDesignCode(front: string, rear: string): string | undefined {
  const mapping = doorConfigs.find(
    m => front.includes(m.mswDoorType) || rear.includes(m.mswDoorType)
  );
  if (!mapping || mapping.mswDoorType === "Denver") return undefined;
  return mapping.code;
}

// Bucket door width to nearest bracket
function getDoorWidthBracket(width: number): string {
  if (width <= 603) return "603";
  if (width <= 1035) return "1035";
  return "1220";
}

// Get closest standard track length for cut-to-size logic
function getNearestTrackBracket(length: number): number {
  if (length <= 2000) return 2000;
  if (length <= 3000) return 3000;
  return 5000;
}

// Build the DRS door code
function buildDoorCode(
  frame: FrameConfig,
  panel: PanelConfig,
  width: number
): string {
  const bracket = getDoorWidthBracket(width);
  return `DRS-${frame.unleashedFrameworkType}-${panel.priceBand}-${bracket}`;
}

// Build the line item comment for door code
function buildDoorComment(
  dims: Wardrobe['dims'],
  frame: FrameConfig,
  panel: PanelConfig
): string {
  const dimsPart = `OA ${dims.slidingOpeningWidth}MM / CH ${dims.slidingOpeningHeight}MM / DW ${dims.doorWidth}MM`;
  const matPart = `${frame.unleashedFrameworkType} ${frame.unleashedColour} ${panel.unleashedPanelName}`;
  return `${dimsPart} ${matPart}`;
}

// Build free issue track code
function getTrackCode(dims: Wardrobe['dims'], frame: FrameConfig): string {
  return `${frame.unleashedTrackPackCode}.${dims.trackLength}`;
}

// Count soft-close accessory qty
function getSoftCloseCount(accessories: Wardrobe['accessories']): number {
  return accessories.reduce(
    (sum, a) =>
      a.componentName.toLowerCase().includes('soft close')
        ? sum + a.quantity
        : sum,
    0
  );
}

// Generate per-door soft-close summary
function buildSoftCloseSummary(
  details: Wardrobe['doorDetails']
): string {
  return details.map(d => `${d.doorNumber} ${d.softClose}`).join(' / ');
}

/**
 * Transforms a wardrobe into Unleashed line items following mapping rules:
 * 1) Door Code + comment
 * 2) Optional Door Design Code
 * 3) Free Issue Track or Cut-to-Size + optional pack prefix
 * 4) Soft Close Code + summary
 */
export function mapWardrobeToUnleashedItems(
  wardrobe: Wardrobe
): UnleashedLineItem[] {
  const { dims, doorDetails, accessories } = wardrobe;
  const frame = getFrameConfig(dims.frameworkColour, dims.frameworkType);
  const result: UnleashedLineItem[] = [];

  // 1) Door Code items
  const groups = doorDetails.reduce((acc, d) => {
    const key = normalizePanelName(d.doorPanel);
    (acc[key] = acc[key] || []).push(d);
    return acc;
  }, {} as Record<string, typeof doorDetails>);
  for (const [panelName, doors] of Object.entries(groups)) {
    const panel = getPanelConfig(panelName);
    result.push({
      code: buildDoorCode(frame, panel, dims.doorWidth),
      qty: doors.length,
      comment: buildDoorComment(dims, frame, panel)
    });
  }

  // 2) Door Design Code
  const designCode = getDoorDesignCode(
    dims.frontDoorType,
    dims.rearDoorType
  );
  if (designCode) {
    result.push({ code: designCode, qty: doorDetails.length, comment: '' });
  }

  // 3) Track Code or Cut-to-Size
  const standard = [2000, 3000, 5000];
  if (standard.includes(dims.trackLength)) {
    result.push({ code: getTrackCode(dims, frame), qty: 1, comment: '' });
  } else {
    // Pack prefix at nearest standard
    const bracket = getNearestTrackBracket(dims.trackLength);
    result.push({ code: `${frame.unleashedTrackPackCode}.${bracket}`, qty: 1, comment: '' });
    // Additional cut-to-size charge
    result.push({
      code: '010-CUTTOSIZE',
      qty: 1,
      comment: `Track Length ${dims.trackLength}`
    });
  }

  // 4) Soft Close
  const scQty = getSoftCloseCount(accessories);
  if (scQty > 0) {
    result.push({
      code: 'DRS-Softclose',
      qty: scQty,
      comment: buildSoftCloseSummary(doorDetails)
    });
  }

  console.log(result)
  return result;
}
