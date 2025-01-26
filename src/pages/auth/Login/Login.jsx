import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import emailIcon from "../../../../public/images/auth/login/email.svg";
import lockIcon from "../../../../public/images/auth/login/lock.svg";
import google from "../../../../public/images/auth/login/google.svg";
import squarespace from "../../../../public/images/auth/login/squareSpace.svg";
import eyeIcon from "../../../../public/images/auth/login/eye.svg";
import useTitle from "../../../hooks/useTitle";
import tik from "../../../../public/images/auth/login/tik.svg";
import Notification from "../../../hooks/Notification/Notification";
import ButtonLoader from "../../../hooks/ButtonLoader/ButtonLoader";
import { AuthContext } from "../../../context/AuthContext";
// import { API } from "../../../hooks/Api/Api";

const Login = () => {
  useTitle("Sign In | SquareCraft");
    const { loginUser} = useContext(AuthContext);
  
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const validate = () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await axios.post(`https://webefo-backend.vercel.app/api/v1/login`, {
        email,
        password,
        rememberMe: isChecked,
      },{
        withCredentials: true,
      });
      const loginUserData = {
       name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        user_id: response?.data?.user?.id,
        squarCraft_auth_token: response?.data?.squarCraft_auth_token
      }
      loginUser(loginUserData);
      console.log("Login from client to rpvoder" , loginUserData)
      const squarCraft_auth_token = response.data.squarCraft_auth_token;
      console.log("squarCraft_auth_token", squarCraft_auth_token)
      localStorage.setItem("squarCraft_auth_token", squarCraft_auth_token);
      sessionStorage.setItem("squarCraft_auth_token", squarCraft_auth_token);
      document.cookie = `squarCraft_auth_token=${squarCraft_auth_token}; path=/; max-age=${60 * 60}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${squarCraft_auth_token}`;
  
      // Optionally, set a cookie for Squarespace (if required)
      document.cookie = `squarCraft_auth_token=${squarCraft_auth_token}; path=/; max-age=${30 * 24 * 60 * 60}; domain=.squarespace.com; Secure; SameSite=None`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${squarCraft_auth_token}`;

      console.log("Token successfully set for Squarespace cookies:", document.cookie);

      // Notify parent window with the token
      window.parent.postMessage(
        { type: "squarCraft_auth_token", squarCraft_auth_token },
        "https://steady-cobbler-fd4750.netlify.app"
      );


      if(response.status===200){
        navigate("/dashboard/myWebsites");
      }
    
      console.log("Login successful:", response.data);
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-[6.5rem] xl:mt-[10rem] xl:px-8">
      <div className="max-w-[480px] w-full bg-white border-[#EDEDED] shadow-md rounded-[10px] p-6 xl:p-12">
        <p className="font-semibold text-[20px] xl:text-[28px]">Sign In Your Account</p>

        {errors?.api && (
          <Notification
            message={errors?.api}
            type={errors}
            icon={""}
            className={""}
            onClose={() => setErrors(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="w-full">
            <p>Email <span className="text-2xl text-red-600">*</span></p>
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg mt-2 border pl-[38px] border-[#EDEDED] py-3 bg-[#FAFBFE] focus:outline-[#f7decd]"
                placeholder="Enter Your Email"
              />
              <img src={emailIcon} className="absolute top-[26px] left-3" alt="Email Icon" width={16} />
            </div>
            {errors?.email && <p className="text-xs text-red-600 mt-1">{errors?.email}</p>}
          </div>

          <div className="w-full mt-4">
            <p>Password <span className="text-2xl text-red-600">*</span></p>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg mt-2 border pl-[38px] pr-10 border-[#EDEDED] py-3 bg-[#FAFBFE] focus:outline-[#f7decd]"
                placeholder="Enter Your Password"
              />
              <img src={lockIcon} className="absolute top-[24px] left-3.5" alt="Lock Icon" width={13} />
              <div className="absolute top-[25px] right-3.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                <img src={eyeIcon} alt="Eye Icon" width={20} />
              </div>
            </div>
            {errors?.password && <p className="text-xs text-red-600 mt-1">{errors?.password}</p>}
          </div>

          <div className="flex items-center mt-2 justify-between w-full">
          <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="customCheckbox"
                    className="w-4 h-4 appearance-none bg-gray-200 rounded cursor-pointer checked:bg-jaffa-400 transition-colors duration-300"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  {isChecked && (
                    <img
                      src={tik}
                      alt="Tick"
                      className="absolute top-1.5 left-[3px] w-2.5"
                    />
                  )}
                </div>
                <p className="font-semibold text-sm">Remember Me</p>
              </div>
            <Link to="/auth/Forgot-pass-email-verify" className="text-jaffa-400 text-sm">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full mt-6 text-center block bg-jaffa-400 py-3 rounded-[10px] font-semibold"
            disabled={loading}  
          >
            {loading ? (<ButtonLoader />) : "Sign In"}
          </button>

          <div className="flex items-end mt-6 gap-2 w-full">
            <p className="text-xs text-gray-400 text-nowrap">Or Continue With</p>
            <div className="w-full border-gray-200 border-dotted border-b"></div>
          </div>

          <div className="mt-6 flex flex-col xl:flex-row items-center justify-between gap-3 w-full">
            <div className="bg-[#FAFBFE] hover:bg-[#f3f4f8] mx-auto justify-center transition-all cursor-pointer border w-full rounded-md py-4 flex items-center gap-2 border-[#EDEDED]">
              <img src={google} alt="Google" width={25} />
              <p className="text-[16px] font-semibold">Google</p>
            </div>
            <div className="bg-[#FAFBFE] hover:bg-[#f3f4f8] transition-all justify-center cursor-pointer border w-full rounded-md py-4 flex items-center gap-2 border-[#EDEDED]">
              <img src={squarespace} alt="Squarespace" width={25} />
              <p className="text-[16px] font-semibold">Squarespace</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
