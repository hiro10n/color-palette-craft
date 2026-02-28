"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onGenerate: (params: { keyword?: string; baseColor?: string }) => void;
  isLoading: boolean;
};

export default function InputAreaV2({ onGenerate, isLoading }: Props) {
  const [keyword, setKeyword] = useState("");
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");
  const [mode, setMode] = useState<"keyword" | "color">("keyword");

  function handleHexChange(value: string) {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setBaseColor(value);
    }
  }

  function handleColorPickerChange(value: string) {
    setBaseColor(value);
    setHexInput(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "keyword" && keyword.trim()) {
      onGenerate({ keyword: keyword.trim() });
    } else if (mode === "color") {
      const hex = /^#[0-9A-Fa-f]{6}$/.test(hexInput) ? hexInput : baseColor;
      onGenerate({ baseColor: hex });
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Segmented control */}
      <div
        role="tablist"
        aria-label="入力モード"
        className="inline-flex bg-gray-100 rounded-lg p-1 mb-5"
      >
        <button
          role="tab"
          aria-selected={mode === "keyword"}
          type="button"
          onClick={() => setMode("keyword")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === "keyword"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          キーワード
        </button>
        <button
          role="tab"
          aria-selected={mode === "color"}
          type="button"
          onClick={() => setMode("color")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            mode === "color"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          ベースカラー
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        {mode === "keyword" ? (
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例: 夕焼け、森林、海、北欧風..."
            className="flex-1 rounded-xl"
          />
        ) : (
          <div className="flex items-center gap-3 flex-1">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => handleColorPickerChange(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer border border-gray-200 bg-transparent p-1 shrink-0"
              aria-label="カラーピッカー"
            />
            <Input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              maxLength={7}
              placeholder="#6366f1"
              className="w-32 font-mono rounded-xl"
              aria-label="16進数カラーコードを直接入力"
            />
          </div>
        )}
        <Button
          type="submit"
          disabled={isLoading || (mode === "keyword" && !keyword.trim())}
          className="rounded-xl px-6"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              生成中
            </span>
          ) : "生成"}
        </Button>
      </form>
    </div>
  );
}
