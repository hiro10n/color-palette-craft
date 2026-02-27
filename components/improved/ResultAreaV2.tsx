"use client";

import { useState } from "react";
import { Color } from "@/types";
import ColorSwatchV2 from "./ColorSwatchV2";

type Props = {
  colors: Color[];
  onCopy: (hex: string) => void;
  onSave: () => void;
  onToast: (message: string) => void;
};

const ROLE_KEYS = ["dark", "shade", "base", "tint", "pale"];
const SHADE_KEYS = [900, 700, 500, 300, 100];

function toCSSVars(colors: Color[]): string {
  const lines = colors.map((c, i) => `  --color-${ROLE_KEYS[i]}: ${c.hex};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

function toTailwindConfig(colors: Color[]): string {
  const entries = colors.map((c, i) => `      ${SHADE_KEYS[i]}: "${c.hex}"`);
  return `// tailwind.config.js\nextend: {\n  colors: {\n    primary: {\n${entries.join(",\n")}\n    }\n  }\n}`;
}

// Ghost placeholder shown in empty state
const DEMO_HEXES = ["#312e81", "#4338ca", "#6366f1", "#a5b4fc", "#eef2ff"];

export default function ResultAreaV2({ colors, onCopy, onSave, onToast }: Props) {
  const [exportOpen, setExportOpen] = useState(false);

  if (colors.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-5">
          生成結果プレビュー
        </p>
        {/* Ghost palette preview */}
        <div className="grid grid-cols-5 gap-3 opacity-20 pointer-events-none select-none">
          {DEMO_HEXES.map((hex, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div
                className="w-full aspect-[4/3] rounded-xl"
                style={{ backgroundColor: hex }}
              />
              <div className="h-2.5 bg-gray-300 rounded w-3/4" />
              <div className="h-2 bg-gray-200 rounded w-1/2" />
              <div className="h-2 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 text-center mt-6">
          キーワードまたはベースカラーを入力して生成してください
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          生成されたパレット
        </p>
        <div className="flex items-center gap-2">
          {/* Export dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setExportOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              書き出し
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 7 L1 2 L9 2 Z" />
              </svg>
            </button>
            {exportOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setExportOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20 min-w-[180px]">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(toCSSVars(colors));
                      setExportOpen(false);
                      onToast("CSS カスタムプロパティをコピーしました");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    CSS カスタムプロパティ
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(toTailwindConfig(colors));
                      setExportOpen(false);
                      onToast("Tailwind 設定をコピーしました");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Tailwind config
                  </button>
                </div>
              </>
            )}
          </div>
          <button
            onClick={onSave}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {colors.map((color, i) => (
          <ColorSwatchV2 key={i} color={color} onCopy={onCopy} />
        ))}
      </div>
    </div>
  );
}
