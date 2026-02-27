"use client";

import { Color } from "@/types";
import ColorSwatch from "./ColorSwatch";

type Props = {
  colors: Color[];
  onCopy: (hex: string) => void;
  onSave: () => void;
};

export default function ResultArea({ colors, onCopy, onSave }: Props) {
  if (colors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-400">
        <p className="text-4xl mb-3">🎨</p>
        <p>キーワードまたはベースカラーを入力して生成ボタンを押してください</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">生成されたパレット</h2>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          保存する
        </button>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {colors.map((color, i) => (
          <ColorSwatch key={i} color={color} onCopy={onCopy} />
        ))}
      </div>
    </div>
  );
}
