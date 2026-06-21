import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    name: "Rushikesh Arote",
    email: "rushikesharote14@gmail.com",
    phone: "9324004785",
    password: "Rushi@07",
    profile_image: "",
  });

  const getData = (e) => {
    const { name, value, files } = e.target;
    setData({
      ...data,
      [name]: files ? files[0] : value,
    });
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-gray-500 text-center mb-8">Sign up to get started</p>

        <form className="space-y-5" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Image
            </label>
            <input
              type="file"
              name="profile_image"
              accept="image/*"
              onChange={getData}
              className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              onChange={getData}
              value={data.name}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={getData}
              value={data.email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              onChange={getData}
              value={data.phone}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={getData}
              value={data.password}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-3"
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

          <p className="text-center text-sm text-gray-500">
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
