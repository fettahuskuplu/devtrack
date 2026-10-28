import type { IResource, ResourcePriority, ResourceStatus } from '../interfaces/resource';

interface BoardViewProps {
  resources: IResource[];
  onStatusToggle: (id: string, nextStatus: ResourceStatus) => void;
  onEdit: (resource: IResource) => void;
  onDelete: (id: string) => void;
}

export function BoardView({
  resources,
  onStatusToggle,
  onEdit,
  onDelete,
}: BoardViewProps) {
  const columns: { title: string; status: ResourceStatus }[] = [
    { title: 'PLANLANDI', status: 'Planlandı' },
    { title: 'DEVAM EDİYOR', status: 'Devam Ediyor' },
    { title: 'TAMAMLANDI', status: 'Tamamlandı' },
  ];

  // Öncelik seviyesine göre rozet stili
  const getPriorityBadge = (priority: ResourcePriority) => {
    if (priority === 'Yüksek') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-600">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Yüksek
        </span>
      );
    }
    if (priority === 'Orta') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-600">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          Orta
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Düşük
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Kaynak Panosu{' '}
            <span className="text-sm font-normal text-slate-400 ml-1">
              {resources.length} kayıt
            </span>
          </h2>
        </div>
      </div>

      {/* 3 Sütunlu Kanban Pano */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {columns.map((col) => {
          const colItems = resources.filter((r) => r.status === col.status);

          return (
            <div
              key={col.status}
              className="bg-[#F4F5F7] rounded-2xl p-3.5 border border-slate-200/60"
            >
              {/* Sütun Başlığı */}
              <div className="flex items-center justify-between px-1 mb-3">
                <span className="text-xs font-bold tracking-wider text-slate-600">
                  {col.title}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                  {colItems.length}
                </span>
              </div>

              {/* Kartlar */}
              <div className="space-y-3">
                {colItems.length === 0 ? (
                  <div className="bg-white/60 border border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-400">
                    Bu aşamada kaynak yok
                  </div>
                ) : (
                  colItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all"
                    >
                      {/* Üst Satır: Konu Kodu ve İşlem Butonları */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-slate-400">
                          #{item.topic}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded"
                            title="Düzenle"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                            title="Sil"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Başlık */}
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1">
                        {item.title}
                      </h3>

                      {/* Kategori Alt Bilgisi */}
                      <p className="text-xs text-slate-500 mb-3">{item.category}</p>

                      {/* Noktalı Öncelik Rozeti */}
                      <div className="mb-4">{getPriorityBadge(item.priority)}</div>

                      {/* Alt Bar: İlerleme ve Hızlı Durum Değiştirme */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center justify-center min-w-[42px] px-2 py-0.5 rounded-md text-[11px] font-bold tracking-tight transition-colors ${
                              item.progress === 100
                                ? 'bg-emerald-600 text-white'
                                : item.progress >= 30
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            %{item.progress}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            İlerleme
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {col.status !== 'Planlandı' && (
                            <button
                              onClick={() =>
                                onStatusToggle(
                                  item.id,
                                  col.status === 'Tamamlandı' ? 'Devam Ediyor' : 'Planlandı'
                                )
                              }
                              className="px-2 py-1 text-[11px] font-medium rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
                              title="Önceki Aşamaya Al"
                            >
                              ←
                            </button>
                          )}
                          {col.status !== 'Tamamlandı' && (
                            <button
                              onClick={() =>
                                onStatusToggle(
                                  item.id,
                                  col.status === 'Planlandı' ? 'Devam Ediyor' : 'Tamamlandı'
                                )
                              }
                              className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              title="Sonraki Aşamaya Taşı"
                            >
                              İlerlet →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
