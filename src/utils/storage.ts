import type { IResource } from '../interfaces/resource';

const STORAGE_KEY = 'devtrack_resources_v1';

// İlk açılışta liste boş görünmemesi için varsayılan başlangıç verileri
export const initialResources: IResource[] = [
  {
    id: 'res-1',
    title: 'Modern React ve TypeScript ile Bileşen Mimarisi',
    category: 'Kurs',
    topic: 'React & TS',
    status: 'Devam Ediyor',
    priority: 'Yüksek',
    progress: 75,
    link: 'https://react.dev',
    notes: 'Props, State yönetimi ve useEffect kullanımı tamamlandı, custom hook yapısına geçildi.',
    createdAt: '2026-10-20',
  },
  {
    id: 'res-2',
    title: 'JavaScript: ES6+ Modern Özellikler ve Asenkron Yapılar',
    category: 'Dokümantasyon',
    topic: 'JavaScript',
    status: 'Tamamlandı',
    priority: 'Yüksek',
    progress: 100,
    link: 'https://developer.mozilla.org/tr/docs/Web/JavaScript',
    notes: 'Promise, async/await, dizi metotları (map, filter, reduce) ve LocalStorage incelendi.',
    createdAt: '2026-10-18',
  },
  {
    id: 'res-3',
    title: 'Tailwind CSS ile Responsive Arayüz Tasarımı',
    category: 'Kurs',
    topic: 'Tailwind CSS',
    status: 'Tamamlandı',
    priority: 'Orta',
    progress: 100,
    link: 'https://tailwindcss.com/docs',
    notes: 'Flexbox, Grid sistemleri ve renk paleti standartları uygulandı.',
    createdAt: '2026-10-22',
  },
  {
    id: 'res-4',
    title: 'DevTrack - Gelişim ve Kaynak Takip Uygulaması',
    category: 'Proje',
    topic: 'Frontend CRUD',
    status: 'Devam Ediyor',
    priority: 'Yüksek',
    progress: 60,
    link: 'https://github.com/fettahuskuplu/devtrack',
    notes: 'Ekleme, listeleme, güncelleme ve silme (CRUD) işlemlerinin LocalStorage ile entegrasyonu.',
    createdAt: '2026-10-25',
  },
  {
    id: 'res-5',
    title: 'Clean Code: Temiz Kod Yazma Sanatı (Robert C. Martin)',
    category: 'Kitap & Makale',
    topic: 'Yazılım Mimarisi',
    status: 'Planlandı',
    priority: 'Orta',
    progress: 15,
    notes: 'İsimlendirme standartları ve fonksiyonların tek sorumluluk prensibi okunacak.',
    createdAt: '2026-10-26',
  },
];

// LocalStorage'dan kaynak listesini getirir, yoksa başlangıç verilerini yükler
export function getStoredResources(): IResource[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialResources));
      return initialResources;
    }
    return JSON.parse(rawData) as IResource[];
  } catch (error) {
    console.error('LocalStorage okuma hatası:', error);
    return initialResources;
  }
}

// Güncel kaynak listesini LocalStorage'a kaydeder
export function saveResourcesToStorage(resources: IResource[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch (error) {
    console.error('LocalStorage kaydetme hatası:', error);
  }
}

// Verileri varsayılan başlangıç haline sıfırlar
export function resetStorageToDefault(): IResource[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialResources));
  return initialResources;
}
