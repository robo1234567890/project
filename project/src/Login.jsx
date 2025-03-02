// import { useState } from "react";
// import './login.css';

// export default function LoginForm() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch("https://stunning-carnival-7v5gpp67jjq73xj96-5000.app.github.dev/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("Login successful");
//       } else {
//         setErrorMessage(data.message);
//       }
//     } catch (error) {
//       setErrorMessage("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="body">
//       <div className="container">
//         <div className="logincontainer">
//         <h1>Login</h1>
//         <form id="signupForm" onSubmit={handleSubmit}>
//          <div> <input
//             type="text"
//             name="username"
//             placeholder="Username or Email"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           </div>
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//           <button type="submit" className="login-btn">
//             Log in
//           </button>
//         </form>

//         <p>Don't have an account?</p>
//         <button
//           className="signup-btn"
//           onClick={() => window.location.href = "/SignUp"}
//         >
//           Sign Up
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import './login.css';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null); // Stores logged-in user details

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://stunning-carnival-7v5gpp67jjq73xj96-5000.app.github.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login successful");

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Set user state
        setUser(data.user);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Server error. Try again later.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="logincontainer">
          {user ? (
            // If user is logged in, show profile details
            <div className="user-profile">
              <h1>Welcome, {user.username}!</h1>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              {user.profileImage && (
                <img src={user.profileImage} alt="Profile" className="profile-pic" />
              )}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            // Login form
            <>
              <h1>Login</h1>
              <form id="signupForm" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit" className="login-btn">Log in</button>
              </form>
              <p>Don't have an account?</p>
              <button className="signup-btn" onClick={() => window.location.href = "/SignUp"}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
