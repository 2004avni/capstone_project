// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Home";
// import AdminProfile from "./components/admin/AdminProfile";

// import Settings from "./components/admin/Settings";

// import AdminLogin from "./components/admin/AdminLogin";
// import AdminSignup from "./components/admin/AdminSignup";
// import AdminDashboard from "./components/admin/AdminDashboard";

// function App1() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("token")) setIsAuthenticated(true);
//     if (localStorage.getItem("adminToken")) setIsAdminAuthenticated(true);
//   }, []);

//   return (
//     <Routes>
//       {/* User routes */}
//       <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

//       {/* Admin routes */}
//       <Route path="/admin/signup" element={<AdminSignup />} />
//       <Route path="/admin/login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
//       <Route path="/admin/dashboard" element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
//       <Route path="/admin/settings" element={<Settings />} />

//       <Route path="/admin/profile" element={<AdminProfile />} />
//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App1;



// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// // 🔹 User components
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Home";
// import UserHeader from "./components/userUIfolder/UserHeader";
// import UserProfile from "./components/userUIfolder/UserProfile";

// // 🔹 Admin components
// import AdminProfile from "./components/admin/AdminProfile";
// import Settings from "./components/admin/Settings";
// import AdminLogin from "./components/admin/AdminLogin";
// import AdminSignup from "./components/admin/AdminSignup";
// import AdminDashboard from "./components/admin/AdminDashboard";

// function App1() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check stored tokens on load
//     if (localStorage.getItem("token")) setIsAuthenticated(true);
//     if (localStorage.getItem("adminToken")) setIsAdminAuthenticated(true);
//   }, []);

//   return (
//     <Routes>
//       {/* ------------------ USER ROUTES ------------------ */}
//       <Route
//         path="/login"
//         element={<Login setIsAuthenticated={setIsAuthenticated} />}
//       />
//       <Route path="/signup" element={<Signup />} />

//       {/* ✅ Protected User Routes (Header shown here only) */}
//       <Route
//         path="/home"
//         element={
//           isAuthenticated ? (
//             <>
//               <UserHeader />
//               <Home />
//             </>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           isAuthenticated ? (
//             <>
//               <UserHeader />
//               <UserProfile />
//             </>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       {/* ------------------ ADMIN ROUTES ------------------ */}
//       <Route path="/admin/signup" element={<AdminSignup />} />
//       <Route
//         path="/admin/login"
//         element={
//           <AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />
//         }
//       />
//       <Route
//         path="/admin/dashboard"
//         element={
//           isAdminAuthenticated ? (
//             <AdminDashboard />
//           ) : (
//             <Navigate to="/admin/login" />
//           )
//         }
//       />
//       <Route
//         path="/admin/settings"
//         element={
//           isAdminAuthenticated ? <Settings /> : <Navigate to="/admin/login" />
//         }
//       />
//       <Route
//         path="/admin/profile"
//         element={
//           isAdminAuthenticated ? (
//             <AdminProfile />
//           ) : (
//             <Navigate to="/admin/login" />
//           )
//         }
//       />

//       {/* ------------------ FALLBACK ------------------ */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App1;




import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 🔹 User components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import UserHeader from "./components/userUIfolder/UserHeader";
import UserProfile from "./components/userUIfolder/UserProfile";
import UserSettings from "./components/userUIfolder/UserSettings"; // ✅ Added UserSettings import

// 🔹 Admin components
import AdminProfile from "./components/admin/AdminProfile";
import Settings from "./components/admin/Settings";
import AdminLogin from "./components/admin/AdminLogin";
import AdminSignup from "./components/admin/AdminSignup";
import AdminDashboard from "./components/admin/AdminDashboard";

function App1() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Check stored tokens on load
    if (localStorage.getItem("token")) setIsAuthenticated(true);
    if (localStorage.getItem("adminToken")) setIsAdminAuthenticated(true);
  }, []);

  return (
    <Routes>
      {/* ------------------ USER ROUTES ------------------ */}
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ Protected User Routes (Header shown here only) */}
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <>
              <UserHeader />
              <Home />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <>
              <UserHeader />
              <UserProfile />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ✅ New User Settings Route */}
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <>
              <UserHeader />
              <UserSettings />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ------------------ ADMIN ROUTES ------------------ */}
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route
        path="/admin/login"
        element={
          <AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          isAdminAuthenticated ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      />
      <Route
        path="/admin/settings"
        element={
          isAdminAuthenticated ? <Settings /> : <Navigate to="/admin/login" />
        }
      />
      <Route
        path="/admin/profile"
        element={
          isAdminAuthenticated ? (
            <AdminProfile />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      />

      {/* ------------------ FALLBACK ------------------ */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App1;

