import { getTranslations } from "next-intl/server";
import SmoothScroll from "@/lib/smooth-scroll";
import SiteFooter from "../site-footer";
import SiteHeader from "../site-header";
import { SiteShellProps } from "./site-shell-props";

export default async function SiteShell({ children }: SiteShellProps) {
  const t = await getTranslations("common");

  return (
    <SmoothScroll>
      <div className="flex min-h-svh flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-blue focus:shadow-lg"
        >
          {t("skipToContent")}
        </a>
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-24 pt-20 pb-24 lg:gap-32 lg:pt-24 lg:pb-32">
          {children}
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
