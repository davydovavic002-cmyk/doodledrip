"use client";

import { useState, useMemo, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { VARIANT_LABELS } from "@/data/products";
import { SITE_LOCATION } from "@/lib/constants";
import { withLocale } from "@/lib/locale-path";
import { formatPrice, getShippingCost } from "@/lib/pricing";
import { useI18n } from "@/hooks/use-i18n";
import { useCartStore, type CartItem } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

type Fulfillment = "pickup" | "delivery";

interface CheckoutFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fulfillment: Fulfillment;
  street: string;
  city: string;
  postalCode: string;
  notes: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const INITIAL: CheckoutFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fulfillment: "pickup",
  street: "",
  city: "Gent",
  postalCode: "",
  notes: "",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value: string): string {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string): string {
  const d = digitsOnly(value).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

export function CheckoutForm(): React.JSX.Element {
  const { l, t, locale } = useI18n();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [form, setForm] = useState<CheckoutFormState>(INITIAL);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const shipping =
    form.fulfillment === "pickup" ? 0 : getShippingCost(subtotal);
  const total = subtotal + shipping;

  const setField = <K extends keyof CheckoutFormState>(
    key: K,
    value: CheckoutFormState[K],
  ): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof CheckoutFormState, string>> = {};

    if (!form.firstName.trim()) next.firstName = t("checkout.required");
    if (!form.lastName.trim()) next.lastName = t("checkout.required");
    if (!validateEmail(form.email)) next.email = t("checkout.emailInvalid");
    if (digitsOnly(form.phone).length < 8)
      next.phone = t("checkout.phoneInvalid");

    if (form.fulfillment === "delivery") {
      if (!form.street.trim()) next.street = t("checkout.required");
      if (!form.city.trim()) next.city = t("checkout.required");
      if (!form.postalCode.trim()) next.postalCode = t("checkout.required");
    }

    if (!form.cardName.trim()) next.cardName = t("checkout.required");
    if (digitsOnly(form.cardNumber).length !== 16)
      next.cardNumber = t("checkout.cardInvalid");
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry))
      next.cardExpiry = t("checkout.expiryInvalid");
    if (digitsOnly(form.cardCvc).length < 3)
      next.cardCvc = t("checkout.cvcInvalid");

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setSubmitting(true);
    setSubmitError(null);

    const cardDigits = digitsOnly(form.cardNumber);
    const cardLast4 = cardDigits.slice(-4);

    const payload = {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        kind: item.kind,
        variant: item.variant,
        bagSize: item.bagSize,
        image: item.image,
      })),
      customer: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      fulfillment: form.fulfillment,
      address:
        form.fulfillment === "delivery"
          ? {
              street: form.street.trim(),
              city: form.city.trim(),
              postalCode: form.postalCode.trim(),
            }
          : null,
      notes: form.notes.trim() || undefined,
      totals: { subtotal, shipping, total },
      cardLast4,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        orderId?: string;
        error?: string;
        order?: {
          orderId: string;
          items: CartItem[];
          subtotal: number;
          shipping: number;
          total: number;
          fulfillment: Fulfillment;
          customer: { name: string; email: string; phone: string };
          address: string;
          createdAt: string;
        };
      };

      if (!res.ok || !data.ok || !data.orderId) {
        setSubmitError(data.error ?? t("checkout.placeError"));
        setSubmitting(false);
        return;
      }

      const snapshot = data.order ?? {
        orderId: data.orderId,
        items: items as CartItem[],
        subtotal,
        shipping,
        total,
        fulfillment: form.fulfillment,
        customer: {
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
        address:
          form.fulfillment === "delivery"
            ? `${form.street}, ${form.postalCode} ${form.city}`
            : SITE_LOCATION.short,
        createdAt: new Date().toISOString(),
      };

      try {
        sessionStorage.setItem("coffee-last-order", JSON.stringify(snapshot));
      } catch {
        /* ignore storage errors */
      }

      clearCart();
      router.push(
        `${withLocale("/checkout/success", locale)}?order=${data.orderId}`,
      );
    } catch {
      setSubmitError(t("checkout.placeError"));
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center md:px-8">
        <BrutalCard className="p-10">
          <p className="font-display text-xl font-black text-coffee-ink">
            {t("checkout.emptyTitle")}
          </p>
          <p className="mt-2 text-coffee-ink/60">{t("checkout.emptyBody")}</p>
          <LocaleLink href="/shop" className="mt-6 inline-block">
            <Button>{t("checkout.goShop")}</Button>
          </LocaleLink>
        </BrutalCard>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:gap-8 md:px-8 md:py-12 lg:grid-cols-[1.2fr_0.8fr]"
      noValidate
    >
      <div className="order-2 space-y-6 lg:order-1">
        <LocaleLink
          href="/shop"
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-coffee-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          {t("checkout.back")}
        </LocaleLink>

        <BrutalCard className="p-6">
          <h2 className="font-display text-lg font-black text-coffee-ink">
            {t("checkout.contact")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label={t("checkout.firstName")}
              value={form.firstName}
              error={errors.firstName}
              onChange={(v) => setField("firstName", v)}
              autoComplete="given-name"
            />
            <Field
              label={t("checkout.lastName")}
              value={form.lastName}
              error={errors.lastName}
              onChange={(v) => setField("lastName", v)}
              autoComplete="family-name"
            />
            <Field
              label={t("checkout.email")}
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(v) => setField("email", v)}
              autoComplete="email"
              className="sm:col-span-2"
            />
            <Field
              label={t("checkout.phone")}
              type="tel"
              value={form.phone}
              error={errors.phone}
              onChange={(v) => setField("phone", v)}
              autoComplete="tel"
              className="sm:col-span-2"
            />
          </div>
        </BrutalCard>

        <BrutalCard className="p-6">
          <h2 className="font-display text-lg font-black text-coffee-ink">
            {t("checkout.fulfillment")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <FulfillmentOption
              active={form.fulfillment === "pickup"}
              onClick={() => setField("fulfillment", "pickup")}
              icon={<Package className="h-5 w-5" strokeWidth={2.5} />}
              title={t("checkout.pickup")}
              subtitle={SITE_LOCATION.short}
            />
            <FulfillmentOption
              active={form.fulfillment === "delivery"}
              onClick={() => setField("fulfillment", "delivery")}
              icon={<Truck className="h-5 w-5" strokeWidth={2.5} />}
              title={t("checkout.delivery")}
              subtitle={t("checkout.deliverySub")}
            />
          </div>

          {form.fulfillment === "delivery" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label={t("checkout.street")}
                value={form.street}
                error={errors.street}
                onChange={(v) => setField("street", v)}
                autoComplete="street-address"
                className="sm:col-span-2"
              />
              <Field
                label={t("checkout.postal")}
                value={form.postalCode}
                error={errors.postalCode}
                onChange={(v) => setField("postalCode", v)}
                autoComplete="postal-code"
              />
              <Field
                label={t("checkout.city")}
                value={form.city}
                error={errors.city}
                onChange={(v) => setField("city", v)}
                autoComplete="address-level2"
              />
            </div>
          ) : (
            <p className="mt-4 border-2 border-coffee-blue/20 bg-coffee-cream p-3 text-sm text-coffee-ink/70">
              {t("checkout.pickupNote")}
            </p>
          )}

          <div className="mt-4">
            <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-coffee-ink/50">
              {t("checkout.notes")}{" "}
              <span className="font-normal normal-case">
                {t("checkout.notesOptional")}
              </span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              rows={3}
              className="w-full border-2 border-coffee-blue bg-white px-3 py-2 text-sm text-coffee-ink focus:outline-none focus:ring-4 focus:ring-coffee-blue/20"
              placeholder={t("checkout.notesPlaceholder")}
            />
          </div>
        </BrutalCard>

        <BrutalCard className="p-6">
          <h2 className="font-display text-lg font-black text-coffee-ink">
            {t("checkout.payment")}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label={t("checkout.cardName")}
              value={form.cardName}
              error={errors.cardName}
              onChange={(v) => setField("cardName", v)}
              autoComplete="cc-name"
              className="sm:col-span-2"
            />
            <Field
              label={t("checkout.cardNumber")}
              value={form.cardNumber}
              error={errors.cardNumber}
              onChange={(v) => setField("cardNumber", formatCardNumber(v))}
              autoComplete="cc-number"
              inputMode="numeric"
              className="sm:col-span-2"
              placeholder="4242 4242 4242 4242"
            />
            <Field
              label={t("checkout.expiry")}
              value={form.cardExpiry}
              error={errors.cardExpiry}
              onChange={(v) => setField("cardExpiry", formatExpiry(v))}
              autoComplete="cc-exp"
              inputMode="numeric"
              placeholder="MM/YY"
            />
            <Field
              label={t("checkout.cvc")}
              value={form.cardCvc}
              error={errors.cardCvc}
              onChange={(v) => setField("cardCvc", digitsOnly(v).slice(0, 4))}
              autoComplete="cc-csc"
              inputMode="numeric"
              placeholder="123"
            />
          </div>
        </BrutalCard>
      </div>

      <div className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
        <BrutalCard className="p-4 sm:p-6">
          <h2 className="font-display text-lg font-black text-coffee-ink">
            {t("checkout.summary")}
          </h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={`${item.id}-${item.variant}-${item.bagSize}`}
                className="flex gap-3 border-b-2 border-coffee-blue/10 pb-3"
              >
                {item.image ? (
                  <div className="relative h-12 w-12 shrink-0 border-2 border-coffee-blue bg-coffee-cream">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover p-0.5"
                      sizes="48px"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold">
                    {item.name}
                  </p>
                  <p className="text-xs text-coffee-ink/50">
                    {[
                      item.variant ? l(VARIANT_LABELS[item.variant]) : null,
                      item.bagSize,
                    ]
                      .filter(Boolean)
                      .join(" · ")}{" "}
                    × {item.quantity}
                  </p>
                </div>
                <span className="font-display text-sm font-bold text-coffee-blue">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between text-coffee-ink/60">
              <span>{t("checkout.subtotal")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-coffee-ink/60">
              <span>
                {form.fulfillment === "pickup"
                  ? t("checkout.pickupLabel")
                  : t("checkout.shipping")}
              </span>
              <span>
                {shipping === 0 ? t("cart.free") : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t-2 border-coffee-blue pt-3">
              <span className="font-display font-bold uppercase tracking-wider">
                {t("checkout.total")}
              </span>
              <span className="font-display text-2xl font-black text-coffee-blue">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {submitError ? (
            <p className="mt-3 text-xs font-medium text-red-600" role="alert">
              {submitError}
            </p>
          ) : null}

          <Button
            type="submit"
            className="mt-6 w-full"
            size="lg"
            disabled={submitting}
          >
            {submitting
              ? t("checkout.placing")
              : t("checkout.pay", { amount: formatPrice(total) })}
          </Button>
        </BrutalCard>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  className,
  placeholder,
  inputMode,
}: FieldProps): React.JSX.Element {
  return (
    <div className={className}>
      <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-coffee-ink/50">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full border-2 bg-white px-3 py-2.5 text-sm text-coffee-ink",
          "focus:outline-none focus:ring-4 focus:ring-coffee-blue/20",
          error ? "border-red-500" : "border-coffee-blue",
        )}
      />
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface FulfillmentOptionProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function FulfillmentOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: FulfillmentOptionProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 border-2 p-4 text-left transition-colors",
        active
          ? "border-coffee-blue bg-coffee-blue text-white shadow-brutal-sm"
          : "border-coffee-blue bg-white text-coffee-ink hover:bg-coffee-cream",
      )}
      aria-pressed={active}
    >
      <span className={active ? "text-white" : "text-coffee-blue"}>{icon}</span>
      <span>
        <span className="block font-display text-sm font-bold">{title}</span>
        <span
          className={cn(
            "mt-0.5 block text-xs",
            active ? "text-white/80" : "text-coffee-ink/50",
          )}
        >
          {subtitle}
        </span>
      </span>
      {active ? (
        <Check className="ml-auto h-5 w-5 shrink-0" strokeWidth={2.5} />
      ) : null}
    </button>
  );
}
