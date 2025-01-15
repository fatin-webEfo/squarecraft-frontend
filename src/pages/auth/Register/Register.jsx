import React, { useState } from "react";
import useTitle from "../../../hooks/useTitle";
import email from "../../../../public/images/auth/login/email.svg";
import lock from "../../../../public/images/auth/login/lock.svg";
import { Link, useNavigate } from "react-router-dom";
import google from "../../../../public/images/auth/login/google.svg";
import squuarespace from "../../../../public/images/auth/login/squarespace.svg";
import user from "../../../../public/images/auth/login/user.svg";
import eye from "../../../../public/images/auth/login/eye.svg";

const Register = () => {
  useTitle("Sign Up | SquareCraft");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full flex items-center justify-center mt-[10rem]">
      <div className="max-w-[480px] w-full mx-auto bg-white border-[#EDEDED] shadow-gray-100 shadow-md rounded-[10px] p-12">
        <p className="font-semibold text-[28px]">Sign Up Your Account</p>

        <div className="mt-6">
          <form>
            <div className="flex flex-col items-start gap-3.5 w-full">
              <div className="w-full">
                <p>
                  Name <span className="text-2xl text-red-600">*</span>
                </p>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-none border-[#EDEDED] pl-[38px] border py-3"
                    placeholder="Enter Your Name"
                  />
                  <img
                    src={user}
                    className="absolute top-[25px] left-3.5"
                    alt=""
                    loading="lazy"
                    width={14}
                  />
                </div>
              </div>
              <div className="w-full">
                <p>
                  Email <span className="text-2xl text-red-600">*</span>
                </p>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-none border-[#EDEDED] pl-[38px] border py-3"
                    placeholder="Enter Your Email"
                  />
                  <img
                    src={email}
                    className="absolute top-[26px] left-3.5"
                    alt=""
                    loading="lazy"
                    width={16}
                  />
                </div>
              </div>
              <div className="w-full">
                <p>
                  Password <span className="text-2xl text-red-600">*</span>
                </p>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-none border-[#EDEDED] pr-10 pl-[38px] border py-3"
                    placeholder="Enter Your Password"
                  />
                  <img
                    src={lock}
                    className="absolute top-[24px] left-3.5"
                    alt=""
                    loading="lazy"
                    width={13}
                  />
                  <div
                    className="absolute top-[25px] right-3.5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={eye} alt="Eye Icon" loading="lazy" width={20} />
                    {!showPassword && (
                      <div className="absolute top-[6px] -left-[2px] w-6 h-[2px] bg-jaffa-400 rotate-45"></div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <p>
                  Confirm Password <span className="text-2xl text-red-600">*</span>
                </p>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-none border-[#EDEDED] pr-10 pl-[38px] border py-3"
                    placeholder="Confirm Your Password"
                  />
                  <img
                    src={lock}
                    className="absolute top-[24px] left-3.5"
                    alt=""
                    loading="lazy"
                    width={13}
                  />
                  <div
                    className="absolute top-[25px] right-3.5 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <img src={eye} alt="Eye Icon" loading="lazy" width={20} />
                    {!showConfirmPassword && (
                      <div className="absolute top-[6px] -left-[2px] w-6 h-[2px] bg-jaffa-400 rotate-45"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/auth/register-otp"
              className="w-full mt-6 text-center block bg-jaffa-400 py-3 rounded-[10px] font-semibold"
            >
              Sign Up
            </Link>
          
            <div className="flex flex-nowrap items-end mt-6 gap-2 w-full">
              <p className="text-xs text-nowrap text-gray-400">Or Continue With</p>
              <div className="w-full border-gray-200 border-dotted border-b"></div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 w-full">
              <div className="bg-[#FAFBFE] hover:bg-[#f3f4f8] transition-all duration-300 cursor-pointer border w-full rounded-md py-4 justify-center flex items-center gap-2 border-[#EDEDED]">
                <img src={google} alt="" loading="lazy" width={25} />
                <p className="text-[16px] font-semibold">Google</p>
              </div>
              <div className="bg-[#FAFBFE] hover:bg-[#f3f4f8] transition-all duration-300 cursor-pointer border w-full rounded-md py-4 justify-center flex items-center gap-2 border-[#EDEDED]">
                <img src={squuarespace} alt="" loading="lazy" width={25} />
                <p className="text-[16px] font-semibold">Squarespace</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
