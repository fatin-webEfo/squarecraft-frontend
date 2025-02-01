import profile from "../../../public/images/profile/profile.svg";
import billing from "../../../public/images/profile/billing.svg";
import logOut from "../../../public/images/profile/logOut.svg";
import Image from "../../hooks/Image/Image";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const ProfileDropDown = () => {
  const { logoutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const LogOut =() =>{
    logoutUser();
    navigate("/auth/login");
  }

  
  return (
    <div className="absolute top-12 left-0 w-full bg-white border py-1 rounded-md shadow-sm shadow-gray-100">
    
      <Link to="/profile/editProfile" className="flex items-center gap-3 hover:bg-gray-50 px-4 py-1.5 w-full">
        <Image src={profile} alt="Profile Icon" />
        <p className="">Profile</p>
      </Link>

      <div className="flex items-center gap-3 hover:bg-gray-50 px-4 py-1.5 w-full">
        <Image src={billing} alt="Billing Icon" />
        <p className="">Billing</p>
      </div>

      <div className="h-[1px] w-full mt-2 bg-[#F7F5F7]"></div>

      <div
        onClick={LogOut}
        className="flex items-center gap-3 px-4 mt-1 hover:bg-[#f0823409] py-1.5 w-full cursor-pointer"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
        ) : (
          <Image src={logOut} className="w-3.5" alt="Logout Icon" />
        )}
        <p className="text-jaffa-400">Sign Out</p> 
      </div>

    
    </div>
  );
};

export default ProfileDropDown;
