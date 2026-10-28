import type { ResourceCategory } from '../interfaces/resource';

export type ActiveTab = 'dashboard' | 'board' | 'table';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  selectedCategory: ResourceCategory | 'Tümü';
  onCategorySelect: (category: ResourceCategory | 'Tümü') => void;
  totalCount: number;
  onResetData: () => void;
}

export function Sidebar({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategorySelect,
  totalCount,
  onResetData,
}: SidebarProps) {
  const categories: (ResourceCategory | 'Tümü')[] = [
    'Tümü',
    'Kurs',
    'Proje',
    'Kitap & Makale',
    'Dokümantasyon',
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#F8F9FA] border-r border-slate-200/80 flex flex-col justify-between min-h-screen p-4 select-none">
      <div>
        {/* Logo Alanı */}
        <div className="flex items-center justify-between px-2 py-2 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              D
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              DevTrack
            </span>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-600">
            v1.0
          </span>
        </div>

        {/* Kullanıcı Profil Kartı */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3 mb-6 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-semibold text-sm shrink-0">
            FÜ
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">
              Fettah Üsküplü
            </p>
            <p className="text-xs text-slate-500 truncate">
              Frontend Developer
            </p>
          </div>
        </div>

        {/* Ana Menü */}
        <div className="mb-6">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Ana Menü
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onTabChange('board')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'board'
                  ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <span>Kaynak Panosu</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => onTabChange('table')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'table'
                  ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Tüm Kaynaklar</span>
            </button>
          </nav>
        </div>

        {/* Kategori Filtreleri */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Kategoriler
          </p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/40'
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alt Bilgi ve Sıfırlama */}
      <div className="pt-4 border-t border-slate-200/80 space-y-2">
        <button
          onClick={onResetData}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
          title="Başlangıç verilerini geri yükler"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Varsayılan Verileri Yükle</span>
        </button>
      </div>
    </aside>
  );
}
