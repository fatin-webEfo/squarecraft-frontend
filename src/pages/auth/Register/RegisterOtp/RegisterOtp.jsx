import React, { useState } from "react";
import arrow from "../../../../../public/images/auth/register/backArrow.png"
import useTitle from './../../../../hooks/useTitle';
import { useNavigate } from "react-router";

const RegisterOtp = () => {
  useTitle("Verify OTP | SquareCraft");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted OTP: ${otp.join("")}`);
  };

  return (
    <div className="w-full flex items-center justify-center mt-[10rem]">
      <div className="max-w-[480px] w-full mx-auto bg-white border-[#EDEDED] shadow-gray-100 shadow-md rounded-[10px] p-12">
        <div className="w-full flex items-center gap-2 xl:-ml-2">
        <img onClick={()=> navigate("/auth/register")} src={arrow} alt="" className="rotate-180 cursor-pointer h-7"/>
        <p className="font-semibold text-[28px]">Verify Your Account</p>
        </div>
        <p className="mt-2 text-gray-500 text-sm">
          Enter the code sent to abc***mail.com.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex justify-between gap-2">
            {otp?.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="xl:w-16 w-full text-center text-2xl border border-[#EDEDED] rounded-lg bg-[#FAFBFE] py-3 focus:outline-none focus:ring focus:ring-jaffa-400"
              />
            ))}
          </div>
         <div className="flex w-full text-sm justify-between items-center mt-4"> 
            <p className="">Didn't receive the code? <span className="text-jaffa-400 cursor-pointer font-semibold">resend code</span> </p>
            <p>0:00</p>
         </div>

          <button
            type="submit"
            className="w-full mt-7 bg-jaffa-400 py-3 rounded-[10px] font-semibold"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOtp;
