"use client";

import { useState } from "react";
import { Palette } from "@/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
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
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-primary"
                    onClick={() => onLoad(palette)}
                  >
                    読み込む
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => setConfirmId(palette.id)}
                    aria-label="削除"
                  >
                    削除
                  </Button>
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

      {/* Delete confirmation — shadcn AlertDialog */}
      <AlertDialog open={!!confirmId} onOpenChange={(open) => !open && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>パレットを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (confirmId) onDelete(confirmId);
                setConfirmId(null);
              }}
            >
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
