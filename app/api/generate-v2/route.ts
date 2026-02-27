import { NextRequest, NextResponse } from "next/server";
import { Color } from "@/types";

// Tonal steps: same hue, varying lightness/saturation
// Produces a palette usable for real UI work (text, brand, backgrounds)
const TONAL_STEPS = [
  { name: "ダーク",   role: "テキスト・アイコン用",  lTarget: 22, sScale: 0.85 },
  { name: "シェード", role: "ボーダー・アクティブ用", lTarget: 38, sScale: 1.0  },
  { name: "ベース",   role: "ブランドカラー",         lTarget: 55, sScale: 1.0  },
  { name: "ティント", role: "ホバー背景用",            lTarget: 75, sScale: 0.75 },
  { name: "ペール",   role: "薄い背景用",              lTarget: 94, sScale: 0.4  },
];

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
    return Math.round(255 * color).toString(16).padStart(2, "0");
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

function generateTonalPalette(hue: number, baseSaturation: number): Color[] {
  return TONAL_STEPS.map((step) => ({
    hex: hslToHex(hue, Math.round(baseSaturation * step.sScale), step.lTarget),
    name: step.name,
    role: step.role,
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
    colors = generateTonalPalette(hue, 65);
  } else {
    const normalized = baseColor.startsWith("#") ? baseColor : `#${baseColor}`;
    const [h, s] = hexToHsl(normalized);
    // Ensure enough saturation to produce a visible tonal range
    colors = generateTonalPalette(h, Math.max(s, 45));
  }

  return NextResponse.json({ colors });
}
