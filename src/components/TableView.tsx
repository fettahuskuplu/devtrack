import type {
  IResource,
  ResourcePriority,
  ResourceStatus,
} from '../interfaces/resource';

interface TableViewProps {
  resources: IResource[];
  statusFilter: ResourceStatus | 'Tümü';
  onStatusFilterChange: (status: ResourceStatus | 'Tümü') => void;
  priorityFilter: ResourcePriority | 'Tümü';
  onPriorityFilterChange: (priority: ResourcePriority | 'Tümü') => void;
  onStatusToggle: (id: string, nextStatus: ResourceStatus) => void;
  onEdit: (resource: IResource) => void;
  onDelete: (id: string) => void;
}

export function TableView({
  resources,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onStatusToggle,
  onEdit,
  onDelete,
}: TableViewProps) {
  // Durum rozeti stili
  const getStatusBadge = (status: ResourceStatus) => {
    if (status === 'Tamamlandı') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          Tamamlandı
        </span>
      );
    }
    if (status === 'Devam Ediyor') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
          Devam Ediyor
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
        Planlandı
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-5">
      {/* Üst Başlık ve Filtreler */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tüm Kaynaklar</h2>
            <p className="text-xs text-slate-400">
              LocalStorage üzerinde kayıtlı toplam {resources.length} içerik
            </p>
          </div>
        </div>

        {/* Filtre Seçiciler */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as ResourceStatus | 'Tümü')
            }
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
          >
            <option value="Tümü">Tüm Durumlar</option>
            <option value="Planlandı">Planlandı</option>
            <option value="Devam Ediyor">Devam Ediyor</option>
            <option value="Tamamlandı">Tamamlandı</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              onPriorityFilterChange(e.target.value as ResourcePriority | 'Tümü')
            }
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
          >
            <option value="Tümü">Tüm Öncelikler</option>
            <option value="Yüksek">Yüksek Öncelik</option>
            <option value="Orta">Orta Öncelik</option>
            <option value="Düşük">Düşük Öncelik</option>
          </select>
        </div>
      </div>

      {/* Tablo Alanı */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-y border-slate-200/70 text-xs font-medium text-slate-500">
              <th className="py-3.5 px-4 rounded-l-lg">Kaynak Başlığı</th>
              <th className="py-3.5 px-4">Konu Etiketi</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Eklenme Tarihi</th>
              <th className="py-3.5 px-4">Öncelik</th>
              <th className="py-3.5 px-4">İlerleme</th>
              <th className="py-3.5 px-4">Durum</th>
              <th className="py-3.5 px-4 text-right rounded-r-lg">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {resources.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-400 text-xs">
                  Kriterlere uygun kayıt bulunamadı.
                </td>
              </tr>
            ) : (
              resources.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {item.topic}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {item.createdAt}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                    {item.priority}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-800">
                    %{item.progress}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          onStatusToggle(
                            item.id,
                            item.status === 'Tamamlandı'
                              ? 'Devam Ediyor'
                              : 'Tamamlandı'
                          )
                        }
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        {item.status === 'Tamamlandı' ? 'Geri Al' : 'Tamamla'}
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
                        title="Düzenle"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50"
                        title="Sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
