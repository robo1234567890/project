// import React, { useEffect, useState } from "react";

// export default function Homepage() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <div>
//       <div className="Headercontainer">
//         <h1>Welcome to the Event Planner!</h1>

//         {user ? (
//           <div className="user-profile">
//             <h2>Hello, {user.username}!</h2>
//             <p>Email: {user.email}</p>
//             <p>Phone: {user.phone}</p>
//             {user.profileImage && (
//               <img src={user.profileImage} alt="Profile" className="profile-pic" />
//             )}
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           <div>
//             <button><a href="/login">Login</a></button>
//             <button><a href="/signup">Sign Up</a></button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./Homepage.css";

export default function Homepage() {
  const [user, setUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // ✅ Toggle for user details box

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDetails(false);
  };

  return (
    <div className="homepage-container">
      <div className="header-container">
        <div  className="left-header">
        <h1>Welcome to the </h1>
        </div>
        <div className="right-header">
        {user ? (
            
          <div className="user-section">
            <button className="user-btn" onClick={() => setShowDetails(!showDetails)}>
              {user.username} 
            </button>
            {showDetails && (
              <div className="user-dropdown">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                {user.profileImage && (
                  <img src={user.profileImage} alt="Profile" className="profile-pic" />
                )}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <button><a href="/login">Login</a></button>
            <button><a href="/signup">Sign Up</a></button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
