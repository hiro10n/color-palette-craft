"use client";

import { useState } from "react";
import { Palette } from "@/types";

type Props = {
  palettes: Palette[];
  onDelete: (id: string) => void;
  onCopy: (hex: string) => void;
  onLoad: (palette: Palette) => void;
};

export default function HistoryAreaV2({ palettes, onDelete, onCopy, onLoad }: Props) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (palettes.length === 0) return null;

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-5">
          保存済みパレット — {palettes.length} 件
        </p>

        <div className="flex flex-col gap-3">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors group"
            >
              {/* Meta row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {palette.keyword && (
                    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {palette.keyword}
                    </span>
                  )}
                  {palette.baseColor && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <span
                        className="w-3 h-3 rounded-full inline-block border border-black/10"
                        style={{ backgroundColor: palette.baseColor }}
                      />
                      {palette.baseColor}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(palette.createdAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>

                {/* Actions — visible on hover */}
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onLoad(palette)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    読み込む
                  </button>
                  <button
                    onClick={() => setConfirmId(palette.id)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                    aria-label="削除"
                  >
                    削除
                  </button>
                </div>
              </div>

              {/* Color strip — taller than before (h-14 vs h-10) */}
              <div className="flex gap-1.5">
                {palette.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => onCopy(color.hex)}
                    className="flex-1 h-14 rounded-lg border border-black/5 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name ?? ""} ${color.hex}`}
                    aria-label={`${color.hex} をコピー`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmId && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setConfirmId(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">
              パレットを削除しますか？
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              この操作は元に戻せません。
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  onDelete(confirmId);
                  setConfirmId(null);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
