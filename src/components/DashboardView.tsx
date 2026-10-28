import type { IResource, ResourceCategory, ResourceStatus } from '../interfaces/resource';

interface DashboardViewProps {
  resources: IResource[];
  selectedCategory: ResourceCategory | 'Tümü';
  onCategorySelect: (category: ResourceCategory | 'Tümü') => void;
  onStatusToggle: (id: string, nextStatus: ResourceStatus) => void;
  onEdit: (resource: IResource) => void;
  onDelete: (id: string) => void;
}

export function DashboardView({
  resources,
  selectedCategory,
  onCategorySelect,
  onStatusToggle,
  onEdit,
  onDelete,
}: DashboardViewProps) {
  const totalCount = resources.length;
  const inProgressCount = resources.filter((r) => r.status === 'Devam Ediyor').length;
  const completedCount = resources.filter((r) => r.status === 'Tamamlandı').length;
  const avgProgress =
    totalCount > 0
      ? Math.round(resources.reduce((acc, item) => acc + item.progress, 0) / totalCount)
      : 0;

  const categories: (ResourceCategory | 'Tümü')[] = [
    'Tümü',
    'Kurs',
    'Proje',
    'Kitap & Makale',
    'Dokümantasyon',
  ];

  // Durumu sıradaki adıma geçirir
  const getNextStatus = (current: ResourceStatus): ResourceStatus => {
    if (current === 'Planlandı') return 'Devam Ediyor';
    if (current === 'Devam Ediyor') return 'Tamamlandı';
    return 'Planlandı';
  };

  return (
    <div className="space-y-6">
      {/* Üst İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {String(totalCount).padStart(2, '0')}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-1">Toplam Kaynak</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {String(inProgressCount).padStart(2, '0')}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-1">Devam Eden Çalışma</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {String(completedCount).padStart(2, '0')}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-1">Tamamlanan Hedef</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-slate-900">%{avgProgress}</p>
          <p className="text-xs font-medium text-slate-500 mt-1">Ortalama İlerleme</p>
        </div>
      </div>

      {/* Alt Liste Bölümü */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Gelişim Kaynakları{' '}
              <span className="text-sm font-normal text-slate-400">
                ({resources.length} Kayıt)
              </span>
            </h2>
          </div>

          {/* Kategori Sekmeleri (Hap Butonlar) */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Liste Başlıkları */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 pb-3 border-b border-slate-100 text-xs font-medium text-slate-400">
          <div className="col-span-5">Kaynak & Not</div>
          <div className="col-span-2">Kategori / Konu</div>
          <div className="col-span-3">İlerleme Durumu</div>
          <div className="col-span-2 text-right">İşlemler</div>
        </div>

        {/* Kaynak Satırları */}
        <div className="divide-y divide-slate-100 mt-2">
          {resources.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-400">
              Bu filtreye uygun kaynak bulunamadı.
            </div>
          ) : (
            resources.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 hover:bg-slate-50/70 rounded-xl transition-colors"
              >
                {/* Başlık ve Kısa Not */}
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-emerald-600"
                        title="Kaynağa Git"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {item.notes}
                    </p>
                  )}
                </div>

                {/* Kategori ve Konu */}
                <div className="md:col-span-2">
                  <p className="text-xs font-semibold text-slate-800">{item.category}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.topic}</p>
                </div>

                {/* İlerleme Çubuğu */}
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-full max-w-[130px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          item.progress === 100
                            ? 'bg-emerald-600'
                            : item.progress >= 50
                            ? 'bg-emerald-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        item.progress >= 50 ? 'text-emerald-700' : 'text-amber-600'
                      }`}
                    >
                      %{item.progress}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{item.status}</p>
                </div>

                {/* Aksiyon Butonları */}
                <div className="md:col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onStatusToggle(item.id, getNextStatus(item.status))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      item.status === 'Tamamlandı'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {item.status === 'Tamamlandı' ? 'Tamamlandı' : 'İlerlet'}
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
