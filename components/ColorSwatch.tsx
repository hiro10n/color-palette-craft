"use client";

import { Color } from "@/types";

type Props = {
  color: Color;
  onCopy: (hex: string) => void;
};

export default function ColorSwatch({ color, onCopy }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => onCopy(color.hex)}
        className="w-full aspect-square rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer border border-gray-200"
        style={{ backgroundColor: color.hex }}
        title={`クリックでコピー: ${color.hex}`}
      />
      {color.name && (
        <p className="text-xs text-gray-500 text-center truncate w-full">
          {color.name}
        </p>
      )}
      <button
        onClick={() => onCopy(color.hex)}
        className="text-xs font-mono text-gray-700 hover:text-indigo-600 transition-colors"
      >
        {color.hex}
      </button>
    </div>
  );
}
