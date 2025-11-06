// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [showReports, setShowReports] = useState(false);
//   const [selectedDisease, setSelectedDisease] = useState("");

//   // Disease data states
//   const [choleraData, setCholeraData] = useState([]);
//   const [typhoidData, setTyphoidData] = useState([]);
//   const [dengueData, setDengueData] = useState([]);

//   // Notification states
//   const [emailNotifications, setEmailNotifications] = useState(false);
//   const [smsNotifications, setSmsNotifications] = useState(false);

//   // Language state
//   const [language, setLanguage] = useState("en");

//   const translations = {
//     en: {
//       adminPanel: "⚡ Admin Panel",
//       dashboard: "Dashboard",
//       reports: "Reports",
//       sos: "SOS Alerts",
//       users: "Users",
//       settings: "Settings",
//       update: "Update Information",
//       profile: "Profile",
//       logout: "Logout",
//       welcome: "Welcome",
//       diseaseData: "Data",
//       totalUsers: "Total Users",
//       activeReports: "Active Reports",
//       recentActivity: "Recent Activity",
//       notificationStatus: "Notification Status",
//       email: "Email Notifications",
//       sms: "SMS Notifications",
//       dengue: "Dengue",
//       typhoid: "Typhoid",
//       cholera: "Cholera",
//       casesReported: "Cases reported",
//       activeCases: "Active cases",
//       recovered: "Recovered",
//       deaths: "Deaths",
//       newUsers: "new users registered",
//       newAlerts: "new SOS alerts triggered",
//       newReports: "reports submitted today",
//       enabled: "Enabled ✅",
//       disabled: "Disabled ❌",
//       showingReports: "Showing reports and statistics related to",
//     },
//     hi: {
//       adminPanel: "⚡ व्यवस्थापक पैनल",
//       dashboard: "डैशबोर्ड",
//       reports: "रिपोर्ट्स",
//       sos: "आपातकालीन अलर्ट",
//       users: "उपयोगकर्ता",
//       settings: "सेटिंग्स",
//       update: "जानकारी अपडेट करें",
//       profile: "प्रोफ़ाइल",
//       logout: "लॉगआउट",
//       welcome: "स्वागत है",
//       diseaseData: "डेटा",
//       totalUsers: "कुल उपयोगकर्ता",
//       activeReports: "सक्रिय रिपोर्ट",
//       recentActivity: "हाल की गतिविधि",
//       notificationStatus: "सूचना स्थिति",
//       email: "ईमेल सूचनाएं",
//       sms: "एसएमएस सूचनाएं",
//       dengue: "डेंगू",
//       typhoid: "टाइफॉयड",
//       cholera: "हैजा",
//       casesReported: "कुल मामले",
//       activeCases: "सक्रिय मामले",
//       recovered: "ठीक हुए",
//       deaths: "मृत्यु",
//       newUsers: "नए उपयोगकर्ता पंजीकृत हुए",
//       newAlerts: "नए SOS अलर्ट ट्रिगर किए गए",
//       newReports: "रिपोर्टें आज जमा की गईं",
//       enabled: "सक्रिय ✅",
//       disabled: "निष्क्रिय ❌",
//       showingReports: "संबंधित रिपोर्ट और आँकड़े दिखाए जा रहे हैं",
//     },
//   };

//   // Load preferences
//   useEffect(() => {
//     setEmailNotifications(localStorage.getItem("emailNotifications") === "true");
//     setSmsNotifications(localStorage.getItem("smsNotifications") === "true");
//     setLanguage(localStorage.getItem("language") || "en");

//     if (localStorage.getItem("darkMode") === "true") {
//       document.body.classList.add("bg-dark", "text-light");
//     } else {
//       document.body.classList.remove("bg-dark", "text-light");
//     }
//   }, []);

//   // Fetch disease data based on selection
//   useEffect(() => {
//     if (selectedDisease === "cholera") {
//       axios
//         .get("http://localhost:4000/api/cholera/all")
//         .then((res) => setCholeraData(res.data))
//         .catch((err) => console.error("Error fetching cholera data:", err));
//     } else if (selectedDisease === "typhoid") {
//       axios
//         .get("http://localhost:4000/api/typhoid")
//         .then((res) => setTyphoidData(res.data))
//         .catch((err) => console.error("Error fetching typhoid data:", err));
//     } else if (selectedDisease === "dengue") {
//       axios
//         .get("http://localhost:4000/api/dengue")
//         .then((res) => setDengueData(res.data))
//         .catch((err) => console.error("Error fetching dengue data:", err));
//     }
//   }, [selectedDisease]);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:4000/api/auth/logout",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout error:", err);
//       localStorage.removeItem("token");
//       navigate("/");
//     }
//   };

