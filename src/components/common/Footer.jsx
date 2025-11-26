import React from "react";

const Footer = () => {
  return (
    <>

      <div className="h-24 mt-11"></div>

      <footer
        className="
          bottom-0 left-0 right-0 
          bg-white/40 border-t border-white/30 
          backdrop-blur-soft shadow-category 
          rounded-t-[40px]
          py-6 text-center 
        "
      >
        <div className="text-sm text-exza-dark/80">
          <p className="font-semibold text-exza-dark mb-1">
            &copy; 2024 EXZA. Thank you for viewing this UI recreation.
          </p>
          <p className="font-medium text-exza-purple">Designed By Mubashir</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
