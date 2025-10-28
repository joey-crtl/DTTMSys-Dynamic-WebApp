import React, { useState, useEffect } from "react";
import "../styles/AppPromo.css";

const AppPromo = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Auto-show popup after page load
  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => setShowPopup(false), 8000); // auto-hide
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Popup Modal */}
      {showPopup && (
        <div className={`app-promo-popup ${showPopup ? "show" : ""}`}>
          <div className="popup-content">
            <span>Download our app for exclusive deals!</span>
            <a
              href="https://expo.dev/artifacts/eas/pU8x2t3478LY2uaCn5oHrj.apk"
              className="download-btn"
            >
              Download
            </a>
            <button
              className="close-btn"
              aria-label="Close popup"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppPromo;
