import { useState } from "react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    usernameOrEmail: Yup.string().required("Username or Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Retrieve user data from local storage
      const storedData = JSON.parse(localStorage.getItem("formData"));

      // Check if stored data exists and credentials match
      if (storedData && (formData.usernameOrEmail === storedData.username || formData.usernameOrEmail === storedData.email) && formData.password === storedData.password) {
        // Redirect to welcome page
        navigate("/welcome");
      } else {
        // Display error if credentials don't match
        setErrors({ general: "Invalid username/email or password" });
      }
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>Username or Email:</label>
        <input type="text" name="usernameOrEmail" value={formData.usernameOrEmail} placeholder="Enter your username or email" onChange={handleChange} />
        {errors.usernameOrEmail && <div className="error">{errors.usernameOrEmail}</div>}
      </div>
      <div>
        <label>Password:</label>
        <div className="password-input-container">
          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
          </span>
        </div>
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      {errors.general && <div className="error">{errors.general}</div>}

      <Link to="/forgot-password" className="decorate">Forgot Password?</Link>

      <p>
        Don't have an account? <Link to="/register" className="decorate">Register here</Link>
      </p>

      <div className="button-container">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
