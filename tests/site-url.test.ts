import { afterEach, describe, expect, it, vi } from "vitest";

const loadSiteUrl = async (): Promise<string> => {
  vi.resetModules();
  const { SITE_URL } = await import("@/core/constants/site");
  return SITE_URL;
};

describe("SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("strips a trailing slash from NEXT_PUBLIC_SITE_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ibbc.example/");
    expect(await loadSiteUrl()).toBe("https://ibbc.example");
  });

  it("strips several trailing slashes", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ibbc.example//");
    expect(await loadSiteUrl()).toBe("https://ibbc.example");
  });

  it("keeps a URL with no trailing slash as it is", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ibbc.example");
    expect(await loadSiteUrl()).toBe("https://ibbc.example");
  });

  it("falls back to the Vercel production host", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "ibbc.vercel.app");
    expect(await loadSiteUrl()).toBe("https://ibbc.vercel.app");
  });

  it("falls back to localhost with neither set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    expect(await loadSiteUrl()).toBe("http://localhost:3000");
  });
});
