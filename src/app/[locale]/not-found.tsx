import { getLocale, getTranslations } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import {
  Button,
  LtrRun,
  RichText,
  SiteShell,
} from "@/core/new-components/common";

export default async function NotFound() {
  const locale = await getLocale();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const t = await getTranslations({ locale, namespace: "notFound" });
  const tOther = await getTranslations({
    locale: otherLocale,
    namespace: "notFound",
  });

  return (
    <SiteShell>
      <section>
        <div
          id="content"
          tabIndex={-1}
          className="shell flex min-h-[50vh] flex-col items-start justify-center gap-6 focus:outline-none"
        >
          <p className="font-display text-display font-semibold text-blue">
            <LtrRun>404</LtrRun>
          </p>
          <span aria-hidden="true" className="rule-red" />
          <div className="flex flex-col gap-3">
            <h1 className="max-w-[22ch] font-display text-headline font-semibold text-blue hyphens-auto [overflow-wrap:anywhere]">
              {t("title")}
            </h1>
            <p
              lang={otherLocale}
              dir={getLangDir(otherLocale)}
              className="font-medium text-muted"
            >
              {tOther("title")}
            </p>
          </div>
          <p className="max-w-[52ch] text-lead">
            <RichText text={t("body")} locale={locale} />
          </p>
          <Button href="/" variant="blue">
            {t("home")}
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
