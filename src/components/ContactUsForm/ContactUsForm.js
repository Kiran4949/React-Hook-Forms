import { useState } from "react";
import * as Yup from "yup";
import "./style.css";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required").min(3, "Name must be at least 3 characters"),
    email: Yup.string().required("Email is Required").email("Invalid email format"),
    message: Yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Save form data to local storage
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      // Redirect to welcome page
      window.location.href = "/welcome";
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
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} placeholder="Enter your name" onChange={handleChange} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={handleChange} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" value={formData.message} placeholder="Enter your message" onChange={handleChange} />
        {errors.message && <div className="error">{errors.message}</div>}
      </div>
      <div className="button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ContactUsForm;
