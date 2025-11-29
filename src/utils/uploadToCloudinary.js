export async function uploadSingleToCloudinary(file) {
  if (!file) return null;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !preset) {
    throw new Error("Cloudinary env vars missing: VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);

  const res = await fetch(url, {
    method: "POST",
    body: fd,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message || "Cloudinary upload failed");
  }

  return json.secure_url || json.url || null;
}
