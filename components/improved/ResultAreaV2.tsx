"use client";

import { Color } from "@/types";
import ColorSwatchV2 from "./ColorSwatchV2";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg">
                書き出し
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-45">
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(toCSSVars(colors));
                  onToast("CSS カスタムプロパティをコピーしました");
                }}
              >
                CSS カスタムプロパティ
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(toTailwindConfig(colors));
                  onToast("Tailwind 設定をコピーしました");
                }}
              >
                Tailwind config
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="h-8 text-xs rounded-lg" onClick={onSave}>
            保存
          </Button>
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
