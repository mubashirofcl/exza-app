import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../state/productsSlice";
import { useNavigate } from "react-router-dom";
import { uploadSingleToCloudinary } from "../../../utils/uploadToCloudinary";

const SellProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const watchedFiles = watch("images");

  useEffect(() => {
    if (!watchedFiles || watchedFiles.length === 0) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }
    const file = watchedFiles[0];
    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [watchedFiles]);

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-exza-light border border-black/10 text-exza-dark " +
    "focus:outline-none focus:ring-2 focus:ring-exza-purple focus:border-exza-purple transition";

  const errorClasses = "text-sm text-red-600 mt-1";

  const onSubmit = async (data) => {
    try {
      const file = data.images && data.images.length > 0 ? data.images[0] : null;
      let imageUrl = "/placeholder.jpg";

      if (file) {
        imageUrl = await uploadSingleToCloudinary(file);
      }

      const product = {
        id: Date.now(),
        title: data.title.trim(),
        category: data.category || "uncategorized",
        price: Number(data.price) || 0,
        description: data.description.trim(),
        imageUrl: imageUrl || "/placeholder.jpg",
        status: "available",
        createdAt: new Date().toISOString(),
      };

      dispatch(addProduct(product));

      reset();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Failed to post product:", err);
      alert("Upload failed: " + (err.message || "Unknown error"));
    }
  };

  return (
    <section className="py-8">
      <div className="w-full max-w-5xl mx-auto bg-white/40 border border-white/30 rounded-2xl shadow-elevated backdrop-blur-hard p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-exza-dark">List Your Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-5">
    
              <div>
                <label htmlFor="title" className="block text-sm font-semibold mb-2 text-exza-dark">Product Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="e.g., Apple iPhone 15 Pro Max"
                  className={inputClasses}
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                    validate: (v) => (v.trim().length >= 3) || "Title cannot be only spaces",
                  })}
                />
                {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold mb-2 text-exza-dark">Category</label>
                  <select
                    id="category"
                    className={inputClasses}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
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
                  <input
                    type="number"
                    id="price"
                    placeholder="200000000"
                    className={inputClasses}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      validate: (v) => (Number(v) > 0) || "Price must be greater than 0",
                    })}
                  />
                  {errors.price && <p className={errorClasses}>{errors.price.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-exza-dark">Description</label>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Describe your product..."
                  className={inputClasses + " resize-y"}
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                    validate: (v) => (v.trim().length >= 10) || "Description cannot be only spaces",
                  })}
                />
                {errors.description && <p className={errorClasses}>{errors.description.message}</p>}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="border border-dashed border-black/30 rounded-xl bg-white/40 p-5">
                <label htmlFor="images" className="flex items-center gap-3 text-sm font-semibold mb-2 text-exza-dark cursor-pointer">
                  <svg className="w-5 h-5 text-exza-purple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  <span>Select Product Image</span>
                </label>

                <div className="min-h-[180px] flex items-center justify-center rounded-lg mb-3 bg-gray-100/70">
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" className="max-h-[160px] object-contain" />
                  ) : (
                    <div className="text-gray-500 text-sm">Preview will appear here after selecting a single image.</div>
                  )}
                </div>

                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  className="w-full text-sm text-gray-600"
                  {...register("images", {
                    validate: (files) => {
                      if (!files || files.length === 0) return true; 
                      if (files.length > 1) return "Only one image is allowed";
                      const f = files[0];
                      const maxSize = 5 * 1024 * 1024; 
                      if (f.size > maxSize) return "Image must be < 5MB";
                      return true;
                    },
                  })}
                />
                {errors.images && <p className={errorClasses}>{errors.images.message}</p>}

                <small className="block text-gray-500 mt-2">Only one image is uploaded and used as product thumbnail. Max 5MB.</small>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-auto py-3 rounded-full bg-exza-purple text-white font-semibold shadow-elevated hover:bg-exza-dark transition disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellProductForm;
