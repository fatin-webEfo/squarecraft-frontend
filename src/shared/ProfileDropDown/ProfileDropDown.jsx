import profile from "../../../public/images/profile/profile.svg";   
import billing from "../../../public/images/profile/billing.svg";
import logOut from "../../../public/images/profile/logOut.svg";
import Image from "../../hooks/Image/Image";
import { Link } from "react-router";

const ProfileDropDown = () => {
  return (
    <div className="absolute top-12 left-0 w-full bg-white border py-1 rounded-md  shadow-sm shadow-gray-100">
        <Link to="/profile/editProfile" className="flex items-center gap-3  hover:bg-gray-50 px-4 py-1.5 w-full">
            <Image src={profile}></Image>
            <p className="">profile</p>
        </Link>
        <div className="flex items-center gap-3 hover:bg-gray-50 px-4 py-1.5 w-full">
            <Image src={billing}></Image>
            <p className="">Billing</p>
        </div>
        <div className="h-[1px] w-full mt-2 bg-[#F7F5F7]"></div>
        <div className="flex items-center gap-3 px-4 mt-1 hover:bg-[#f0823409] py-1.5 w-full">
            <Image src={logOut} className="w-3.5"></Image>
            <p className="text-jaffa-400">Sing Out</p>
        </div>
    </div>
  )
}

export default ProfileDropDown