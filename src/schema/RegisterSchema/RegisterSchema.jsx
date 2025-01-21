// RegisterSchema.jsx
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const RegisterSchema = ({ name, email, password, confirmPassword,  onSubmit }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long and contain a number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/v1/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        onSubmit(response.data); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}

      <button
        type="submit"
        className="w-full mt-6 text-center block bg-jaffa-400 py-3 rounded-[10px] font-semibold"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

RegisterSchema.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,  // onChange handler to update input values
  onSubmit: PropTypes.func.isRequired,  // Callback after successful registration
};

export default RegisterSchema;
