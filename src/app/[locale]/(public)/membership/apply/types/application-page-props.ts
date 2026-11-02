export interface ApplicationPageProps {
  params: Promise<{ locale: string }>;
}

export interface ApplicationPageClientProps {
  locale: string;
}
