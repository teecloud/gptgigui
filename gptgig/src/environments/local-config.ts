/** Mock data used when running with the local-config option */

export interface LocalConfig {
  profiles: any[];
  messages: any[];
  vendors: any[];
  categories: any[];
  services: any[];
  providers: any[];
  searchResults: any[];
  paymentIntent: any;
}

export const localConfig: LocalConfig = {
  profiles: [
    { id: 1, displayName: 'Alice' },
    { id: 2, displayName: 'Bob' },
    { id: 3, displayName: 'Charlie' },
    { id: 4, displayName: 'Diana' },
    { id: 5, displayName: 'Evan' }
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
    { id: 'cat1', name: 'Category 1' },
    { id: 'cat2', name: 'Category 2' },
    { id: 'cat3', name: 'Category 3' },
    { id: 'cat4', name: 'Category 4' },
    { id: 'cat5', name: 'Category 5' }
  ],
  services: [
    { id: 'svc1', title: 'Service 1', price: 10, categoryId: 'cat1' },
    { id: 'svc2', title: 'Service 2', price: 20, categoryId: 'cat2' },
    { id: 'svc3', title: 'Service 3', price: 30, categoryId: 'cat3' },
    { id: 'svc4', title: 'Service 4', price: 40, categoryId: 'cat4' },
    { id: 'svc5', title: 'Service 5', price: 50, categoryId: 'cat5' }
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
