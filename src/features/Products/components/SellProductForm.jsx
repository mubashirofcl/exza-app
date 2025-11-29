import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../../state/productsSlice";
import { useNavigate } from "react-router-dom";
import { uploadSingleToCloudinary } from "../../../utils/uploadToCloudinary";
import { alertSuccess, alertError, alertConfirm } from "../../../utils/alerts";

const SellProductForm = ({ product = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEdit = Boolean(product && product.id);

  const currentUser = useSelector((state) => state.auth?.user || null);
  const currentUserId = currentUser?.uid ?? null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: product ? product.title : "",
      category: product ? product.category : "",
      price: product ? product.price : "",
      description: product ? product.description : "",
    },
  });

  const fileRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(product ? product.imageUrl : null);
  const watchedFiles = watch("images");

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        category: product.category || "",
        price: product.price || "",
        description: product.description || "",
      });
      setPreviewUrl(product.imageUrl || null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [product, reset]);

  useEffect(() => {
    if (!watchedFiles || watchedFiles.length === 0) return;
    const file = watchedFiles[0];
    const url = URL.createObjectURL(file);
    if (previewUrl && previewUrl !== product?.imageUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
    return () => {
      try { URL.revokeObjectURL(url); } catch (e) { }
    };
  }, [watchedFiles, product, previewUrl]);

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-exza-light border border-black/10 text-exza-dark " +
    "focus:outline-none focus:ring-2 focus:ring-exza-purple focus:border-exza-purple transition";

  const errorClasses = "text-sm text-red-600 mt-1";

  if (!currentUserId) {
    return (
      <section className="py-8">
        <div className="w-full max-w-5xl mx-auto bg-white/40 border border-white/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-2">You must be logged in to list a product</h2>
          <p className="text-sm text-gray-600">Please log in first, then return to post your product.</p>
          <div className="mt-4">
            <a href="/login" className="inline-block px-4 py-2 bg-exza-purple text-white rounded-full">Go to Login</a>
          </div>
        </div>
      </section>
    );
  }

  const onSubmit = async (data) => {
    try {
      const title = data.title ? data.title.trim() : "";
      const category = data.category ? data.category.trim() : "";
      const description = data.description ? data.description.trim() : "";
      const price = data.price ? Number(data.price) : 0;

      const file = data.images && data.images.length > 0 ? data.images[0] : null;
      let imageUrl = product ? product.imageUrl : "/placeholder.jpg";

      if (file) {
        imageUrl = await uploadSingleToCloudinary(file);
      }

      const payload = {
        id: isEdit ? product.id : Date.now(),
        ownerId: isEdit ? (product.ownerId ?? currentUserId) : currentUserId,
        title,
        category: category || "uncategorized",
        price: price || 0,
        description,
        imageUrl: imageUrl || "/placeholder.jpg",
        status: "available",
        updatedAt: new Date().toISOString(),
        createdAt: isEdit ? product.createdAt : new Date().toISOString(),
      };

      if (isEdit) {
        dispatch(updateProduct(payload));
        alertSuccess("Updated", "Product updated successfully.");
      } else {
        dispatch(addProduct(payload));
        alertSuccess("Posted", "Your product is now live.");
      }

      reset();
      if (fileRef.current) fileRef.current.value = "";
      if (previewUrl && previewUrl !== product?.imageUrl) {
        try { URL.revokeObjectURL(previewUrl); } catch (e) { }
        setPreviewUrl(null);
      }

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Failed to post product:", err);
      alertError("Upload failed", err?.message || "Unknown error");
    }
  };

  return (
    <section className="py-8">
      <div className="w-full max-w-5xl mx-auto bg-white/40 border border-white/30 rounded-2xl shadow-elevated backdrop-blur-hard p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-exza-dark">{isEdit ? "Edit Product" : "List Your Product"}</h2>

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
                    validate: (v) => (v && v.trim().length >= 3) || "Title cannot be only spaces",
                  })}
                />
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
                  <label htmlFor="price" className="block text-sm font-semibold mb-2 text-exza-dark">Price: </label>
                  <input type="number" id="price" placeholder="200000000" className={inputClasses}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      validate: (v) => (Number(v) > 0) || "Price must be greater than 0",
                    })} />
                  {errors.price && <p className={errorClasses}>{errors.price.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold mb-2 text-exza-dark">Description</label>
                <textarea id="description" rows="5" placeholder="Describe your product..." className={inputClasses + " resize-y"}
                  {...register("description", {
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                    validate: (v) => (v && v.trim().length >= 10) || "Description cannot be only spaces",
                  })} />
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

                <input ref={fileRef} type="file" id="images" accept="image/*" className="w-full text-sm text-gray-600"
                  {...register("images", {
                    validate: (files) => {
                      if (!files || files.length === 0) return "Image is required !";
                      if (files.length > 1) return "Only one image is allowed";
                      const f = files[0];
                      const maxSize = 5 * 1024 * 1024;
                      if (f.size > maxSize) return "Image must be < 5MB";
                      return true;
                    },
                  })} />
                {errors.images && <p className={errorClasses}>{errors.images.message}</p>}

                <small className="block text-gray-500 mt-2">Only one image is uploaded and used as product thumbnail. Max 5MB.</small>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full mt-auto py-3 rounded-full bg-exza-purple text-white font-semibold shadow-elevated hover:bg-exza-dark transition disabled:opacity-50">
                {isSubmitting ? "Posting..." : isEdit ? "Update Product" : "Post Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellProductForm;
