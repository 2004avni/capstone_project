// // src/pages/Home.jsx
// import React from "react";



// import UserDashboard from "./userUIfolder/UserDashboard";
// import UserFooter from "./userUIfolder/UserFooter";
// import UserHeader from "./userUIfolder/UserHeader";

// function Home() {
//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       <UserHeader />
//       <main className="flex-grow-1 container py-4">
//         <UserDashboard />
//       </main>
//       <UserFooter/>
//     </div>
//   );
// }

// export default Home;



// src/pages/Home.jsx
import React from "react";
import UserDashboard from "./userUIfolder/UserDashboard";
import UserFooter from "./userUIfolder/UserFooter";

function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* ❌ Removed UserHeader to avoid duplication */}
      <main className="flex-grow-1 container py-4">
        <UserDashboard />
      </main>
      <UserFooter />
    </div>
  );
}

export default Home;