//   const renderTable = (data, title) => (
//     <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
//       <div className="card-body">
//         <h4 className="fw-bold">{title} Data</h4>
//         {data.length === 0 ? (
//           <p>No records found.</p>
//         ) : (
//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>State/UT</th>
//                 <th>2021</th>
//                 <th>2022</th>
//                 <th>2023</th>
//                 <th>2024</th>
//                 <th>2025 (Prov.)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row) => (
//                 <tr key={row._id}>
//                   <td>{row.s__no}</td>
//                   <td>{row.state_u_t_}</td>
//                   <td>{row._2021}</td>
//                   <td>{row._2022}</td>
//                   <td>{row._2023}</td>
//                   <td>{row._2024}</td>
//                   <td>{row._2025__prov__}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className={`d-flex min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "bg-dark text-light" : "bg-light"}`}>
//       {/* Sidebar */}
//       <div style={{ width: "250px" }} className="d-flex flex-column">
//         <div className="p-3 text-center fw-bold fs-3 text-primary">💠 HydroTrim</div>
//         <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
//           <h4 className="mb-4">{translations[language].adminPanel}</h4>
//           <Link to="/admin/dashboard" className="btn btn-dark text-start mb-2">
//             📊 {translations[language].dashboard}
//           </Link>

//           <div className="mb-2">
//             <button
//               className="btn btn-dark w-100 text-start"
//               onClick={() => setShowReports(!showReports)}
//             >
//               📑 {translations[language].reports} ▾
//             </button>
//             {showReports && (
//               <div className="ms-3 mt-2 d-flex flex-column">
//                 <button className="btn btn-outline-light text-start mb-1" onClick={() => setSelectedDisease("dengue")}>
//                   {translations[language].dengue}
//                 </button>
//                 <button className="btn btn-outline-light text-start mb-1" onClick={() => setSelectedDisease("typhoid")}>
//                   {translations[language].typhoid}
//                 </button>
//                 <button className="btn btn-outline-light text-start" onClick={() => setSelectedDisease("cholera")}>
//                   {translations[language].cholera}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* <Link to="/admin/sos" className="btn btn-dark text-start mb-2">🚨 {translations[language].sos}</Link> */}
//           <Link to="/admin/settings" className="btn btn-dark text-start mb-2">⚙️ {translations[language].settings}</Link>
//           {/* <Link to="/admin/update" className="btn btn-dark text-start mb-2">✏️ {translations[language].update}</Link> */}
//         </aside>
//       </div>

//       {/* Main */}
//       <main className="flex-grow-1 p-4">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div>
//             <h2>{translations[language].dashboard}</h2>
//             <p>{translations[language].welcome} <strong>Admin 🚀</strong></p>
//           </div>
//           <div>
//             <button className="btn btn-outline-primary me-2" onClick={() => navigate("/admin/profile")}>
//               👤 {translations[language].profile}
//             </button>
//             <button className="btn btn-outline-danger" onClick={handleLogout}>
//               🔒 {translations[language].logout}
//             </button>
//           </div>
//         </div>

//         {selectedDisease === "cholera" && renderTable(choleraData, "📌 Cholera")}
//         {selectedDisease === "typhoid" && renderTable(typhoidData, "🧫 Typhoid")}
//         {selectedDisease === "dengue" && renderTable(dengueData, "🦠 Dengue")}

