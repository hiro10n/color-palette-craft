"use client";

import { useState } from "react";

type Props = {
  onGenerate: (params: { keyword?: string; baseColor?: string }) => void;
  isLoading: boolean;
};

export default function InputArea({ onGenerate, isLoading }: Props) {
  const [keyword, setKeyword] = useState("");
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [mode, setMode] = useState<"keyword" | "color">("keyword");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "keyword" && keyword.trim()) {
      onGenerate({ keyword: keyword.trim() });
    } else if (mode === "color") {
      onGenerate({ baseColor });
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("keyword")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "keyword"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          キーワードで生成
        </button>
        <button
          type="button"
          onClick={() => setMode("color")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "color"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          ベースカラーで生成
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        {mode === "keyword" ? (
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例: 夕焼け、森林、海、北欧風..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <div className="flex items-center gap-3 flex-1">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <span className="text-gray-700 font-mono">{baseColor}</span>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || (mode === "keyword" && !keyword.trim())}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[100px]"
        >
          {isLoading ? "生成中..." : "生成する"}
        </button>
      </form>
    </div>
  );
}
