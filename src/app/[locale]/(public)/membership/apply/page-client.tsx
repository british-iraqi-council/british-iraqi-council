import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import {
  APPLICATION_SECTORS,
  COMPANY_SIZES,
  COUNTRIES,
  TIERS,
} from "@/content";
import type { Option } from "@/content";
import { BANNER_IMAGES } from "@/core/constants/images";
import type { Locale } from "@/core/i18n/routing";
import { PageHeading, Reveal, Section } from "@/core/new-components/common";
import { isolateLtrRuns } from "@/lib/isolate-ltr-runs";
import { localize } from "@/lib/localize";
import { pickMessages } from "@/lib/pick-messages";
import { ApplicationForm } from "./components";
import { ApplicationPageClientProps } from "./types";

export default async function ApplicationPageClient({
  locale,
}: ApplicationPageClientProps) {
  const t = await getTranslations({ locale, namespace: "apply" });
  const messages = await getMessages();

  const optionLabel = (option: Option<string>) => {
    const label = localize(option.label, locale);
    return locale === "ar" ? isolateLtrRuns(label) : label;
  };
  const options = (list: readonly Option<string>[]) =>
    list.map((option) => ({
      value: option.value,
      label: optionLabel(option),
    }));

  return (
    <>
      <PageHeading
        title={t("heading.title")}
        lede={t("heading.lede")}
        image={BANNER_IMAGES.apply.src}
        imagePosition={BANNER_IMAGES.apply.position}
      />
      <Section>
        <Reveal className="mx-auto max-w-3xl">
          <NextIntlClientProvider
            messages={pickMessages(messages, ["apply.form", "forms.errors"])}
          >
            <ApplicationForm
              locale={locale as Locale}
              tiers={TIERS.map((tier) => ({
                id: tier.id,
                name: localize(tier.name, locale),
                tagline: localize(tier.tagline, locale),
              }))}
              sectors={options(APPLICATION_SECTORS)}
              companySizes={options(COMPANY_SIZES)}
              countries={options(COUNTRIES)}
            />
          </NextIntlClientProvider>
        </Reveal>
      </Section>
    </>
  );
}
