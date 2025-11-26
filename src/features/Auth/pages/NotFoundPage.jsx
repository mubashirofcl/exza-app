import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4">

            <div className="glass-card p-10 rounded-2xl max-w-md w-full">

                <h1 className="text-7xl font-extrabold text-exza-purple drop-shadow-md">
                    404
                </h1>

                <p className="text-exza-dark text-xl font-semibold mt-3">
                    Page Not Found
                </p>

                <p className="text-gray-600 mt-2 text-sm">
                    Looks like the page you're looking for doesn’t exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-block bg-exza-purple text-white px-6 py-3 rounded-full 
                     font-semibold shadow-elevated hover:opacity-90 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
