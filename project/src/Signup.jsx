import './signup.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    profileImage: "", // Store image as Base64
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, profileImage: reader.result }));
      };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://stunning-carnival-7v5gpp67jjq73xj96-5000.app.github.dev/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="signcontainer">
      <div className="signupcontainer">
        
        <h1>Sign Up</h1>
      
      <form id="signupform" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        
        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        <br />
        {formData.profileImage && (
          <img src={formData.profileImage} alt="Profile Preview" width="100" height="100" />
        )}
       

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>

      <p>Already have an account?</p>
      <button className="login-btn" onClick={() => navigate("/login")}>
        Log in
      </button>
      </div>
    </div>
  );
}
