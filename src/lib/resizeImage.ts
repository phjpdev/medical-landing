// Client-side resize before admin upload — keeps requests under reverse-proxy limits.

export async function resizeImageToFile(
  file: File,
  maxWidth = 1200,
  maxHeight = 1600,
  quality = 0.86,
): Promise<File> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to compress image"));
            return;
          }
          const base = file.name.replace(/\.[^.]+$/, "") || "upload";
          resolve(new File([blob], `${base}.jpg`, { type: "image/jpeg", lastModified: Date.now() }));
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

/** @deprecated Use resizeImageToFile for uploads */
export async function resizeImageToDataUrl(
  file: File,
  maxWidth = 900,
  maxHeight = 1200,
  quality = 0.85,
): Promise<string> {
  const resized = await resizeImageToFile(file, maxWidth, maxHeight, quality);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(resized);
  });
}
