import { ReactNode } from "react";

export interface PublicLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}
