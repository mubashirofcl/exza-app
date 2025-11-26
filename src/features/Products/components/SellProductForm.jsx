// src/features/Products/components/SellProductForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../state/productsSlice";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary"; 

const UploadIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const SellProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const watchedFiles = watch("images");

  useEffect(() => {

    if (watchedFiles && watchedFiles.length > 0) {
      const f = watchedFiles[0];
      setFile(f);

      const url = URL.createObjectURL(f);
      setPreview(url);

      return () => {
        URL.revokeObjectURL(url);
        setPreview(null);
      };
    } else {

      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setFile(null);
      setPreview(null);
    }

  }, [watchedFiles]);

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-exza-light border border-black/10 text-exza-dark " +
    "focus:outline-none focus:ring-2 focus:ring-exza-purple focus:border-exza-purple transition";

  const errorClasses = "text-sm text-red-600 mt-1";

  const onSubmit = async (data) => {
    setUploadError("");
    setUploadProgress(0);

    try {
      let imageUrl = "/placeholder.jpg"; 
      if (file) {

        const secureUrl = await uploadToCloudinary(file, (percent) => {
          setUploadProgress(percent);
        });
        imageUrl = secureUrl;
      }

      const product = {
        id: Date.now(),
        title: data.title,
        category: data.category || "uncategorized",
        price: Number(data.price) || 0,
        description: data.description || "",
        imageUrl,      
        images: [imageUrl], 
        status: "available",
        createdAt: new Date().toISOString(),
      };

      dispatch(addProduct(product));

      reset();
      if (preview) {
        try { URL.revokeObjectURL(preview); } catch (e) { }
      }
      setFile(null);
      setPreview(null);
      setUploadProgress(0);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Upload / submit failed:", err);
      setUploadError(err.message || "Upload failed. Try again.");
      setUploadProgress(0);
    }
  };

  return (
    <section className="py-8">
      <div className="w-full max-w-5xl mx-auto bg-white/40 border border-white/30 rounded-2xl shadow-elevated backdrop-blur-hard p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-exza-dark">List Your Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2 text-exza-dark">Product Title</label>
                <input type="text" id="title" placeholder="e.g., Apple iPhone 15 Pro Max" className={inputClasses} {...register("title", { required: "Title is required" })} />
                {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold mb-2 text-exza-dark">Category</label>
                  <select id="category" className={inputClasses} {...register("category", { required: "Category is required" })}>
                    <option value="">Select Category</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
                    <option value="phone">Phone</option>
                    <option value="property">Property</option>
                  </select>
                  {errors.category && <p className={errorClasses}>{errors.category.message}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-semibold mb-2 text-exza-dark">Price (Rp.)</label>
                  <input type="number" id="price" placeholder="200000000" className={inputClasses} {...register("price", { required: "Price is required" })} />
                  {errors.price && <p className={errorClasses}>{errors.price.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-exza-dark">Description</label>
                <textarea id="description" rows="5" placeholder="Describe your product's condition..." className={inputClasses + " resize-y"} {...register("description", { required: "Description is required" })} />
                {errors.description && <p className={errorClasses}>{errors.description.message}</p>}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="border border-dashed border-black/30 rounded-xl bg-white/40 p-5">
                <label htmlFor="images" className="flex items-center gap-3 text-sm font-semibold mb-2 text-exza-dark cursor-pointer">
                  <UploadIcon className="w-5 h-5 text-exza-purple" />
                  <span>Select Product Image (single)</span>
                </label>

                <div className="min-h-[140px] mb-3 flex items-center justify-center">
                  {preview ? (
                    <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-100/70 rounded-lg text-gray-500">Preview image will appear here</div>
                  )}
                </div>

                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-exza-purple/10 file:text-exza-purple hover:file:bg-exza-purple/20"
                  {...register("images")}
                />

                <small className="block text-gray-500 mt-2">Only one image will be uploaded. For production use signed uploads if required.</small>

                {uploadProgress > 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                      <div style={{ width: `${uploadProgress}%` }} className="h-full bg-exza-purple transition-all" />
                    </div>
                    <div className="text-sm mt-1 text-gray-600">{uploadProgress}%</div>
                  </div>
                )}

                {uploadError && <div className="mt-3 text-sm text-red-600">{uploadError}</div>}
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full mt-auto py-3 rounded-full bg-exza-purple text-white font-semibold shadow-elevated hover:bg-exza-dark transition disabled:opacity-50">
                {isSubmitting ? "Processing..." : "Post Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellProductForm;
