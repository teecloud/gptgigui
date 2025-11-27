export interface Order {
  id: number;
  serviceItemId: string;
  serviceTitle: string;
  customerName?: string;
  customerEmail?: string;
  paymentStatus: string;
  serviceImageUrl?: string;
  scheduledSlot?: string;
  createdAt: string;
  amount: number;
  currency: string;
  paymentIntentId: string;
  paymentMethodType?: string;
}
