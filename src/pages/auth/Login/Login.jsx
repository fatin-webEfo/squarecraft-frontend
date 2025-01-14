import useTitle from "../../../hooks/useTitle"
import email from "../../../../public/images/auth/login/email.svg"
import lock from "../../../../public/images/auth/login/lock.svg"
import { Link } from "react-router-dom"
import google from "../../../../public/images/auth/login/google.svg"
import squuarespace from "../../../../public/images/auth/login/squarespace.svg"
import eye from "../../../../public/images/auth/login/eye.svg"


const Login = () => {
    useTitle("SquareCraft | Login")
    return (
        <div className="w-full flex items-center justify-center mt-[10rem] " >
            <div className="max-w-[480px] w-full mx-auto bg-white shadow-gray-100 shadow-md rounded-[10px] p-12">
                <p className="font-semibold text-[28px] ">Sign In Your Account</p>

                <div className="mt-6">
                    <form>
                        <div className="flex flex-col items-start gap-3.5 w-full">
                            <div className="w-full">
                                <p>Email <span className="text-2xl text-red-600">*</span> </p>
                                <div className="relative w-full">
                                    <input type="text" className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-none border-[#EDEDED] pl-[38px] border py-3" placeholder="Enter Your Email" name="" id="" />
                                    <img src={email} className="absolute top-[26px] left-3" alt="" loading="lazy" width={16} />
                                </div>
                            </div>
                            <div className="w-full">
                                <p>Password <span className="text-2xl text-red-600">*</span> </p>
                                <div className="relative w-full">
                                    <input type="text" className="w-full rounded-lg mt-2 bg-[#FAFBFE] focus:outline-none border-[#EDEDED] pr-10 pl-[38px] border py-3" placeholder="Enter Your Email" name="" id="" />
                                    <img src={lock} className="absolute top-[24px] left-3.5" alt="" loading="lazy" width={13} />
                                    <img src={eye} className="absolute top-[25px] right-3.5" alt="" loading="lazy" width={20} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mt-2 justify-between w-full">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="customCheckbox"
                                    class="w-4 h-4 appearance-none bg-gray-200 rounded cursor-pointer checked:bg-jaffa-400  transition-colors duration-300"
                                />
                                <p className="font-semibold text-sm">Remmeber Me</p>
                            </div>
                            <Link to="/auth/forgotPass" className="text-jaffa-400 text-sm">Forgot Password?</Link>
                        </div>

                        <button className="w-full mt-7 bg-jaffa-400 py-3 rounded-[10px] font-semibold">Sign In</button>
                        <div className="flex flex-nowrap  items-end mt-6 gap-2 w-full">
                            <p className="text-xs text-nowrap text-gray-400">Or Continue With</p>
                            <div className="w-full  border-gray-200 border-dotted border-b"></div>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-3 w-full">
                            <div className="bg-[#FAFBFE] border w-full rounded-md py-4 justify-center flex items-center gap-2 border-[#EDEDED]">
                                <img src={google} alt="" loading="lazy" width={25} />
                                <p className="text-[16px] font-semibold">Google</p>
                            </div>
                            <div className="bg-[#FAFBFE] border w-full rounded-md py-4 justify-center flex items-center gap-2 border-[#EDEDED]">
                                <img src={squuarespace} alt="" loading="lazy" width={25} />
                                <p className="text-[16px] font-semibold">Squarespace</p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login