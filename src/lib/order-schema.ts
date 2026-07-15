export type OrderFulfillment = "pickup" | "delivery";

export interface OrderItemInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  kind: string;
  variant?: string;
  bagSize?: string;
  image?: string;
}

export interface OrderCustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderAddressInput {
  street: string;
  city: string;
  postalCode: string;
}

export interface CreateOrderInput {
  items: OrderItemInput[];
  customer: OrderCustomerInput;
  fulfillment: OrderFulfillment;
  address?: OrderAddressInput | null;
  notes?: string;
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
  /** Demo payment — last 4 digits only; no real card processing */
  cardLast4: string;
}

export interface StoredOrder {
  orderId: string;
  items: OrderItemInput[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  fulfillment: OrderFulfillment;
  address: string;
  notes?: string;
  subtotal: number;
  shipping: number;
  total: number;
  cardLast4: string;
  createdAt: string;
}

export interface ValidationResult {
  ok: true;
  data: CreateOrderInput;
}

export interface ValidationError {
  ok: false;
  error: string;
  field?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateCreateOrder(
  body: unknown,
): ValidationResult | ValidationError {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid JSON body" };
  }

  const raw = body as Record<string, unknown>;

  if (!Array.isArray(raw.items) || raw.items.length === 0) {
    return { ok: false, error: "Order must include at least one item", field: "items" };
  }

  const items: OrderItemInput[] = [];
  for (const item of raw.items) {
    if (!item || typeof item !== "object") {
      return { ok: false, error: "Invalid item", field: "items" };
    }
    const row = item as Record<string, unknown>;
    if (
      !isNonEmptyString(row.id) ||
      !isNonEmptyString(row.name) ||
      !isFiniteNumber(row.price) ||
      !isFiniteNumber(row.quantity) ||
      row.quantity < 1 ||
      !isNonEmptyString(row.kind)
    ) {
      return { ok: false, error: "Invalid item fields", field: "items" };
    }
    items.push({
      id: row.id.trim(),
      name: row.name.trim(),
      price: row.price,
      quantity: Math.floor(row.quantity),
      kind: row.kind.trim(),
      variant: isNonEmptyString(row.variant) ? row.variant : undefined,
      bagSize: isNonEmptyString(row.bagSize) ? row.bagSize : undefined,
      image: isNonEmptyString(row.image) ? row.image : undefined,
    });
  }

  const customerRaw = raw.customer;
  if (!customerRaw || typeof customerRaw !== "object") {
    return { ok: false, error: "Customer is required", field: "customer" };
  }
  const c = customerRaw as Record<string, unknown>;
  if (
    !isNonEmptyString(c.firstName) ||
    !isNonEmptyString(c.lastName) ||
    !isNonEmptyString(c.email) ||
    !isNonEmptyString(c.phone)
  ) {
    return { ok: false, error: "Customer fields required", field: "customer" };
  }
  if (!validateEmail(c.email)) {
    return { ok: false, error: "Invalid email", field: "customer.email" };
  }

  const fulfillment = raw.fulfillment;
  if (fulfillment !== "pickup" && fulfillment !== "delivery") {
    return { ok: false, error: "Invalid fulfillment", field: "fulfillment" };
  }

  let address: OrderAddressInput | null = null;
  if (fulfillment === "delivery") {
    const a = raw.address;
    if (!a || typeof a !== "object") {
      return { ok: false, error: "Address required for delivery", field: "address" };
    }
    const addr = a as Record<string, unknown>;
    if (
      !isNonEmptyString(addr.street) ||
      !isNonEmptyString(addr.city) ||
      !isNonEmptyString(addr.postalCode)
    ) {
      return { ok: false, error: "Incomplete address", field: "address" };
    }
    address = {
      street: addr.street.trim(),
      city: addr.city.trim(),
      postalCode: addr.postalCode.trim(),
    };
  }

  const totalsRaw = raw.totals;
  if (!totalsRaw || typeof totalsRaw !== "object") {
    return { ok: false, error: "Totals required", field: "totals" };
  }
  const totals = totalsRaw as Record<string, unknown>;
  if (
    !isFiniteNumber(totals.subtotal) ||
    !isFiniteNumber(totals.shipping) ||
    !isFiniteNumber(totals.total)
  ) {
    return { ok: false, error: "Invalid totals", field: "totals" };
  }

  if (!isNonEmptyString(raw.cardLast4) || !/^\d{4}$/.test(raw.cardLast4.trim())) {
    return { ok: false, error: "cardLast4 must be 4 digits", field: "cardLast4" };
  }

  return {
    ok: true,
    data: {
      items,
      customer: {
        firstName: c.firstName.trim(),
        lastName: c.lastName.trim(),
        email: c.email.trim().toLowerCase(),
        phone: c.phone.trim(),
      },
      fulfillment,
      address,
      notes: isNonEmptyString(raw.notes) ? raw.notes.trim() : undefined,
      totals: {
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
      },
      cardLast4: raw.cardLast4.trim(),
    },
  };
}
