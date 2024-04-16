import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is Required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Retrieve user data from local storage
      const storedData = JSON.parse(localStorage.getItem("formData"));

      // Check if current password matches the stored password
      if (storedData && storedData.password === formData.currentPassword) {
        // Update the stored password with the new password
        const updatedData = { ...storedData, password: formData.newPassword };
        localStorage.setItem("formData", JSON.stringify(updatedData));

        // Redirect to welcome page
        navigate("/welcome");
      } else {
        // Display error if current password is incorrect
        setErrors({ currentPassword: "Incorrect current password" });
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
        <label>Current Password:</label>
        <input type="password" name="currentPassword" value={formData.currentPassword} placeholder="Enter your current password" onChange={handleChange} />
        {errors.currentPassword && <div className="error">{errors.currentPassword}</div>}
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" name="newPassword" value={formData.newPassword} placeholder="Enter your new password" onChange={handleChange} />
        {errors.newPassword && <div className="error">{errors.newPassword}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} placeholder="Confirm your new password" onChange={handleChange} />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      </div>

      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
