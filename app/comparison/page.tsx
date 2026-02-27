export default function ComparisonPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-950 overflow-hidden">
      {/* Top bar */}
      <div className="flex-none border-b border-gray-800 px-5 py-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-white tracking-tight">
          カラーパレット生成 — Before / After 比較
        </h1>
        <p className="text-xs text-gray-500">
          同じキーワードで両方を試して違いを確認してください
        </p>
      </div>

      {/* Column labels */}
      <div className="flex-none grid grid-cols-2 divide-x divide-gray-800 border-b border-gray-800">
        <div className="px-5 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
            Before
          </span>
          <span className="text-xs text-gray-500 ml-1">現行版 /</span>
        </div>
        <div className="px-5 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            After
          </span>
          <span className="text-xs text-gray-500 ml-1">改善版 /improved</span>
        </div>
      </div>

      {/* Iframes */}
      <div className="flex-1 grid grid-cols-2 divide-x divide-gray-800 min-h-0">
        <iframe
          src="/"
          className="w-full h-full border-none bg-white"
          title="Before — 現行版"
        />
        <iframe
          src="/improved"
          className="w-full h-full border-none bg-white"
          title="After — 改善版"
        />
      </div>
    </div>
  );
}
