import { useEffect, useMemo, useState } from 'react';
import { BoardView } from '../components/BoardView';
import { DashboardView } from '../components/DashboardView';
import { ResourceModal } from '../components/ResourceModal';
import { Sidebar, type ActiveTab } from '../components/Sidebar';
import { TableView } from '../components/TableView';
import type {
  IResource,
  ResourceCategory,
  ResourceFormData,
  ResourcePriority,
  ResourceStatus,
} from '../interfaces/resource';
import {
  getStoredResources,
  resetStorageToDefault,
  saveResourcesToStorage,
} from '../utils/storage';

export function HomePage() {
  const [resources, setResources] = useState<IResource[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | 'Tümü'
  >('Tümü');
  const [statusFilter, setStatusFilter] = useState<ResourceStatus | 'Tümü'>(
    'Tümü'
  );
  const [priorityFilter, setPriorityFilter] = useState<
    ResourcePriority | 'Tümü'
  >('Tümü');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<IResource | null>(
    null
  );

  // İlk açılışta LocalStorage verilerini yükle
  useEffect(() => {
    const stored = getStoredResources();
    setResources(stored);
  }, []);

  // Ekleme (Create) ve Güncelleme (Update) işlemi
  const handleSaveResource = (formData: ResourceFormData) => {
    if (editingResource) {
      const updated = resources.map((item) =>
        item.id === editingResource.id ? { ...item, ...formData } : item
      );
      setResources(updated);
      saveResourcesToStorage(updated);
      setEditingResource(null);
    } else {
      const newResource: IResource = {
        ...formData,
        id: `res-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      const updated = [newResource, ...resources];
      setResources(updated);
      saveResourcesToStorage(updated);
    }
  };

  // Hızlı durum değiştirme (Update)
  const handleStatusToggle = (id: string, nextStatus: ResourceStatus) => {
    const updated = resources.map((item) => {
      if (item.id !== id) return item;
      let nextProgress = item.progress;
      if (nextStatus === 'Tamamlandı') nextProgress = 100;
      else if (nextStatus === 'Devam Ediyor' && item.progress === 0)
        nextProgress = 50;
      else if (nextStatus === 'Planlandı') nextProgress = 0;

      return { ...item, status: nextStatus, progress: nextProgress };
    });

    setResources(updated);
    saveResourcesToStorage(updated);
  };

  // Silme (Delete) işlemi
  const handleDeleteResource = (id: string) => {
    const target = resources.find((r) => r.id === id);
    if (!target) return;

    if (window.confirm(`"${target.title}" kaynağını silmek istiyor musunuz?`)) {
      const updated = resources.filter((item) => item.id !== id);
      setResources(updated);
      saveResourcesToStorage(updated);
    }
  };

  // Başlangıç verilerine sıfırlama
  const handleResetData = () => {
    if (
      window.confirm(
        'Tüm kayıtlar varsayılan başlangıç verilerine sıfırlansın mı?'
      )
    ) {
      const defaults = resetStorageToDefault();
      setResources(defaults);
    }
  };

  // Arama, kategori, durum ve önceliğe göre filtrelenmiş liste
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.notes &&
          item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'Tümü' || item.category === selectedCategory;

      const matchesStatus =
        statusFilter === 'Tümü' || item.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'Tümü' || item.priority === priorityFilter;

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesPriority
      );
    });
  }, [
    resources,
    searchQuery,
    selectedCategory,
    statusFilter,
    priorityFilter,
  ]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex">
      {/* Sol Yan Menü */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        totalCount={resources.length}
        onResetData={handleResetData}
      />

      {/* Sağ Ana Çalışma Alanı */}
      <div className="flex-1 flex flex-col min-w-0 p-4 md:p-6">
        <div className="flex-1 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-2xs">
          {/* Üst Başlık, Arama ve Yeni Ekle Butonu */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Hoş Geldin!
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Yazılım gelişim hedeflerini, kurslarını ve projelerini tek
                panelden yönet.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Arama Kutusu */}
              <div className="relative">
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kaynak veya teknoloji ara..."
                  className="pl-9 pr-4 py-2 w-60 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              {/* Yeni Kaynak Ekle Butonu */}
              <button
                onClick={() => {
                  setEditingResource(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#2E7D5B] hover:bg-[#25664A] text-white transition-colors shadow-xs cursor-pointer"
              >
                <span>+</span>
                <span>Yeni Kaynak Ekle</span>
              </button>
            </div>
          </header>

          {/* Aktif Görünüm İçeriği */}
          {activeTab === 'dashboard' && (
            <DashboardView
              resources={filteredResources}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              onStatusToggle={handleStatusToggle}
              onEdit={(res) => {
                setEditingResource(res);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteResource}
            />
          )}

          {activeTab === 'board' && (
            <BoardView
              resources={filteredResources}
              onStatusToggle={handleStatusToggle}
              onEdit={(res) => {
                setEditingResource(res);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteResource}
            />
          )}

          {activeTab === 'table' && (
            <TableView
              resources={filteredResources}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              onStatusToggle={handleStatusToggle}
              onEdit={(res) => {
                setEditingResource(res);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteResource}
            />
          )}
        </div>
      </div>

      {/* Ekleme / Düzenleme Modalı */}
      <ResourceModal
        isOpen={isModalOpen}
        editingResource={editingResource}
        onClose={() => {
          setIsModalOpen(false);
          setEditingResource(null);
        }}
        onSave={handleSaveResource}
      />
    </div>
  );
}
