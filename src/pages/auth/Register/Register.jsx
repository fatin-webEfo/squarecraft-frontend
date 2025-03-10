import { useContext, useState } from "react";
import axios from "axios";
import useTitle from "../../../hooks/useTitle";
import emailIcon from "../../../../public/images/auth/login/email.svg";
import lockIcon from "../../../../public/images/auth/login/lock.svg";
import userIcon from "../../../../public/images/auth/login/user.svg";
import google from "../../../../public/images/auth/login/google.svg";
import squarespace from "../../../../public/images/auth/login/squareSpace.svg";
import eyeIcon from "../../../../public/images/auth/login/eye.svg";
import Notification from "../../../hooks/Notification/Notification";
import { useNavigate } from "react-router";
import { API } from "../../../hooks/Api/Api";
import { AuthContext } from "../../../context/AuthContext";

const RegisterSchema = () => {
  useTitle("Sign Up | SquareCraft");
      const { postPlugins, setUserState } = useContext(AuthContext); 
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const validateField = (fieldName, value) => {
    let error = "";
  
    if (fieldName === "name") {
      if (!value) error = "Name is required.";
    }
  
    if (fieldName === "email") {
      if (!value) error = "Email is required.";
      else if (!emailRegex.test(value)) error = "Please enter a valid email address.";
    }
  
    if (fieldName === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters.";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one uppercase letter.";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number.";
      } else if (!/[@$!%*?&]/.test(value)) {
        error = "Password must contain at least one special character (@$!%*?&).";
      }
    }
  
    if (fieldName === "confirmPassword") {
      if (!value) error = "Please confirm your password.";
      else if (value !== password) error = "Passwords do not match.";
    }
  
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);
  
    if (Object.values(errors ?? {}).some((error) => error)) {
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await axios.post(
        `${API}/api/v1/register`,
        { name, email, password, confirmPassword },
        { withCredentials: true } 
      );
  
      const squarCraft_auth_token = response?.data?.squarCraft_auth_token;
      console.log(response)
      setUserState(response?.data?.user)
      localStorage.setItem("squarCraft_auth_token", squarCraft_auth_token);
      sessionStorage.setItem("squarCraft_auth_token", squarCraft_auth_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${squarCraft_auth_token}`;
      document.cookie = `squareCraft_auth_token=${squarCraft_auth_token}; path=/;`;

      if (response?.status === 201) {
  
        navigate("/dashboard/myWebsites");
        
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error?.response?.data?.message || "An error occurred.",
      }));
    } finally {
      setLoading(false);
    }
    postPlugins();
  };
  

  return (
    <div className="w-full flex items-center justify-center mt-[6.5rem] xl:mt-[10rem] xl:px-4 sm:px-8">
      <div className="max-w-[480px] w-full bg-white border-[#EDEDED] shadow-gray-100 shadow-md rounded-[10px] p-6 xl:p-12">
        <p className="font-semibold text-[20px] xl:text-[28px]">Sign Up Your Account</p>



        {errors?.submit && (
          <Notification
            message={errors?.submit}
            type={errors}
            icon={""}
            className={""}
            onClose={() => setErrors(null)}
          />
        )}

        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <p>Name <span className="text-2xl text-red-600">*</span></p>
              <div className="relative w-full">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateField("name", e.target.value);
                  }}
                  className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-[#f7decd] border-[#EDEDED] pl-[38px] border py-3"
                  placeholder="Enter Your Name"
                />
                <img
                  src={userIcon}
                  className="absolute top-[25px] left-3.5"
                  alt=""
                  loading="lazy"
                  width={14}
                />
              </div>
              {errors?.name && <p className="text-xs text-red-600">{errors?.name}</p>}
            </div>
            <div className="w-full">
              <p>Email <span className="text-2xl text-red-600">*</span></p>
              <div className="relative w-full">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField("email", e.target.value);
                  }}
                  className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-[#f7decd] border-[#EDEDED] pl-[38px] border py-3"
                  placeholder="Enter Your Email"
                />
                <img
                  src={emailIcon}
                  className="absolute top-[26px] left-3.5"
                  alt=""
                  loading="lazy"
                  width={16}
                />
              </div>
              {errors?.email && <p className="text-xs text-red-600">{errors?.email}</p>}
            </div>
            <div className="w-full">
              <p>Password <span className="text-2xl text-red-600">*</span></p>
              <div className="relative w-full">
              <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    validateField("password", e.target.value);
  }}
  className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-[#f7decd] border-[#EDEDED] pr-10 pl-[38px] border py-3"
  placeholder="Enter Your Password"
/>
                <img
                  src={lockIcon}
                  className="absolute top-[24px] left-3.5"
                  alt=""
                  loading="lazy"
                  width={13}
                />
                <div
                  className="absolute top-[25px] right-3.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={eyeIcon} alt="Eye Icon" loading="lazy" width={20} />
                </div>
              </div>
              {errors?.password && <p className="text-xs text-red-600">{errors?.password}</p>}
            </div>
            <div className="w-full">
              <p>Confirm Password <span className="text-2xl text-red-600">*</span></p>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateField("confirmPassword", e.target.value);
                  }}
                  className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-[#f7decd] border-[#EDEDED] pr-10 pl-[38px] border py-3"
                  placeholder="Confirm Your Password"
                />
                <img
                  src={lockIcon}
                  className="absolute top-[24px] left-3.5"
                  alt=""
                  loading="lazy"
                  width={13}
                />
                <div
                  className="absolute top-[25px] right-3.5 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img src={eyeIcon} alt="Eye Icon" loading="lazy" width={20} />
                </div>
              </div>
              {errors?.confirmPassword && (
                <p className="text-xs text-red-600">{errors?.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-6 text-center block bg-jaffa-400 py-3 rounded-[10px] font-semibold"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="flex flex-nowrap items-end mt-6 gap-2 w-full">
              <p className="text-xs text-nowrap text-gray-400">Or Continue With</p>
              <div className="w-full border-gray-200 border-dotted border-b"></div>
            </div>

            <div className="mt-6 flex flex-col xl:flex-row items-center justify-between gap-3 w-full">
              <div className="bg-[#FAFBFE] hover:bg-[#f3f4f8] transition-all duration-300 cursor-pointer border w-full rounded-md py-4 justify-center flex items-center gap-2 border-[#EDEDED]">
                <img src={google} alt="" loading="lazy" width={25} />
                <p className="text-[16px] font-semibold">Google</p>
              </div>
              <div className="bg-[#FAFBFE] hover:bg-[#f3f4f8] transition-all duration-300 cursor-pointer border w-full rounded-md py-4 justify-center flex items-center gap-2 border-[#EDEDED]">
                <img src={squarespace} alt="" loading="lazy" width={25} />
                <p className="text-[16px] font-semibold">Squarespace</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchema;
