"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/hooks/use-i18n";
import { withLocale } from "@/lib/locale-path";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocaleLink({
  href,
  ...props
}: LocaleLinkProps): React.JSX.Element {
  const { locale } = useI18n();
  const localizedHref = href.startsWith("/") ? withLocale(href, locale) : href;
  return <Link href={localizedHref} {...props} />;
}
