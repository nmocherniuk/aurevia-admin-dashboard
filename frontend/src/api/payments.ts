import { api } from "./api";

export type PaymentStatus = "paid" | "unpaid";

export type Payment = {
  id: string;
  bookingId: string;
  clientName: string;
  route: string;
  amount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  date: string;
  updatedAt: string;
  driverName?: string;
  vehicle?: string;
  stripeStatus?: string;
  cardLast4?: string;
  stripePaymentIntentId: string | null;
  timeline: { label: string; date: string }[];
};

export async function listPayments(): Promise<Payment[]> {
  const { data } = await api.get<{ payments: Payment[] }>("/payments");
  return data.payments;
}
