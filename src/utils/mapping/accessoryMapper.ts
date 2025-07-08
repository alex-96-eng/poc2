import { AccessoryConfigSchema, SuffixConfigSchema, QuantityRule } from "@/types";
import rawAccessoryConfig from "@/data/accessory-config.json";
import rawSuffixConfig from "@/data/suffix-config.json";

import type { Accessory, UnleashedLineItem, AccessoryConfig, SuffixConfig } from "@/types";

// Normalize accessory name by stripping trailing parenthesis groups
function normalizeAccessoryName(name: string): string {
  return name.replace(/\s*\([^)]+\)\s*$/g, "").trim();
}

// Normalize panel name e.g. "Matt White (Glass)" → "Matt White"
function normalizePanel(panel: string): string {
  return panel.split("(")[0].trim().toLowerCase();
}

// Build full product code from the base code and suffix
export function applySuffix(baseCode: string, suffix: string): string {
  return baseCode.endsWith("-") ? `${baseCode}${suffix}` : `${baseCode}-${suffix}`;
}

// Compute quantity based on config rule
export function calculateQuantity(
  rule: QuantityRule,
  baseQty: number,
  multiplier?: number | null,
  fixed?: number | null
): number {
  switch (rule) {
    case QuantityRule.Match:
      return baseQty;
    case QuantityRule.Multiply:
      return multiplier != null ? multiplier * baseQty : baseQty;
    case QuantityRule.Fixed:
      return fixed != null ? fixed : 1;
    default:
      throw new Error(`Unknown quantity rule: ${rule}`);
  }
}

// Prepare accessory config with normalized keys
const accessoryConfig: AccessoryConfig[] = rawAccessoryConfig.map(c => ({
  ...AccessoryConfigSchema.parse(c),
  componentName: normalizeAccessoryName(c.componentName).toLowerCase()
}));

// Prepare suffix config mapping
const suffixConfig: SuffixConfig = SuffixConfigSchema.parse(rawSuffixConfig);
const normalizedSuffixConfig: Record<string, string> = Object.fromEntries(
  Object.entries(suffixConfig).map(([k, v]) => [k.trim().toLowerCase(), v])
);

/**
 * Maps accessories to Unleashed line items.
 * - Matches accessory names to config (normalized)
 * - Applies suffix based on panel (unless noSuffix)
 * - Computes quantity based on rule
 */
export function mapAccessoriesToUnleashedItems(
  accessories: Accessory[],
  inferredPanel: string
): UnleashedLineItem[] {
  const normalizedPanel = normalizePanel(inferredPanel);
  const suffix = normalizedSuffixConfig[normalizedPanel];
  if (!suffix) {
    console.warn(
      `⚠️ No suffix found for panel '${inferredPanel}' (normalized: '${normalizedPanel}')`
    );
  }

  return accessories.flatMap(acc => {
    const baseName = normalizeAccessoryName(acc.componentName).toLowerCase();
    const config = accessoryConfig.find(c => c.componentName === baseName);
    if (!config) {
      console.warn(
        `⚠️ No config match for: '${acc.componentName}' → normalized: '${baseName}'`
      );
      return [];
    }

    return config.entries.map(entry => {
      let code: string;
      if (entry.noSuffix) {
        code = entry.code;
      } else if (suffix) {
        code = applySuffix(entry.code, suffix);
      } else {
        console.warn(
          `⚠️ Missing suffix for panel '${inferredPanel}', cannot apply suffix to '${entry.code}', using base code`
        );
        code = entry.code;
      }

      const qty = calculateQuantity(
        entry.quantityRule,
        acc.quantity,
        entry.multiplier,
        entry.fixedQuantity
      );

      return {
        code,
        qty,
        comment: acc.componentName
      } as UnleashedLineItem;
    });
  });
}
