import type { StoredOrder } from "@/lib/order-schema";
import { createOrderId } from "@/lib/orders";

/** In-memory order store (demo / no persistence). */
const orders = new Map<string, StoredOrder>();

/** In-memory newsletter signups. */
const newsletterEmails = new Set<string>();

export function saveOrder(
  order: Omit<StoredOrder, "orderId" | "createdAt"> & {
    orderId?: string;
    createdAt?: string;
  },
): StoredOrder {
  const stored: StoredOrder = {
    ...order,
    orderId: order.orderId ?? createOrderId(),
    createdAt: order.createdAt ?? new Date().toISOString(),
  };
  orders.set(stored.orderId, stored);
  return stored;
}

export function getOrder(id: string): StoredOrder | undefined {
  return orders.get(id);
}

export function addNewsletterEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  if (newsletterEmails.has(normalized)) return false;
  newsletterEmails.add(normalized);
  return true;
}
