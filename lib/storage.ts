import { Palette } from "@/types";

const STORAGE_KEY = "color-palettes";
const MAX_PALETTES = 20;

export function savePalette(palette: Palette): void {
  const palettes = loadPalettes();
  palettes.unshift(palette);
  if (palettes.length > MAX_PALETTES) {
    palettes.splice(MAX_PALETTES);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
}

export function loadPalettes(): Palette[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deletePalette(id: string): void {
  const palettes = loadPalettes().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
}
