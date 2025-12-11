import React, { useState, useEffect } from "react";
import "../styles/AppPromo.css";

const AppPromo = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [hiding, setHiding] = useState(false);

  // Auto-hide banner after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setHiding(true);
    setTimeout(() => setShowBanner(false), 500); // match animation duration
  };

  if (!showBanner) return null;

  return (
    <div className={`app-promo-footer ${hiding ? "hide" : ""}`}>
      <span>Download our app for better experience!</span>
      <div>
        <a
          href="https://github.com/joey-crtl/DTTMSys-Mobile-app/releases/download/dttmsys.v1/Doctor.Travel.Tours.apk"
          className="download-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
        <button
          className="close-btn"
          onClick={handleClose}
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AppPromo;
