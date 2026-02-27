"use client";

import { useState, useEffect, useCallback } from "react";
import HeaderV2 from "@/components/improved/HeaderV2";
import InputAreaV2 from "@/components/improved/InputAreaV2";
import ResultAreaV2 from "@/components/improved/ResultAreaV2";
import HistoryAreaV2 from "@/components/improved/HistoryAreaV2";
import Toast from "@/components/Toast";
import { Color, Palette } from "@/types";
import { savePalette, loadPalettes, deletePalette } from "@/lib/storage";

export default function ImprovedHome() {
  const [colors, setColors] = useState<Color[]>([]);
  const [currentParams, setCurrentParams] = useState<{
    keyword?: string;
    baseColor?: string;
  }>({});
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  useEffect(() => {
    setPalettes(loadPalettes());
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 2500);
  }, []);

  async function handleGenerate(params: {
    keyword?: string;
    baseColor?: string;
  }) {
    setIsLoading(true);
    setCurrentParams(params);
    try {
      const res = await fetch("/api/generate-v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.error || "生成に失敗しました");
        return;
      }
      const data = await res.json();
      setColors(data.colors);
    } catch {
      showToast("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSave() {
    if (colors.length === 0) return;
    const palette: Palette = {
      id: crypto.randomUUID(),
      colors,
      keyword: currentParams.keyword,
      baseColor: currentParams.baseColor,
      createdAt: Date.now(),
    };
    savePalette(palette);
    setPalettes(loadPalettes());
    showToast("パレットを保存しました");
  }

  function handleDelete(id: string) {
    deletePalette(id);
    setPalettes(loadPalettes());
  }

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex);
    showToast(`${hex} をコピーしました`);
  }

  function handleLoad(palette: Palette) {
    setColors(palette.colors);
    setCurrentParams({
      keyword: palette.keyword,
      baseColor: palette.baseColor,
    });
    showToast("パレットを読み込みました");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderV2 />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
        <InputAreaV2 onGenerate={handleGenerate} isLoading={isLoading} />
        <ResultAreaV2
          colors={colors}
          onCopy={handleCopy}
          onSave={handleSave}
          onToast={showToast}
        />
        <HistoryAreaV2
          palettes={palettes}
          onDelete={handleDelete}
          onCopy={handleCopy}
          onLoad={handleLoad}
        />
      </main>
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
