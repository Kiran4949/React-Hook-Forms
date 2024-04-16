import { useState } from "react";
import * as Yup from "yup";
import "./style.css";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    // Your existing validation schema
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);

      // Save form data to local storage
      localStorage.setItem("formData", JSON.stringify(formData));

      // Redirect to login page
      window.location.href = "/login";
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter((interest) => interest !== name);
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} placeholder="Enter your username" onChange={handleChange} />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} placeholder="Enter your first name" onChange={handleChange} />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} placeholder="Enter your last name" onChange={handleChange} />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} placeholder="Enter your phone number" onChange={handleChange} />
        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
      </div>

      <div>
        <label>Password:</label>
        <input type={showPassword ? "text" : "password"} name="password" value={formData.password} placeholder="Enter your password" onChange={handleChange} />
        <div className="checkbox-container">
          <input type="checkbox" id="showPasswordCheckbox" checked={showPassword} onChange={togglePasswordVisibility} />
          <label className="sp" htmlFor="showPasswordCheckbox">
            Show Password
          </label>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
      </div>

      <div>
        <label>Confirm Password:</label>
        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} placeholder="Confirm your password" onChange={handleChange} />
        <div className="checkbox-container">
          <input type="checkbox" id="showConfirmPasswordCheckbox" checked={showConfirmPassword} onChange={toggleConfirmPasswordVisibility} />
          <label htmlFor="showConfirmPasswordCheckbox">Show Confirm Password</label>
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
      </div>

      <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} placeholder="Enter your age" onChange={handleChange} />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>

      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>

      <div>
        <label>Interests:</label>
        <label>
          <input type="checkbox" name="coding" checked={formData.interests.includes("coding")} onChange={handleCheckboxChange} />
          Coding
        </label>
        <label>
          <input type="checkbox" name="sports" checked={formData.interests.includes("sports")} onChange={handleCheckboxChange} />
          Sports
        </label>
        <label>
          <input type="checkbox" name="reading" checked={formData.interests.includes("reading")} onChange={handleCheckboxChange} />
          Reading
        </label>
        {errors.interests && <div className="error">{errors.interests}</div>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="birthDate" value={formData.birthDate} placeholder="Enter your date of birth" onChange={handleChange} />
        {errors.birthDate && <div className="error">{errors.birthDate}</div>}
      </div>

      <p>
        Already have an account? <Link to="/login" className="decorate">Login here</Link>
      </p>

      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
