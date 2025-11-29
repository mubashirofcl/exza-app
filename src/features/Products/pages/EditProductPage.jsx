
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SellProductForm from "../components/SellProductForm";

const EditProductPage = () => {
    const { id } = useParams();
    const product = useSelector((state) =>
        state.products.listings.find((p) => String(p.id) === String(id))
    );

    if (!product) {
        return <Navigate to="/" replace />;
    }

    return <SellProductForm product={product} />;
};

export default EditProductPage;
