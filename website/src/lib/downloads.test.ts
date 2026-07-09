import { describe, it, expect } from "vitest";
import { SURFACES, CLIENT_LINUX_REPOS } from "./downloads.ts";

describe("client Linux repo metadata", () => {
  it("points the current line at the v7 marketplace repo", () => {
    expect(CLIENT_LINUX_REPOS.current.baseUrl).toBe(
      "https://marketplace.owncloud.com/packages/desktop/7/",
    );
  });

  it("offers the v6 line as the previous option", () => {
    expect(CLIENT_LINUX_REPOS.previous?.baseUrl).toBe(
      "https://marketplace.owncloud.com/packages/desktop/6/",
    );
  });

  it("verifies repos against the armored marketplace signing key", () => {
    expect(CLIENT_LINUX_REPOS.signingKey).toBe(
      "https://marketplace.owncloud.com/packages/desktop/owncloud.asc",
    );
  });

  it("carries a non-empty beta note while the repos are being rolled out", () => {
    expect(CLIENT_LINUX_REPOS.beta).toBeTruthy();
    expect(typeof CLIENT_LINUX_REPOS.beta).toBe("string");
  });
});

describe("Linux repo feature flag", () => {
  // The test run does not set MARKETPLACE_SHOW_LINUX_REPOS, so the flag is off —
  // this is the live/default behaviour: the section is hidden everywhere.
  it("hides linuxRepos on the client surface by default (flag off)", () => {
    const client = SURFACES.find((s) => s.key === "client");
    expect(client?.linuxRepos).toBeUndefined();
  });

  it("no surface declares linuxRepos while the flag is off", () => {
    expect(SURFACES.every((s) => s.linuxRepos === undefined)).toBe(true);
  });
});
