"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import HeaderV2 from "@/components/improved/HeaderV2";
import InputAreaV2 from "@/components/improved/InputAreaV2";
import ResultAreaV2 from "@/components/improved/ResultAreaV2";
import HistoryAreaV2 from "@/components/improved/HistoryAreaV2";
import { Color, Palette } from "@/types";
import { savePalette, loadPalettes, deletePalette } from "@/lib/storage";

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);
  const [currentParams, setCurrentParams] = useState<{
    keyword?: string;
    baseColor?: string;
  }>({});
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPalettes(loadPalettes());
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
        toast.error(err.error || "生成に失敗しました");
        return;
      }
      const data = await res.json();
      setColors(data.colors);
    } catch {
      toast.error("ネットワークエラーが発生しました");
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
    toast.success("パレットを保存しました");
  }

  function handleDelete(id: string) {
    deletePalette(id);
    setPalettes(loadPalettes());
  }

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex);
    toast(`${hex} をコピーしました`);
  }

  function handleLoad(palette: Palette) {
    setColors(palette.colors);
    setCurrentParams({
      keyword: palette.keyword,
      baseColor: palette.baseColor,
    });
    toast("パレットを読み込みました");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderV2 />
      <main className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
        <InputAreaV2 onGenerate={handleGenerate} isLoading={isLoading} />
        <ResultAreaV2
          colors={colors}
          onCopy={handleCopy}
          onSave={handleSave}
          onToast={(msg) => toast(msg)}
        />
        <HistoryAreaV2
          palettes={palettes}
          onDelete={handleDelete}
          onCopy={handleCopy}
          onLoad={handleLoad}
        />
      </main>
    </div>
  );
}
