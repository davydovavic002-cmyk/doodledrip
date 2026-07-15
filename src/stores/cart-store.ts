import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BagSize, ProductKind, ProductVariant } from "@/types";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  kind: ProductKind;
  variant?: ProductVariant;
  bagSize?: BagSize;
  image?: string;
}

function lineKey(item: {
  id: string;
  kind: ProductKind;
  variant?: ProductVariant;
  bagSize?: BagSize;
}): string {
  return [
    item.kind,
    item.id,
    item.variant ?? "none",
    item.bagSize ?? "none",
  ].join(":");
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (item: {
    id: string;
    kind: ProductKind;
    variant?: ProductVariant;
    bagSize?: BagSize;
  }) => void;
  updateQuantity: (
    item: {
      id: string;
      kind: ProductKind;
      variant?: ProductVariant;
      bagSize?: BagSize;
    },
    quantity: number,
  ) => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const key = lineKey(item);
          const existingIndex = state.items.findIndex(
            (i) => lineKey(i) === key,
          );

          if (existingIndex >= 0) {
            const next = state.items.map((i, idx) =>
              idx === existingIndex
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            );
            return { items: next, isOpen: true };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isOpen: true,
          };
        }),

      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((i) => lineKey(i) !== lineKey(item)),
        })),

      updateQuantity: (item, quantity) =>
        set((state) => {
          const key = lineKey(item);
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => lineKey(i) !== key),
            };
          }
          return {
            items: state.items.map((i) =>
              lineKey(i) === key ? { ...i, quantity } : i,
            ),
          };
        }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),
      clearCart: () => set({ items: [], isOpen: false }),
    }),
    {
      name: "coffee-cart-v3",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function selectCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
