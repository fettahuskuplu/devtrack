export type ResourceCategory = 'Kurs' | 'Kitap & Makale' | 'Proje' | 'Dokümantasyon';

export type ResourceStatus = 'Planlandı' | 'Devam Ediyor' | 'Tamamlandı';

export type ResourcePriority = 'Düşük' | 'Orta' | 'Yüksek';

// Uygulamadaki her bir gelişim kaynağının veri modeli
export interface IResource {
  id: string;
  title: string;
  category: ResourceCategory;
  topic: string;
  status: ResourceStatus;
  priority: ResourcePriority;
  progress: number;
  link?: string;
  notes?: string;
  createdAt: string;
}

// Form üzerinden yeni kaynak eklerken veya güncellerken kullanılacak tip
export type ResourceFormData = Omit<IResource, 'id' | 'createdAt'>;
