import { NextRequest, NextResponse } from "next/server";
import { Color } from "@/types";

const KEYWORD_SATURATION = 60;
const KEYWORD_LIGHTNESS = 55;
const KEYWORD_HUE_OFFSETS = [-60, -30, 0, 30, 60];
const BASECOLOR_HUE_OFFSETS = [-40, -20, 0, 20, 40];
const COLOR_NAMES = ["Deep", "Muted", "Base", "Light", "Bright"] as const;

function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash) % 360;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function generatePalette(
  hue: number,
  s: number,
  l: number,
  offsets: number[]
): Color[] {
  return offsets.map((offset, i) => ({
    hex: hslToHex((hue + offset + 360) % 360, s, l),
    name: COLOR_NAMES[i],
  }));
}

export async function POST(req: NextRequest) {
  const { keyword, baseColor } = await req.json();

  if (!keyword && !baseColor) {
    return NextResponse.json(
      { error: "keyword または baseColor が必要です" },
      { status: 400 }
    );
  }

  let colors: Color[];

  if (keyword) {
    const hue = hashToHue(keyword);
    colors = generatePalette(hue, KEYWORD_SATURATION, KEYWORD_LIGHTNESS, KEYWORD_HUE_OFFSETS);
  } else {
    const normalized = baseColor.startsWith("#") ? baseColor : `#${baseColor}`;
    const [h, s, l] = hexToHsl(normalized);
    colors = generatePalette(h, s, l, BASECOLOR_HUE_OFFSETS);
  }

  return NextResponse.json({ colors });
}
