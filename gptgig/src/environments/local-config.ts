/** Mock data used when running with the local-config option */

import { Provider } from "@angular/core";
import { ServiceCategory, ServiceItem, ServiceProvider } from "src/app/models/catalog.models";
import { Message } from "src/app/models/message";
import { Profile } from "src/app/services/profile.service";
import { VendorProfile } from "src/app/services/vendor.service";

export interface LocalConfig {
  profiles: Profile[];
  messages: Message[];
  vendors: VendorProfile[];
  categories: ServiceCategory[];
  services: ServiceItem[];
  providers: ServiceProvider[];
  searchResults: any[];
  paymentIntent: any;
}

export const localConfig: LocalConfig = {
  profiles: [
    { id: 1, displayName: 'Alice', avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
    { id: 2, displayName: 'Bob', avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
    { id: 3, displayName: 'Charlie', avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
    { id: 4, displayName: 'Diana', avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg' },
    { id: 5, displayName: 'Evan', avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg' }
  ],
  messages: [
    { id: 1, senderId: '1', recipientId: '2', content: 'Hi Bob', timestamp: '2023-01-01T00:00:00Z', isRead: false },
    { id: 2, senderId: '2', recipientId: '1', content: 'Hello Alice', timestamp: '2023-01-01T00:01:00Z', isRead: false },
    { id: 3, senderId: '3', recipientId: '1', content: 'Hey there', timestamp: '2023-01-01T00:02:00Z', isRead: false },
    { id: 4, senderId: '4', recipientId: '1', content: 'Good day', timestamp: '2023-01-01T00:03:00Z', isRead: false },
    { id: 5, senderId: '5', recipientId: '1', content: 'Howdy', timestamp: '2023-01-01T00:04:00Z', isRead: false }
  ],
  vendors: [
    { id: 1, name: 'Vendor One' },
    { id: 2, name: 'Vendor Two' },
    { id: 3, name: 'Vendor Three' },
    { id: 4, name: 'Vendor Four' },
    { id: 5, name: 'Vendor Five' }
  ],
  categories: [
    { id: 'cat1', name: 'Category 1',
      providerId: "" },
    {
      id: 'cat2', name: 'Category 2',
      providerId: ""
    },
    { id: 'cat3', name: 'Category 3',
      providerId: "" },
    { id: 'cat4', name: 'Category 4',
      providerId: "" },
    { id: 'cat5', name: 'Category 5',
      providerId: "" }
  ],
  services: [
    { id: 'svc1', title: 'Service 1', price: 10, categoryId: 'cat1',
      providerId: "" },
    { id: 'svc2', title: 'Service 2', price: 20, categoryId: 'cat2',
      providerId: "" },
    { id: 'svc3', title: 'Service 3', price: 30, categoryId: 'cat3',
      providerId: "" },
    { id: 'svc4', title: 'Service 4', price: 40, categoryId: 'cat4',
      providerId: "" },
    { id: 'svc5', title: 'Service 5', price: 50, categoryId: 'cat5',
      providerId: "" }
  ],
  providers: [
    { id: 'prov1', name: 'Provider 1', servicesOffered: ['svc1'] },
    { id: 'prov2', name: 'Provider 2', servicesOffered: ['svc2'] },
    { id: 'prov3', name: 'Provider 3', servicesOffered: ['svc3'] },
    { id: 'prov4', name: 'Provider 4', servicesOffered: ['svc4'] },
    { id: 'prov5', name: 'Provider 5', servicesOffered: ['svc5'] }
  ],
  searchResults: [
    { id: 'res1', title: 'Result 1', price: 15, categoryId: 'cat1' },
    { id: 'res2', title: 'Result 2', price: 25, categoryId: 'cat2' },
    { id: 'res3', title: 'Result 3', price: 35, categoryId: 'cat3' },
    { id: 'res4', title: 'Result 4', price: 45, categoryId: 'cat4' },
    { id: 'res5', title: 'Result 5', price: 55, categoryId: 'cat5' }
  ],
  paymentIntent: { clientSecret: 'local_secret_123' }
};
