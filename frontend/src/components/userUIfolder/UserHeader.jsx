import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import {
  Phone,
  Calendar,
  AlertCircle,
  Search,
  User2,
  Microscope,
  LogOut,
  Settings,
} from "lucide-react";
import { translations } from "./translations";

export default function UserHeader() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [activeSection, setActiveSection] = useState(null);
  const t = (key) => translations[language]?.[key] || key;

  // 🌍 Listen to language changes
  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail || localStorage.getItem("language") || "en");
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () => window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // ✅ Navigation Links
  const navLinks = [
    "speciality",
    "aboutUs",
    "internationalPatients",
    "blogs",
    "news",
    "careers",
    "contactUs",
  ];

  // ✅ Section content (what to show when clicked)
  const sectionContent = {
    aboutUs:
      "HYDROTRIM is dedicated to providing world-class healthcare with advanced technology and compassionate care.",
    internationalPatients:
      "We offer complete support for international patients — travel, stay, translators, and treatment packages.",
    blogs:
      "Read our latest blogs about health, fitness, and wellness written by our top doctors and specialists.",
    news:
      "Stay informed about our hospital news, achievements, events, and press releases.",
    careers:
      "Join our growing team of healthcare professionals and make a difference in people’s lives.",
    contactUs:
      "You can reach us at +91-8294584119 or email at Princekumarkha2005@gmail.com. We’re here to help you.",
  };

  // ✅ Profile Dropdown
  const profileItems = [
    { key: "myProfile", icon: <User2 size={16} />, action: () => navigate("/profile") },
    { key: "settings", icon: <Settings size={16} />, action: () => navigate("/settings") },
  ];

  // ✅ Quick Actions
  const quickActions = [
    { key: "bookAppointment", icon: <Calendar size={18} />, href: "#appointment" },
    { key: "requestCallback", icon: <Phone size={18} />, href: "#callback" },
    { key: "emergency", icon: <AlertCircle size={18} />, href: "#emergency" },
    { key: "searchByDepartment", icon: <Search size={18} />, href: "#department" },
    { key: "quickSearch", icon: <User2 size={18} />, href: "#quicksearch" },
    { key: "labResults", icon: <Microscope size={18} />, href: "#lab" },
  ];

  return (
    <>
      <header className="shadow-sm border-bottom bg-white">
        <div className="container-fluid d-flex align-items-center justify-content-between py-2">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.quRJLvZLb_hg5VmTrNYh3QHaHQ?pid=Api&P=0&h=60"
              alt="Logo"
              className="rounded-circle"
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <h5 className="mb-0 fw-bold">HYDROTRIM</h5>
              <small className="text-success">Trust of Generations</small>
            </div>
          </div>

          {/* Navigation */}
          <nav className="d-flex align-items-center gap-4 fw-medium">
            {navLinks.map((key) => (
              <button
                key={key}
                className={`btn btn-link text-decoration-none ${
                  activeSection === key ? "text-primary fw-bold" : "text-dark"
                }`}
                onClick={() =>
                  setActiveSection(activeSection === key ? null : key)
                }
              >
                {t(key)}
              </button>
            ))}
          </nav>

          {/* Profile */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User2 size={18} /> {t("profile")}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
              {profileItems.map((item) => (
                <li key={item.key}>
                  <button className="dropdown-item" onClick={item.action}>
                    {item.icon} {t(item.key)}
                  </button>
                </li>
              ))}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> {t("logout")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-light border-top py-2">
          <div className="container-fluid d-flex align-items-center gap-4 justify-content-center flex-wrap">
            {quickActions.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="d-flex align-items-center gap-2 text-decoration-none text-dark"
              >
                {item.icon} {t(item.key)}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* 🔹 Dynamic Section Display */}
      {activeSection && (
        <div className="container my-4 p-4 border rounded shadow-sm bg-white">
          <h4 className="text-primary text-capitalize mb-2">{t(activeSection)}</h4>
          <p className="text-muted">{sectionContent[activeSection]}</p>
        </div>
      )}
    </>
  );
}
