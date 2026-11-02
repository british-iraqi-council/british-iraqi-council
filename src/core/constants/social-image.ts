export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const socialImagePath = (locale: string): string =>
  `/${locale}/opengraph-image`;
