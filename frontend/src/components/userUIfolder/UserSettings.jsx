import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const navigate = useNavigate();

  // 🌗 States
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" || false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  // 🎨 Toggle Dark Mode
  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    if (newMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }

    alert(`🌗 Dark mode ${newMode ? "enabled" : "disabled"} globally`);
  };

  // 🔔 Notification Preferences
  const handleNotificationChange = (type) => {
    if (type === "email") {
      const newVal = !emailNotifications;
      setEmailNotifications(newVal);
      localStorage.setItem("emailNotifications", newVal);
      alert(`📧 Email notifications ${newVal ? "enabled" : "disabled"}`);
    } else if (type === "sms") {
      const newVal = !smsNotifications;
      setSmsNotifications(newVal);
      localStorage.setItem("smsNotifications", newVal);
      alert(`📱 SMS notifications ${newVal ? "enabled" : "disabled"}`);
    }
  };

  // 🌍 Language Selection
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("language", newLang);

    // 🔥 Dispatch custom event so all components update instantly
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: newLang }));

    alert(`🌍 Language set to ${newLang === "en" ? "English" : "हिन्दी"}`);
  };

  // 🧠 Load from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailNotifications") === "true";
    const storedSms = localStorage.getItem("smsNotifications") === "true";
    const storedLang = localStorage.getItem("language") || "en";

    setEmailNotifications(storedEmail);
    setSmsNotifications(storedSms);
    setLanguage(storedLang);

    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
    }
  }, [darkMode]);

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>⚙️ User Settings</h2>
          <button className="btn btn-success" onClick={() => navigate("/Home")}>
            🏠 Back to Dashboard
          </button>
        </div>

        {/* 🎨 Appearance */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🎨 Appearance (Global)</h5>
            <p className="card-text">Customize the appearance for all your pages.</p>
            <button
              className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
              onClick={handleToggleDarkMode}
            >
              {darkMode ? "🌞 Disable Dark Mode" : "🌙 Enable Dark Mode"}
            </button>
          </div>
        </div>

        {/* 🔔 Notifications */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🔔 Notification Preferences</h5>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={emailNotifications}
                onChange={() => handleNotificationChange("email")}
                id="emailNotifications"
              />
              <label className="form-check-label" htmlFor="emailNotifications">
                📧 Email Notifications
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={smsNotifications}
                onChange={() => handleNotificationChange("sms")}
                id="smsNotifications"
              />
              <label className="form-check-label" htmlFor="smsNotifications">
                📱 SMS Notifications
              </label>
            </div>
          </div>
        </div>

        {/* 🌍 Language */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🌍 Language & Region</h5>
            <p className="card-text mb-2">Select your preferred language:</p>
            <select
              className="form-select w-50"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>

        {/* 📞 Support */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">📞 Support</h5>
            <p className="card-text">
              Need help? Contact our support team at <strong>support@hydrotrim.com</strong> or call <strong>+91-9876543210</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
