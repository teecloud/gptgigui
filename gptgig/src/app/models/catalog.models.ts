export interface ServiceCategory {
  id: string;
  name: string;
  icon?: string;
  providerId: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  imageUrl?: string;
  price?: number;
  durationMin?: number;
  categoryId?: string;
  providerId: string;
  tags?: string[];
  rating?: number;
  description?: string;
  availableSlots?: string[];
  selectedSlot?: string;
  wishlist?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  avatarUrl?: string;
  rating?: number;
  tags?: string[];
  servicesOffered?: string[]; // service IDs
}

export interface CatalogTemplate {
  categories: ServiceCategory[];
  services: ServiceItem[];
  providers: Provider[];
}