//         {!selectedDisease && (
//           <>
//             <div className="row g-4 mb-4">
//               {[translations[language].totalUsers, translations[language].activeReports, translations[language].sos].map((title, i) => (
//                 <div className="col-md-4" key={i}>
//                   <div className={`card text-center shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
//                     <div className="card-body">
//                       <h5 className="text-muted">{title}</h5>
//                       <p className="fs-3 fw-bold">{i === 0 ? 150 : i === 1 ? 12 : 3}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("");
  const [activePage, setActivePage] = useState("dashboard");

  const [choleraData, setCholeraData] = useState([]);
  const [typhoidData, setTyphoidData] = useState([]);
  const [dengueData, setDengueData] = useState([]);

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
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
      totalUsers: "Total Users",
      activeReports: "Active Reports",
      recentActivity: "Recent Activity",
      email: "Email Notifications",
      sms: "SMS Notifications",
      dengue: "Dengue",
      typhoid: "Typhoid",
      cholera: "Cholera",
      speciality: "Speciality",
      about: "About Us",
      international: "International Parties",
      blogs: "Blogs",
      news: "News",
      contact: "Contact Us",
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
      totalUsers: "कुल उपयोगकर्ता",
      activeReports: "सक्रिय रिपोर्ट",
      recentActivity: "हाल की गतिविधि",
      email: "ईमेल सूचनाएं",
      sms: "एसएमएस सूचनाएं",
      dengue: "डेंगू",
      typhoid: "टाइफॉयड",
      cholera: "हैजा",
      speciality: "विशेषता",
      about: "हमारे बारे में",
      international: "अंतरराष्ट्रीय साझेदार",
      blogs: "ब्लॉग्स",
      news: "समाचार",
      contact: "संपर्क करें",
    },
  };

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
    <div
      className={`card shadow-sm mb-4 ${
        localStorage.getItem("darkMode") === "true"
          ? "bg-secondary text-light"
          : ""
      }`}
    >
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

  // 📊 Dummy sample data
  const diseaseStats = [
    { year: 2021, cholera: 2400, typhoid: 1398, dengue: 980 },
    { year: 2022, cholera: 2210, typhoid: 980, dengue: 1228 },
    { year: 2023, cholera: 2290, typhoid: 1300, dengue: 1700 },
    { year: 2024, cholera: 2000, typhoid: 1108, dengue: 2100 },
    { year: 2025, cholera: 1890, typhoid: 1600, dengue: 2500 },
  ];

  const totalCases = {
    cholera: 9800,
    typhoid: 6390,
    dengue: 8500,
  };

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  // 🧠 Main content switch
  const renderPageContent = () => {
    // hide charts when reports are opened or disease is selected
    const showCharts =
      activePage === "dashboard" && selectedDisease === "";

    switch (activePage) {
      case "speciality":
        return <div><h2>🌐 {translations[language].speciality}</h2><p>Our platform specializes in real-time monitoring and analysis of water-borne diseases to support effective decision-making and public awareness. By combining health data, environmental insights, and advanced analytics, it provides a comprehensive view of outbreak trends and affected regions. Administrators can track cases, manage reports, and generate actionable insights with ease. The system’s intuitive design ensures quick access to crucial information, while data visualization tools help identify emerging patterns. This focused approach enables timely interventions, resource allocation, and prevention strategies—making our solution a reliable hub for managing water-borne disease surveillance efficiently and intelligently.</p></div>;
      case "about":
        return <div><h2>ℹ️ {translations[language].about}</h2><p>An innovative, affordable digital platform designed to fight water-borne diseases.

HydroTrim is an innovative, affordable digital platform designed to fight water-borne diseases in rural and semi-urban communities. Our mission is to equip health workers with simple yet powerful mobile and web applications, timely detection, and immediate intervention.

With the support of smart analytics, HydroTrim not only tracks and flags potential outbreaks, but also delivers instant alerts and intuitive hotspot visualizations, empowering communities and authorities to respond faster and smarter.

Our ultimate goal is clear: reduce the spread of water-borne diseases, save lives, and build resilient, healthier communities through real-time, technology-driven health monitoring.</p></div>;
      case "international":
        return <div><h2>🌍 {translations[language].international}</h2><p>We collaborate with international organizations, research institutions, and health agencies to strengthen global efforts in combating water-borne diseases. Through these partnerships, we exchange data, expertise, and innovative solutions that help improve disease detection, prevention, and control worldwide. Our platform supports cross-border data sharing and comparative analysis, enabling a unified response to emerging health threats. By aligning with global standards set by the WHO and other international bodies, we ensure accuracy, transparency, and reliability in every report. These collaborations promote collective learning, faster response mechanisms, and a shared commitment to safeguarding public health across nations.</p></div>;
      case "blogs":
        return <div><h2>📰 {translations[language].blogs}</h2><p>Our blog section serves as an informative hub where experts, health professionals, and community members share insights on water-borne diseases, sanitation, and preventive healthcare. Each article is designed to raise awareness, highlight real-life case studies, and showcase the latest advancements in water safety and disease management. Readers can explore topics such as early detection, sustainable clean-water initiatives, and success stories from affected regions. The goal is to educate and inspire collective action toward healthier communities. Through our blogs, we bridge the gap between science and society, empowering individuals to make informed choices for a safer tomorrow.</p></div>;
      case "news":
        return <div><h2>🗞️ {translations[language].news}</h2><p>Stay updated with the latest developments, alerts, and research in the field of water-borne diseases through our news section. We bring you verified updates from trusted global health organizations, government reports, and ongoing environmental studies. From outbreak notifications and preventive guidelines to technological innovations in water purification, our news hub ensures you’re always informed. We also highlight local and international initiatives working to improve access to clean water and sanitation. Whether it’s a new vaccine breakthrough or a public health campaign, our goal is to deliver timely, accurate, and impactful news that supports awareness and action worldwide.</p></div>;
      case "contact":
        return <div><h2>📞 {translations[language].contact}</h2><p>For inquiries or feedback, contact us at: <strong>support@hydrotrim.org</strong></p></div>;

      default:
        return (
          <>
            {/* Summary Cards */}
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

            {/* Charts visible only when no disease selected */}
            {showCharts && (
              <div className="row">
                <div className="col-md-8 mb-4">
                  <div className={`card shadow-sm p-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
                    <h5 className="fw-bold mb-3">📈 Water-Borne Disease Trends (2021-2025)</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={diseaseStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cholera" stroke="#0088FE" name="Cholera" />
                        <Line type="monotone" dataKey="typhoid" stroke="#00C49F" name="Typhoid" />
                        <Line type="monotone" dataKey="dengue" stroke="#FF8042" name="Dengue" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className={`card shadow-sm p-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
                    <h5 className="fw-bold mb-3">🦠 Active Case Distribution (2025)</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Cholera", value: totalCases.cholera },
                            { name: "Typhoid", value: totalCases.typhoid },
                            { name: "Dengue", value: totalCases.dengue },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          label
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={index} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Table when any disease is selected */}
            {selectedDisease === "cholera" && renderTable(choleraData, "📌 Cholera")}
            {selectedDisease === "typhoid" && renderTable(typhoidData, "🧫 Typhoid")}
            {selectedDisease === "dengue" && renderTable(dengueData, "🦠 Dengue")}
          </>
        );
    }
  };

  return (
    <div className={`d-flex min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "bg-dark text-light" : "bg-light"}`}>
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="d-flex flex-column">
        <div className="p-3 text-center fw-bold fs-3 text-primary">💠 HydroTrim</div>
        <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
          <h4 className="mb-4">{translations[language].adminPanel}</h4>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("dashboard"); setSelectedDisease(""); }}>
            📊 {translations[language].dashboard}
          </button>

          <div className="mb-2">
            <button className="btn btn-dark w-100 text-start" onClick={() => { setShowReports(!showReports); setActivePage("dashboard"); }}>
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

          {/* Other pages */}
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("speciality"); setSelectedDisease(""); }}>🧩 {translations[language].speciality}</button>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("about"); setSelectedDisease(""); }}>ℹ️ {translations[language].about}</button>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("international"); setSelectedDisease(""); }}>🌍 {translations[language].international}</button>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("blogs"); setSelectedDisease(""); }}>📰 {translations[language].blogs}</button>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("news"); setSelectedDisease(""); }}>🗞️ {translations[language].news}</button>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("contact"); setSelectedDisease(""); }}>📞 {translations[language].contact}</button>

          <Link to="/admin/settings" className="btn btn-dark text-start mb-2">⚙️ {translations[language].settings}</Link>
        </aside>
      </div>

      {/* Main content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>{translations[language][activePage] || translations[language].dashboard}</h2>
            <p>{translations[language].welcome} <strong>Admin 🚀</strong></p>
          </div>
          <div>
            <button className="btn btn-outline-primary me-2" onClick={() => navigate("/admin/profile")}>👤 {translations[language].profile}</button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>🔒 {translations[language].logout}</button>
          </div>
        </div>

        {renderPageContent()}
      </main>
    </div>
  );
}

