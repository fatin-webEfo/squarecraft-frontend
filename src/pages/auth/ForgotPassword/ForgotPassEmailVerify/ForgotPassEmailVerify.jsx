import  { useState } from "react";
import useTitle from "../../../../hooks/useTitle";
import arrow from "../../../../../public/images/auth/register/backArrow.png";
import { Link, useNavigate } from "react-router";

const ForgotPassEmailVerify = () => {
  useTitle("Email Verify | SquareCraft");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (recaptchaVerified) {
      alert("Form submitted successfully.");
    } else {
      alert("Please verify the reCAPTCHA.");
    }
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
          <p className="font-semibold text-[28px]">Verify Your Email</p>                </div>
        <p className="mt-2 text-gray-500 text-sm">Enter your email to receive a reset link.</p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-[#EDEDED] rounded-lg bg-[#FAFBFE] py-3 px-4 mb-4 focus:outline-[#f7decd] "
          />

          <Link
          to="/auth/Forgot-pass-email-otp"
            type="submit"
            className="w-full block text-center mt-2 bg-jaffa-400 cursor-pointer py-3 rounded-[10px] font-semibold "
            disabled={!recaptchaVerified}
          >
            Submit
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassEmailVerify;
