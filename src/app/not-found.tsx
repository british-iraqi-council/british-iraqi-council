import { routing } from "@/core/i18n/routing";

export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} dir="rtl">
      <body>
        <main>
          <h1>الصفحة غير موجودة</h1>
          <a href={`/${routing.defaultLocale}`}>العودة إلى الرئيسية</a>
        </main>
      </body>
    </html>
  );
}
