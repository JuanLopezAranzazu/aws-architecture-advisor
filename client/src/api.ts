import type { Architecture, ArchitectRequest } from "./types";

export async function generateArchitecture(
  req: ArchitectRequest,
): Promise<Architecture> {
  const res = await fetch("/api/architect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail =
      typeof body.detail === "string" ? body.detail : `Error ${res.status}`;
    throw new Error(detail);
  }
  return res.json();
}
