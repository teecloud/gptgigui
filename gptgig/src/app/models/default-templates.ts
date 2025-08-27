import { CatalogTemplate } from './catalog.models';

export const DEFAULT_TEMPLATES: Record<string, CatalogTemplate> = {
  basic: {
    categories: [
      { id: 'cat-basic', name: 'General', icon: 'briefcase' }
    ],
    services: [
      { id: 'svc-basic', title: 'Consultation', categoryId: 'cat-basic', price: 0 }
    ],
    providers: [
      { id: 'pro-basic', name: 'Provider', rating: 4.8 }
    ]
  },
  salon: {
    categories: [
      { id: 'cat-hair', name: 'Hair', icon: 'cut' }
    ],
    services: [
      { id: 'svc-cut', title: 'Haircut', categoryId: 'cat-hair', price: 30 }
    ],
    providers: [
      { id: 'pro-stylist', name: 'Stylist', rating: 4.9 }
    ]
  },
  auto: {
    categories: [
      { id: 'cat-auto', name: 'Auto', icon: 'car' }
    ],
    services: [
      { id: 'svc-oil', title: 'Oil Change', categoryId: 'cat-auto', price: 40 }
    ],
    providers: [
      { id: 'pro-mechanic', name: 'Mechanic', rating: 4.7 }
    ]
  },
  tutoring: {
    categories: [
      { id: 'cat-math', name: 'Math', icon: 'calculator' }
    ],
    services: [
      { id: 'svc-algebra', title: 'Algebra Tutoring', categoryId: 'cat-math', price: 50 }
    ],
    providers: [
      { id: 'pro-tutor', name: 'Tutor', rating: 5 }
    ]
  }
};
