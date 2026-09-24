const MAX_DATA_URL_LENGTH = 400_000;

const ATTEMPTS: Array<{ maxDimension: number; quality: number }> = [
  { maxDimension: 900, quality: 0.75 },
  { maxDimension: 640, quality: 0.6 },
  { maxDimension: 480, quality: 0.5 },
];

function renderToDataUrl(
  bitmap: ImageBitmap,
  maxDimension: number,
  quality: number,
): string {
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Kanvas tidak didukung di browser ini.");
  }

  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

export async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);

  try {
    for (const { maxDimension, quality } of ATTEMPTS) {
      const dataUrl = renderToDataUrl(bitmap, maxDimension, quality);
      if (dataUrl.length <= MAX_DATA_URL_LENGTH) {
        return dataUrl;
      }
    }
  } finally {
    bitmap.close();
  }

  throw new Error("Foto terlalu besar untuk disimpan, coba foto lain.");
}
