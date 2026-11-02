import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { RichText } from "@/core/new-components/common";
import type { ContactItem } from "@/lib/contact-items";
import { ContactDetailsProps } from "../types";

const ICONS: Record<ContactItem["kind"], LucideIcon> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

export default async function ContactDetails({
  items,
  locale,
}: ContactDetailsProps) {
  const t = await getTranslations({ locale, namespace: "contact.details" });

  return (
    <div className="flex flex-col gap-6 self-start rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-10">
      <h2 className="font-display text-title font-semibold text-blue">
        {t("title")}
      </h2>
      <ul className="flex flex-col gap-5">
        {items.map((item) => {
          const Glyph = ICONS[item.kind];
          const value = <RichText text={item.text} locale={locale} />;
          return (
            <li key={item.kind} className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ivory text-blue">
                <Glyph
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-5"
                />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-medium text-muted">
                  {t(item.kind)}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-base font-semibold text-ink underline-offset-4 hover:text-blue hover:underline [overflow-wrap:anywhere]"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-base font-semibold text-ink [overflow-wrap:anywhere]">
                    {value}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
