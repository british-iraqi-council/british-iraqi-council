import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { CONTACT_SUBJECTS, ORGANISATION } from "@/content";
import type { Locale } from "@/core/i18n/routing";
import { PageHeading, RichText, Section } from "@/core/new-components/common";
import { contactItems } from "@/lib/contact-items";
import { localize } from "@/lib/localize";
import { pickMessages } from "@/lib/pick-messages";
import { ContactDetails, ContactForm } from "./components";
import { ContactPageClientProps } from "./types";

export default async function ContactPageClient({
  locale,
}: ContactPageClientProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const messages = await getMessages();
  const items = contactItems(ORGANISATION.contact, locale as Locale);
  const subjects = CONTACT_SUBJECTS.map((subject) => ({
    value: subject.value,
    label: localize(subject.label, locale),
  }));

  const form = (
    <NextIntlClientProvider messages={pickMessages(messages, ["contact.form"])}>
      <ContactForm locale={locale as Locale} subjects={subjects} />
    </NextIntlClientProvider>
  );

  return (
    <>
      <PageHeading title={t("heading.title")} lede={t("heading.lede")} />
      <Section>
        {items.length === 0 ? (
          <div className="mx-auto flex max-w-2xl flex-col gap-8">
            <p className="text-lead">
              <RichText text={t("intro")} locale={locale} />
            </p>
            {form}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <ContactDetails items={items} />
            {form}
          </div>
        )}
      </Section>
    </>
  );
}
