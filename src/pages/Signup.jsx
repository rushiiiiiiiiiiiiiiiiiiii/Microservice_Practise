import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const Signup = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profile_image: "",
  });

  const getData = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setData({
        ...data,
        [name]: files[0],
      });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setData({
        ...data,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(data);
    try {
      const urlData = await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/generate_s3_upload_url",
        {
          contentType: data.profile_image.type,
        },
      );
      console.log(urlData.data.status);
      console.log("url data", urlData);

      if (urlData.data.status) {
        console.log(urlData.data.data.uploadUrl);
        console.log(urlData.data.data.imageKey);
        await handleStoreS3(
          urlData.data.data.uploadUrl,
          data.profile_image,
          urlData.data.data.imageKey,
        );
      }
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };
  const handleStoreS3 = async (presignedUrl, file, imagekey) => {
    console.log(presignedUrl);
    try {
      const uploadS3 = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      if (uploadS3.status == 200) {
        await handleSignUpRedirect(imagekey);
      }
      console.log(uploadS3);
    } catch (err) {
      setLoader(false);
      console.error(err);
    }
  };
  const handleSignUpRedirect = async (imageKey) => {
    console.log("hii");
    console.log(imageKey);
    try {
      const signupData = {
        ...data,
        profile_image: imageKey,
      };
      const resData = await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/singup",
        signupData,
      );
      console.log(resData.data.status);
      if (resData.data.status) {
        navigate("/");
      }
      console.log(resData);
    } catch (err) {
      setLoader(false);
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-5">
        <h1 className="text-2xl font-bold text-center mb-1">Create Account</h1>
        <p className="text-gray-500 text-center mb-4 text-sm">Sign up to get started</p>

        <form className="space-y-3.5" onSubmit={handleSignUp}>
          <div className="flex justify-center">
            <label className="relative cursor-pointer">
              <input
                type="file"
                name="profile_image"
                accept="image/*"
                onChange={getData}
                className="hidden"
              />

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaPlus className="text-3xl text-gray-500" />
                )}
              </div>

              <div className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                <FaPlus size={12} />
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={getData}
              value={data.name}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={getData}
              value={data.email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              onChange={getData}
              value={data.phone}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={getData}
              value={data.password}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {loader ? (
              <>
                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-blue-600 cursor-pointer font-medium">
                Sign In
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
