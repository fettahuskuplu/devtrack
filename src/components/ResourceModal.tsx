import { useEffect, useState } from 'react';
import type {
  IResource,
  ResourceCategory,
  ResourceFormData,
  ResourcePriority,
  ResourceStatus,
} from '../interfaces/resource';

interface ResourceModalProps {
  isOpen: boolean;
  editingResource: IResource | null;
  onClose: () => void;
  onSave: (data: ResourceFormData) => void;
}

const defaultForm: ResourceFormData = {
  title: '',
  category: 'Kurs',
  topic: '',
  status: 'Planlandı',
  priority: 'Orta',
  progress: 0,
  link: '',
  notes: '',
};

export function ResourceModal({
  isOpen,
  editingResource,
  onClose,
  onSave,
}: ResourceModalProps) {
  const [formData, setFormData] = useState<ResourceFormData>(defaultForm);

  useEffect(() => {
    if (editingResource) {
      setFormData({
        title: editingResource.title,
        category: editingResource.category,
        topic: editingResource.topic,
        status: editingResource.status,
        priority: editingResource.priority,
        progress: editingResource.progress,
        link: editingResource.link || '',
        notes: editingResource.notes || '',
      });
    } else {
      setFormData(defaultForm);
    }
  }, [editingResource, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.topic.trim()) return;
    onSave(formData);
    onClose();
  };

  const handleStatusChange = (status: ResourceStatus) => {
    let progress = formData.progress;
    if (status === 'Tamamlandı') progress = 100;
    else if (status === 'Planlandı' && progress === 100) progress = 0;
    setFormData({ ...formData, status, progress });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            {editingResource ? 'Kaynağı Düzenle' : 'Yeni Gelişim Kaynağı Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kaynak Başlığı *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Örn: Modern React ve TypeScript Eğitimi"
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ResourceCategory,
                  })
                }
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Kurs">Kurs</option>
                <option value="Kitap & Makale">Kitap & Makale</option>
                <option value="Proje">Proje</option>
                <option value="Dokümantasyon">Dokümantasyon</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Teknoloji / Konu Etiketi *
              </label>
              <input
                type="text"
                required
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                placeholder="Örn: React, JavaScript, CSS"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Durum
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as ResourceStatus)
                }
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Planlandı">Planlandı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Öncelik Seviyesi
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as ResourcePriority,
                  })
                }
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
              >
                <option value="Düşük">Düşük</option>
                <option value="Orta">Orta</option>
                <option value="Yüksek">Yüksek</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                İlerleme Yüzdesi
              </label>
              <span className="text-xs font-bold text-emerald-700">
                %{formData.progress}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={formData.progress}
              onChange={(e) => {
                const val = Number(e.target.value);
                let nextStatus: ResourceStatus = formData.status;
                if (val === 100) nextStatus = 'Tamamlandı';
                else if (val > 0 && formData.status === 'Planlandı')
                  nextStatus = 'Devam Ediyor';
                setFormData({ ...formData, progress: val, status: nextStatus });
              }}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kaynak Bağlantısı (Opsiyonel)
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              placeholder="https://..."
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Kısa Notlar
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Bu kaynakla ilgili önemli çalışma notları..."
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
            >
              {editingResource ? 'Değişiklikleri Kaydet' : 'Kaynağı Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
