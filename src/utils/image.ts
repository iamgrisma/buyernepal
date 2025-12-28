import type { RequestInitCfPropertiesImage } from "@cloudflare/workers-types";

// The generated types have a TODO regarding rgba verification for the trim color.
// Documentation for Cloudflare Images indicates CSS4 color syntax is supported for other color properties (e.g. background),
// which implies rgba support for trim color as well.
// We provide a helper to construct these options safely and validate the color format.

export interface TrimOptions {
  color: string;
  tolerance?: number;
  keep?: number;
}

export interface TrimBorderConfig {
    color: string;
    tolerance?: number;
    keep?: number;
}

/**
 * Constructs the image trim border options.
 * Verifies that the color format is likely supported.
 *
 * Usage example:
 * ```ts
 * const imageOptions: RequestInitCfPropertiesImage = {
 *   trim: {
 *     border: getTrimBorderOptions({ color: "rgba(0,0,0,0)" })
 *   }
 * };
 * ```
 */
export function getTrimBorderOptions(options: TrimOptions): TrimBorderConfig {
    const { color, tolerance, keep } = options;

    // Basic validation to ensure color looks like a valid CSS color string
    if (!isValidColor(color)) {
        console.warn(`Warning: Color '${color}' may not be supported. Use hex, rgb(), or rgba().`);
    }

    // We return the inner object expected by the 'border' property of the trim object
    return {
        color,
        tolerance,
        keep
    };
}

function isValidColor(color: string): boolean {
    const hex = /^#([0-9a-fA-F]{3}){1,2}$/;
    const rgb = /^rgb\(\s*\d+\s*[,\s]\s*\d+\s*[,\s]\s*\d+\s*\)$/;
    // Supports standard comma-separated and CSS4 space-separated rgba
    const rgba = /^rgba\(\s*\d+\s*[,\s]\s*\d+\s*[,\s]\s*\d+\s*[,\s/]\s*[\d.%]+\s*\)$/;

    return hex.test(color) || rgb.test(color) || rgba.test(color) || /^[a-z]+$/i.test(color);
}
