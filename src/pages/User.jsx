import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const { email } = useParams();
  console.log(email);
  const [data, setData] = useState({});
  const getAllUsers = async () => {
    try {
      const res = await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/getUser",{"email":email}
      );
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 h-32 relative">
          <img
            src={data.profile_image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover absolute left-1/2 -bottom-16 -translate-x-1/2"
          />
        </div>

        {/* User Details */}
        <div className="pt-20 pb-8 px-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            {data.name}
          </h1>

          <p className="text-center text-gray-500 mt-2">Software Developer</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {data.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{data.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium text-gray-800 break-all">
                {data.id}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-start gap-4 mt-10">
            {/* <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition">
              Update User
            </button>

            <button className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition">
              Delete User
            </button> */}

            <Link to='/home'><button className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition">
              Back
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
