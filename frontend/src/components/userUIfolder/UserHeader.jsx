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

  // 🌐 Language state
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
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
  const navLinks = ["speciality","aboutUs","internationalPatients","blogs","news","careers","contactUs"];
  // ✅ Profile Dropdown
  const profileItems = [
    { key: "myProfile", icon: <User2 size={16} />, action: () => navigate("/profile") },
    { key: "settings", icon: <Settings size={16} />, action: () => navigate("/settings") },
  ];
  // ✅ Quick Actions
  const quickActions = [
    { key: "bookAppointment", icon: <Calendar size={18} />, href:"#appointment" },
    { key: "requestCallback", icon: <Phone size={18} />, href:"#callback" },
    { key: "emergency", icon: <AlertCircle size={18} />, href:"#emergency" },
    { key: "searchByDepartment", icon: <Search size={18} />, href:"#department" },
    { key: "quickSearch", icon: <User2 size={18} />, href:"#quicksearch" },
    { key: "labResults", icon: <Microscope size={18} />, href:"#lab" },
  ];

  return (
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
            <a key={key} href={`#${key}`} className="text-dark text-decoration-none">
              {t(key)}
            </a>
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
            <li><hr className="dropdown-divider" /></li>
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
  );
}













// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import axios from "axios";
// import {
//   Phone,
//   Calendar,
//   AlertCircle,
//   Search,
//   User2,
//   Microscope,
//   LogOut,
//   Settings,
// } from "lucide-react";

// export default function UserHeader() {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:4000/api/auth/logout", // 🔹 adjust backend URL
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout error:", err);
//       localStorage.removeItem("token");
//       navigate("/");
//     }
//   };

//   return (
//     <header className="shadow-sm border-bottom bg-white">
//       {/* 🔹 Top Navbar */}
//       <div className="container-fluid d-flex align-items-center justify-content-between py-2">
//         {/* Logo + Title */}
//         <div className="d-flex align-items-center gap-2">
//           <img
//             src="https://tse4.mm.bing.net/th/id/OIP.quRJLvZLb_hg5VmTrNYh3QHaHQ?pid=Api&P=0&h=60"
//             alt="Logo"
//             className="rounded-circle"
//             style={{ width: "50px", height: "50px" }}
//           />
//           <div>
//             <h5 className="mb-0 fw-bold">HYDROTRIM</h5>
//             <small className="text-success">Trust of Generations</small>
//           </div>
//         </div>

//         {/* Nav Links */}
//         <nav className="d-flex align-items-center gap-4 fw-medium">
//           <a href="#speciality" className="text-dark text-decoration-none">Speciality</a>
//           <a href="#about" className="text-dark text-decoration-none">About Us</a>
//           <a href="#patients" className="text-dark text-decoration-none">International Patients</a>
//           <a href="#blogs" className="text-dark text-decoration-none">Blogs</a>
//           <a href="#news" className="text-dark text-decoration-none">News</a>
//           <a href="#careers" className="text-dark text-decoration-none">Careers</a>
//           <a href="#contact" className="text-dark text-decoration-none">Contact Us</a>
//         </nav>

//         {/* User Profile Dropdown */}
//         <div className="dropdown">
//           <button
//             className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
//             type="button"
//             id="userMenu"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <User2 size={18} /> Profile
//           </button>
//           <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
//             <li>
//               <button className="dropdown-item" onClick={() => navigate("/profile")}>
//                 <User2 size={16} /> My Profile
//               </button>
//             </li>
//             <li>
//               <button className="dropdown-item" onClick={() => navigate("/settings")}>
//                 <Settings size={16} /> Settings
//               </button>
//             </li>
//             <li><hr className="dropdown-divider" /></li>
//             <li>
//               <button
//                 className="dropdown-item text-danger d-flex align-items-center gap-2"
//                 onClick={handleLogout}
//               >
//                 <LogOut size={16} /> Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* 🔹 Quick Actions Row */}
//       <div className="bg-light border-top py-2">
//         <div className="container-fluid d-flex align-items-center gap-4 justify-content-center flex-wrap">
//           <a href="#appointment" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
//             <Calendar size={18} /> Book Appointment
//           </a>
//           <a href="#callback" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
//             <Phone size={18} /> Request a Callback
//           </a>
//           <a href="#emergency" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
//             <AlertCircle size={18} /> Emergency
//           </a>
//           <a href="#department" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
//             <Search size={18} /> Search by Department
//           </a>
//           <a href="#quicksearch" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
//             <User2 size={18} /> Quick Search
//           </a>
//           <a href="#lab" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
//             <Microscope size={18} /> Lab Results
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// }
