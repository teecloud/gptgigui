import { CatalogTemplate } from './catalog.models';

export const DEFAULT_TEMPLATES: Record<string, CatalogTemplate> = {
  basic: {
    categories: [
      { id: 'cat-basic', name: 'General', icon: 'briefcase', providerId: 'pro-basic' }
    ],
    services: [
      { id: 'svc-basic', title: 'Consultation', categoryId: 'cat-basic', providerId: 'pro-basic', price: 0 }
    ],
    providers: [
      { id: 'pro-basic', name: 'Provider', rating: 4.8 }
    ]
  },
  salon: {
    categories: [
      { id: 'cat-hair', name: 'Hair', icon: 'cut', providerId: 'pro-stylist' }
    ],
    services: [
      { id: 'svc-cut', title: 'Haircut', categoryId: 'cat-hair', providerId: 'pro-stylist', price: 30 }
    ],
    providers: [
      { id: 'pro-stylist', name: 'Stylist', rating: 4.9 }
    ]
  },
  auto: {
    categories: [
      { id: 'cat-auto', name: 'Auto', icon: 'car', providerId: 'pro-mechanic' }
    ],
    services: [
      { id: 'svc-oil', title: 'Oil Change', categoryId: 'cat-auto', providerId: 'pro-mechanic', price: 40 }
    ],
    providers: [
      { id: 'pro-mechanic', name: 'Mechanic', rating: 4.7 }
    ]
  },
  tutoring: {
    categories: [
      { id: 'cat-math', name: 'Math', icon: 'calculator', providerId: 'pro-tutor' }
    ],
    services: [
      { id: 'svc-algebra', title: 'Algebra Tutoring', categoryId: 'cat-math', providerId: 'pro-tutor', price: 50 }
    ],
    providers: [
      { id: 'pro-tutor', name: 'Tutor', rating: 5 }
    ]
  },
  homecook: {
    categories: [
      { id: 'cat-home', name: 'Home Cooking', icon: 'restaurant', providerId: 'pro-cook' }
    ],
    services: [
      {
        id: 'svc-meal',
        title: 'Home-cooked Meal',
        categoryId: 'cat-home',
        providerId: 'pro-cook',
        price: 25,
        availableSlots: ['17:00', '18:00', '19:00']
      }
    ],
    providers: [
      { id: 'pro-cook', name: 'Home Cook', rating: 4.8 }
    ]
  },
  foodtruck: {
    categories: [
      { id: 'cat-truck', name: 'Food Truck', icon: 'bus', providerId: 'pro-truck' }
    ],
    services: [
      {
        id: 'svc-truck',
        title: 'Food Truck Catering',
        categoryId: 'cat-truck',
        providerId: 'pro-truck',
        price: 300,
        availableSlots: ['11:00', '13:00', '15:00']
      }
    ],
    providers: [
      { id: 'pro-truck', name: 'Food Truck', rating: 4.9 }
    ]
  }
};
