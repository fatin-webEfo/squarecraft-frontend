import  { useState, useEffect } from "react";
import arrow from "../../../../../public/images/auth/register/backArrow.png";
import useTitle from "./../../../../hooks/useTitle";
import { Link, useNavigate } from "react-router";

const ForgotPassOtp = () => {
  useTitle("Verify OTP | SquareCraft");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120); // Timer starts at 2:00 (120 seconds)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleChange = (value, index) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value.length === otp.length) {
      const pastedOtp = value.slice(0, otp.length).split("");
      setOtp(pastedOtp);
      document.getElementById(`otp-input-${pastedOtp.length - 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/auth/register-success")
  };

  return (
    <div className="w-full flex items-center justify-center mt-[6.5rem] xl:mt-[10rem]">
      <div className="max-w-[480px] w-full bg-white border-[#EDEDED] shadow-gray-100 shadow-md rounded-[10px] p-6 xl:p-12">
        <div className="w-full flex items-center gap-2 xl:-ml-2">
          <img
            onClick={() => navigate(-1)}
            src={arrow}
            alt=""
            className="rotate-180 cursor-pointer h-7"
          />
          <p className="font-semibold text-[20px] xl:text-[28px]">Verify Your Account</p>
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
                maxLength={otp.length}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="xl:w-16 w-full text-center text-lg xl:text-2xl border border-[#EDEDED] rounded-lg bg-[#FAFBFE] py-3 focus:outline-[#f7decd] "
              />
            ))}
          </div>
          <div className="flex w-full text-sm justify-between items-center mt-4">
            <p className="">
              Didn&apos;t receive the code? <span className="text-jaffa-400 cursor-pointer font-semibold">resend code</span>
            </p>
            <p className={timeLeft === 0 ? "text-red-600" : ""}>{formatTime(timeLeft)}</p>
          </div>

          <Link
          to="/auth/forgot-pass-set-new-pass"
            type="submit"
            className="w-full mt-7 block text-center bg-jaffa-400 py-3 rounded-[10px] font-semibold"
          >
            Verify OTP
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassOtp;
