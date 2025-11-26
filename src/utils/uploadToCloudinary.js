export const uploadToCloudinary = async (file, onProgress) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary not configured (check .env).");
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", uploadPreset);

        xhr.open("POST", url);

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
                const percent = Math.round((e.loaded / e.total) * 100);
                onProgress(percent);
            }
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const resp = JSON.parse(xhr.responseText);
                        resolve(resp.secure_url || resp.url);
                    } catch (err) {
                        reject(new Error("Invalid JSON response from Cloudinary"));
                    }
                } else {
                    try {
                        const err = JSON.parse(xhr.responseText);
                        reject(new Error(err.error?.message || `Upload failed: ${xhr.status}`));
                    } catch {
                        reject(new Error(`Upload failed: ${xhr.status}`));
                    }
                }
            }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(fd);
    });
};
