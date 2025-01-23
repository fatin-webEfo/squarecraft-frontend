import { useContext, useState } from "react";
import eye from "../../../../../public/images/auth/login/eye.svg";
import blankuser from "../../../../../public/images/navbar/blankuser.png";
import edit from "../../../../../public/images/navbar/edit.png";
import { AuthContext } from "../../../../context/AuthContext";

const UpdateProfile = () => {
    const { user, loading, error } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(blankuser);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="bg-white py-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <p className="text-[26px] font-semibold">Update Your Profile</p>
      </div>
      <div className="border-b border-dashed border-gray-300 max-w-7xl mx-auto w-full mt-6"></div>
      <div className="mt-8">
        <div className="max-w-[500px] w-full border bg-[#FAFBFE] p-8 rounded-md border-[#E7E7E7] mx-auto">
          <div className="flex justify-center mb-8 relative">
            <div className="relative group">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-36 h-36  object-cover object-top "
              />
              <label
                htmlFor="upload-photo"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer  transition-all"
              >
                <img src={edit} alt="Edit Icon" className="w-4 h-4" />
              </label>
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={user?.name}
                className="mt-2 block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Your Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <select
                  className="absolute inset-y-0 left-0 pl-3 pr-1 h-full bg-transparent border-none text-sm text-gray-600 focus:outline-none"
                  defaultValue="+880"
                >
                  <option value="+880">+880</option>
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  placeholder="Your phone number"
                  className="pl-20 block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Your Email Address <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="email"
                autoComplete="off"
                placeholder={user?.email}
                className="mt-2 block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Change Password
              </label>
              <div className="relative mt-2">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Change your password"
                  className="block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
                />
                <div
                  className="absolute inset-y-0 right-3.5 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <img src={eye} alt="Eye Icon" width={20} />
                  {!passwordVisible && (
                    <div className="absolute top-[20px] -left-[2px] w-6 h-[2px] bg-jaffa-400 rotate-45"></div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm password"
                  className="block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
                />
                <div
                  className="absolute inset-y-0 right-3.5 flex items-center cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img src={eye} alt="Eye Icon" width={20} />
                  {!confirmPasswordVisible && (
                    <div className="absolute top-[20px] -left-[2px] w-6 h-[2px] bg-jaffa-400 rotate-45"></div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-orange-500 px-10 text-[#000230] flex items-end text-sm justify-end text-center ml-auto font-medium py-2.5 rounded hover:bg-orange-600 transition"
              >
                Update Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
