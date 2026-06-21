import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const getAllUsers = async () => {
    try {
      setLoader(true);
      const res = await axios.get(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/getAllUser",
      );
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      setLoader(false);
      console.log(err);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleLogout = ()=>{
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Users Management</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link to="/createUser">
              <button className="cursor-pointer w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">
                Add User
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="cursor-pointer w-full sm:w-auto bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4">Profile</th>
                  <th className="text-left px-6 py-4">User Id</th>
                  <th className="text-left px-6 py-4">Name</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Phone</th>
                  <th className="text-center px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loader ? (
                  <tr>
                    <td colSpan="5" className="py-10">
                      <div className="flex justify-center items-center gap-3">
                        <svg
                          className="animate-spin h-8 w-8 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>

                        <span className="text-lg font-medium text-gray-600">
                          Loading Users...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={user.profile_image}
                          alt={user.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 font-light">{user.id}</td>

                      <td className="px-6 py-4 font-medium">{user.name}</td>

                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4 text-gray-600">{user.phone}</td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <Link to={`/user/${user.email}`}>
                            <button className="cursor-pointer text-sm bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">
                              View
                            </button>
                          </Link>

                          <button className="cursor-pointer text-sm bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600">
                            Update
                          </button>

                          <button className="cursor-pointer text-sm bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
