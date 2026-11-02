import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  SOCIAL_IMAGE_SIZE,
  socialImagePath,
} from "@/core/constants/social-image";
import { buildAlternates } from "./build-alternates";
import { openGraphLocale } from "./open-graph-locale";

export async function buildPageMetadata(
  locale: string,
  namespace: string,
  path: string,
): Promise<Metadata> {
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const t = await getTranslations({ locale, namespace: `${namespace}.meta` });

  const title = t("title");
  const description = t("description");
  const alternates = buildAlternates(locale, path);

  return {
    title: path === "" ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      type: "website",
      siteName: tCommon("siteName"),
      title,
      description,
      url: alternates.canonical,
      locale: openGraphLocale(locale),
      images: [
        {
          url: socialImagePath(locale),
          ...SOCIAL_IMAGE_SIZE,
          alt: tCommon("siteName"),
        },
      ],
    },
  };
}
