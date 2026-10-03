function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function prepareSvg(svg: string, bg: string) {
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  const el = doc.documentElement;
  const [x = 0, y = 0, w = 800, h = 600] = (el.getAttribute("viewBox") || "")
    .split(/[\s,]+/)
    .map(Number);
  el.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  el.setAttribute("width", String(w));
  el.setAttribute("height", String(h));
  el.removeAttribute("style");
  const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", String(x));
  rect.setAttribute("y", String(y));
  rect.setAttribute("width", String(w));
  rect.setAttribute("height", String(h));
  rect.setAttribute("fill", bg);
  el.insertBefore(rect, el.firstChild);
  return { svg: new XMLSerializer().serializeToString(el), w, h };
}

export function downloadSvg(svg: string, bg: string, filename: string) {
  const { svg: out } = prepareSvg(svg, bg);
  triggerDownload(
    new Blob([out], { type: "image/svg+xml;charset=utf-8" }),
    filename,
  );
}

export async function downloadPng(
  svg: string,
  bg: string,
  filename: string,
  scale = 2,
) {
  const { svg: out, w, h } = prepareSvg(svg, bg);
  const k = Math.min(scale, 8000 / Math.max(w, h));
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(out);
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * k);
  canvas.height = Math.round(h * k);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(k, k);
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((r) =>
    canvas.toBlob(r, "image/png"),
  );
  if (!blob) throw new Error("No se pudo generar el PNG");
  triggerDownload(blob, filename);
}
