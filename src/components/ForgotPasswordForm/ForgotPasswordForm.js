import { useState } from "react";
import * as Yup from "yup";
import './style.css';

const ForgetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format")
      .matches(/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/, "Invalid email format"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
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
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
      
    </form>
  );
};

export default ForgetPasswordForm;

