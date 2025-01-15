import  { useState } from "react";
import useTitle from "../../../../hooks/useTitle";
import arrow from "../../../../../public/images/auth/register/backArrow.png";
import eye from "../../../../../public/images/auth/login/eye.svg";
import { Link, useNavigate } from "react-router";

const ForgotPassEnterNewPass = () => {
  useTitle("Set New Password | SquareCraft");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="w-full flex items-center justify-center mt-[10rem]">
      <div className="max-w-[480px] w-full mx-auto bg-white border-[#EDEDED] shadow-gray-100 shadow-md rounded-[10px] p-12">
        <div className="w-full flex items-center gap-2 xl:-ml-2">
          <img
            onClick={() => navigate(-1)}
            src={arrow}
            alt=""
            className="rotate-180 cursor-pointer h-7"
          />
          <h2 className="font-semibold text-[28px]">Set New Password</h2>
        </div>

        <form className="mt-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full border border-[#EDEDED] rounded-lg bg-[#FAFBFE] py-3 px-4 mb-4 focus:outline-[#f7decd]  pr-10"
            />
            <div
              className="absolute top-[14px] right-3.5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <img src={eye} alt="Eye Icon" className="w-6 h-6" />
              {!showPassword && (
                <div className="absolute top-[11px] left-0 w-7 h-[2px] bg-jaffa-400 rotate-45"></div>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Retype Password"
              className="w-full border border-[#EDEDED] rounded-lg bg-[#FAFBFE] py-3 px-4 mb-4 focus:outline-[#f7decd]  pr-10"
            />
            <div
              className="absolute top-[14px] right-3.5 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              <img src={eye} alt="Eye Icon" className="w-6 h-6" />
              {!showConfirmPassword && (
                <div className="absolute top-[11px] left-0 w-7 h-[2px] bg-jaffa-400 rotate-45"></div>
              )}
            </div>
          </div>
          <Link
          to="/auth/forgot-pass-pass-updated"
    
            className="w-full block text-center mt-7 bg-jaffa-400 py-3 rounded-[10px] font-semibold "
          >
            Set Password
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassEnterNewPass;
