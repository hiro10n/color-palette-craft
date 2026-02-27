"use client";

import { Palette } from "@/types";

type Props = {
  palettes: Palette[];
  onDelete: (id: string) => void;
  onCopy: (hex: string) => void;
};

export default function HistoryArea({ palettes, onDelete, onCopy }: Props) {
  if (palettes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        保存済みパレット ({palettes.length})
      </h2>
      <div className="flex flex-col gap-4">
        {palettes.map((palette) => (
          <div
            key={palette.id}
            className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-500">
                {palette.keyword && (
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                    {palette.keyword}
                  </span>
                )}
                {palette.baseColor && (
                  <span className="inline-flex items-center gap-1 text-xs">
                    <span
                      className="w-3 h-3 rounded-full inline-block border border-gray-200"
                      style={{ backgroundColor: palette.baseColor }}
                    />
                    {palette.baseColor}
                  </span>
                )}
                <span className="ml-2 text-gray-400 text-xs">
                  {new Date(palette.createdAt).toLocaleDateString("ja-JP")}
                </span>
              </div>
              <button
                onClick={() => onDelete(palette.id)}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                title="削除"
              >
                ✕
              </button>
            </div>
            <div className="flex gap-2">
              {palette.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => onCopy(color.hex)}
                  className="flex-1 h-10 rounded-lg border border-gray-200 hover:scale-105 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.hex}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
