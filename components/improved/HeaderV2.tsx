export default function HeaderV2() {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="6"  cy="6"  r="4" fill="white" fillOpacity="1"   />
            <circle cx="12" cy="6"  r="4" fill="white" fillOpacity="0.65"/>
            <circle cx="9"  cy="13" r="4" fill="white" fillOpacity="0.35"/>
          </svg>
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900 leading-tight">
            カラーパレット生成
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            実務で使えるトーナルパレットを自動生成
          </p>
        </div>
      </div>
    </header>
  );
}
