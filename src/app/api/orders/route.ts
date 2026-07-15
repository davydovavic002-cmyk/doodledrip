import { NextResponse } from "next/server";
import { SITE_LOCATION } from "@/lib/constants";
import { validateCreateOrder } from "@/lib/order-schema";
import { saveOrder } from "@/lib/order-store";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const result = validateCreateOrder(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, field: result.field },
      { status: 400 },
    );
  }

  const { data } = result;
  const address =
    data.fulfillment === "delivery" && data.address
      ? `${data.address.street}, ${data.address.postalCode} ${data.address.city}`
      : SITE_LOCATION.short;

  const order = saveOrder({
    items: data.items,
    customer: {
      name: `${data.customer.firstName} ${data.customer.lastName}`,
      email: data.customer.email,
      phone: data.customer.phone,
    },
    fulfillment: data.fulfillment,
    address,
    notes: data.notes,
    subtotal: data.totals.subtotal,
    shipping: data.totals.shipping,
    total: data.totals.total,
    cardLast4: data.cardLast4,
  });

  return NextResponse.json({
    ok: true,
    orderId: order.orderId,
    order,
  });
}
