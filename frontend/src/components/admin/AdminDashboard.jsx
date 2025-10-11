import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("");

  // Disease data states
  const [choleraData, setCholeraData] = useState([]);
  const [typhoidData, setTyphoidData] = useState([]);
  const [dengueData, setDengueData] = useState([]);

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Language state
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      adminPanel: "⚡ Admin Panel",
      dashboard: "Dashboard",
      reports: "Reports",
      sos: "SOS Alerts",
      users: "Users",
      settings: "Settings",
      update: "Update Information",
      profile: "Profile",
      logout: "Logout",
      welcome: "Welcome",
      diseaseData: "Data",
      totalUsers: "Total Users",
      activeReports: "Active Reports",
      recentActivity: "Recent Activity",
      notificationStatus: "Notification Status",
      email: "Email Notifications",
      sms: "SMS Notifications",
      dengue: "Dengue",
      typhoid: "Typhoid",
      cholera: "Cholera",
      casesReported: "Cases reported",
      activeCases: "Active cases",
      recovered: "Recovered",
      deaths: "Deaths",
      newUsers: "new users registered",
      newAlerts: "new SOS alerts triggered",
      newReports: "reports submitted today",
      enabled: "Enabled ✅",
      disabled: "Disabled ❌",
      showingReports: "Showing reports and statistics related to",
    },
    hi: {
      adminPanel: "⚡ व्यवस्थापक पैनल",
      dashboard: "डैशबोर्ड",
      reports: "रिपोर्ट्स",
      sos: "आपातकालीन अलर्ट",
      users: "उपयोगकर्ता",
      settings: "सेटिंग्स",
      update: "जानकारी अपडेट करें",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
      welcome: "स्वागत है",
      diseaseData: "डेटा",
      totalUsers: "कुल उपयोगकर्ता",
      activeReports: "सक्रिय रिपोर्ट",
      recentActivity: "हाल की गतिविधि",
      notificationStatus: "सूचना स्थिति",
      email: "ईमेल सूचनाएं",
      sms: "एसएमएस सूचनाएं",
      dengue: "डेंगू",
      typhoid: "टाइफॉयड",
      cholera: "हैजा",
      casesReported: "कुल मामले",
      activeCases: "सक्रिय मामले",
      recovered: "ठीक हुए",
      deaths: "मृत्यु",
      newUsers: "नए उपयोगकर्ता पंजीकृत हुए",
      newAlerts: "नए SOS अलर्ट ट्रिगर किए गए",
      newReports: "रिपोर्टें आज जमा की गईं",
      enabled: "सक्रिय ✅",
      disabled: "निष्क्रिय ❌",
      showingReports: "संबंधित रिपोर्ट और आँकड़े दिखाए जा रहे हैं",
    },
  };

  // Load preferences
  useEffect(() => {
    setEmailNotifications(localStorage.getItem("emailNotifications") === "true");
    setSmsNotifications(localStorage.getItem("smsNotifications") === "true");
    setLanguage(localStorage.getItem("language") || "en");

    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, []);

  // Fetch disease data based on selection
  useEffect(() => {
    if (selectedDisease === "cholera") {
      axios
        .get("http://localhost:4000/api/cholera/all")
        .then((res) => setCholeraData(res.data))
        .catch((err) => console.error("Error fetching cholera data:", err));
    } else if (selectedDisease === "typhoid") {
      axios
        .get("http://localhost:4000/api/typhoid")
        .then((res) => setTyphoidData(res.data))
        .catch((err) => console.error("Error fetching typhoid data:", err));
    } else if (selectedDisease === "dengue") {
      axios
        .get("http://localhost:4000/api/dengue")
        .then((res) => setDengueData(res.data))
        .catch((err) => console.error("Error fetching dengue data:", err));
    }
  }, [selectedDisease]);

  // Logout
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
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const renderTable = (data, title) => (
    <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
      <div className="card-body">
        <h4 className="fw-bold">{title} Data</h4>
        {data.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>State/UT</th>
                <th>2021</th>
                <th>2022</th>
                <th>2023</th>
                <th>2024</th>
                <th>2025 (Prov.)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id}>
                  <td>{row.s__no}</td>
                  <td>{row.state_u_t_}</td>
                  <td>{row._2021}</td>
                  <td>{row._2022}</td>
                  <td>{row._2023}</td>
                  <td>{row._2024}</td>
                  <td>{row._2025__prov__}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
    <div className={`d-flex min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "bg-dark text-light" : "bg-light"}`}>
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="d-flex flex-column">
        <div className="p-3 text-center fw-bold fs-3 text-primary">💠 HydroTrim</div>
        <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
          <h4 className="mb-4">{translations[language].adminPanel}</h4>
          <Link to="/admin/dashboard" className="btn btn-dark text-start mb-2">
            📊 {translations[language].dashboard}
          </Link>

          <div className="mb-2">
            <button
              className="btn btn-dark w-100 text-start"
              onClick={() => setShowReports(!showReports)}
            >
              📑 {translations[language].reports} ▾
            </button>
            {showReports && (
              <div className="ms-3 mt-2 d-flex flex-column">
                <button className="btn btn-outline-light text-start mb-1" onClick={() => setSelectedDisease("dengue")}>
                  {translations[language].dengue}
                </button>
                <button className="btn btn-outline-light text-start mb-1" onClick={() => setSelectedDisease("typhoid")}>
                  {translations[language].typhoid}
                </button>
                <button className="btn btn-outline-light text-start" onClick={() => setSelectedDisease("cholera")}>
                  {translations[language].cholera}
                </button>
              </div>
            )}
          </div>

          <Link to="/admin/sos" className="btn btn-dark text-start mb-2">🚨 {translations[language].sos}</Link>
          <Link to="/admin/settings" className="btn btn-dark text-start mb-2">⚙️ {translations[language].settings}</Link>
          <Link to="/admin/update" className="btn btn-dark text-start mb-2">✏️ {translations[language].update}</Link>
        </aside>
      </div>

      {/* Main */}
      <main className="flex-grow-1 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>{translations[language].dashboard}</h2>
            <p>{translations[language].welcome} <strong>Admin 🚀</strong></p>
          </div>
          <div>
            <button className="btn btn-outline-primary me-2" onClick={() => navigate("/admin/profile")}>
              👤 {translations[language].profile}
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              🔒 {translations[language].logout}
            </button>
          </div>
        </div>

        {selectedDisease === "cholera" && renderTable(choleraData, "📌 Cholera")}
        {selectedDisease === "typhoid" && renderTable(typhoidData, "🧫 Typhoid")}
        {selectedDisease === "dengue" && renderTable(dengueData, "🦠 Dengue")}

        {!selectedDisease && (
          <>
            <div className="row g-4 mb-4">
              {[translations[language].totalUsers, translations[language].activeReports, translations[language].sos].map((title, i) => (
                <div className="col-md-4" key={i}>
                  <div className={`card text-center shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
                    <div className="card-body">
                      <h5 className="text-muted">{title}</h5>
                      <p className="fs-3 fw-bold">{i === 0 ? 150 : i === 1 ? 12 : 3}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
