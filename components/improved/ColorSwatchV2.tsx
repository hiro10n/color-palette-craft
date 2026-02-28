"use client";

import { useState } from "react";
import { Color } from "@/types";
import { contrastRatio, wcagLevel, bestTextColor, WcagLevel } from "@/lib/contrast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  color: Color;
  onCopy: (hex: string) => void;
};

const LEVEL_STYLES: Record<WcagLevel, string> = {
  AAA:       "bg-emerald-100 text-emerald-700",
  AA:        "bg-blue-100 text-blue-700",
  "AA Large": "bg-amber-100 text-amber-700",
  Fail:      "bg-red-100 text-red-600",
};

export default function ColorSwatchV2({ color, onCopy }: Props) {
  const [hovered, setHovered] = useState(false);

  const whiteContrast = contrastRatio(color.hex, "#ffffff");
  const blackContrast = contrastRatio(color.hex, "#000000");
  const bestContrast  = Math.max(whiteContrast, blackContrast);
  const textColor     = bestTextColor(color.hex);
  const level         = wcagLevel(bestContrast);

  return (
    <div className="flex flex-col gap-2">
      {/* Color block — single click target */}
      <button
        onClick={() => onCopy(color.hex)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full aspect-4/3 rounded-xl overflow-hidden border border-black/5 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ backgroundColor: color.hex }}
        aria-label={`${color.hex} をコピー`}
      >
        {hovered && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: `${color.hex}aa` }}
          >
            <div
              className="rounded-full p-1.5"
              style={{ backgroundColor: textColor === "#ffffff" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)" }}
            >
              <svg width="16" height="16" fill={textColor} viewBox="0 0 16 16">
                <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
              </svg>
            </div>
          </div>
        )}
      </button>

      {/* Metadata */}
      <div className="space-y-0.5 min-w-0">
        {color.name && (
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
            {color.name}
          </p>
        )}
        {color.role && (
          <p className="text-[10px] text-gray-400 truncate leading-tight">
            {color.role}
          </p>
        )}
        <p className="text-xs font-mono text-gray-500 truncate">
          {color.hex}
        </p>
        <Badge
          className={cn("text-[10px] font-semibold border-0", LEVEL_STYLES[level])}
        >
          {level} {bestContrast.toFixed(1)}:1
        </Badge>
      </div>
    </div>
  );
}
