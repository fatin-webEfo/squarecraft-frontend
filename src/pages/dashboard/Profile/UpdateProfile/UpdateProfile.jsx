import { useContext, useState } from "react";
import eye from "../../../../../public/images/auth/login/eye.svg";
import blankuser from "../../../../../public/images/navbar/blankuser.png";
import edit from "../../../../../public/images/navbar/edit.png";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

const UpdateProfile = () => {
  const { user, loading, error, setUserState } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(
    user?.profileImage || blankuser
  );
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formDataToSend = new FormData();

    // Ensure confirmPassword matches password if not explicitly provided
    const updatedConfirmPassword = formData.confirmPassword || formData.password;

    // Append form data
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", updatedConfirmPassword);

    // Handle profile photo
    if (profilePhoto) {
      formDataToSend.append("profileImage", profilePhoto);
    }

    // Debugging
    console.log("FormData being sent:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await axios.patch(
      `https://webefo-backend.vercel.app/api/v1/profile/${user?.user_id || user?.userId}`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("squarCraft_auth_token")}`,
        },
        withCredentials: true,
      }
    );

    console.log("Profile updated:", response);
    setUserState(response.data.user); // Update user context with the latest data
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Error updating profile:", err);
    alert(err.response?.data?.message || "Failed to update profile. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="bg-white py-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="mx-auto">
          <p className="text-[26px] font-semibold text-center mx-auto">Update Your Profile</p>
          {user?.emailVerified === false && (
            <p className="text-[#FF0000] text-center mt-2 text-xs border rounded-xl px-4 py-1 border-red-200 bg-red-50">
              Please verify your email to update your profile
            </p>
          )}
        </div>
      </div>
      <div className="border-b border-dashed border-gray-300 max-w-7xl mx-auto w-full mt-6"></div>
      <div className="mt-8">
        <div className="max-w-[500px] w-full border bg-[#FAFBFE] p-8 rounded-md border-[#E7E7E7] mx-auto">
          <div className="flex justify-center mb-8 relative">
            <div className="relative group">
              <img
                src={profilePhotoPreview}
                alt="Profile"
                className="w-36 h-36 object-cover object-top"
              />
              <label
                htmlFor="upload-photo"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer transition-all"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-2 block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Your Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 w-full">
                <PhoneInput
                  value={formData.phoneNumber}
                  onChange={(value) => setFormData((prevData) => ({ ...prevData, phoneNumber: value }))}
                  inputStyle={{
                    width: "100%", // Make the input field full width
                    height: "42px", // Adjust height for better alignment
                    border: "1px solid #E7E7E7",
                    borderRadius: "6px",
                    paddingLeft: "55px", // Ensure space for country code dropdown
                    paddingRight: "16px",
                    fontSize: "14px",
                  }}
                  buttonStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E7E7E7", // Add border between the dropdown and input
                    borderRadius: "6px 0 0 6px", // Match border radius
                    padding: "0 4px",
                  }}
                  dropdownStyle={{
                    width: "auto",
                  }}
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                  }}
                />

              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Your Email Address <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter your email"
                className="mt-2 block w-full rounded-md border-[#E7E7E7] border bg-white px-4 py-2.5 text-sm focus:outline-[#f7decd]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Change Password</label>
              <div className="relative mt-2">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Change your password"
                  autoComplete="off"
                  autoSave="off"
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
              <label className="block text-sm font-medium text-gray-800">Confirm Password</label>
              <div className="relative mt-2">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;