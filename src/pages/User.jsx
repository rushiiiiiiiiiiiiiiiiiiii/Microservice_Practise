import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [file, setFile] = useState(null);

  const [loader, setLoader] = useState(false);

  const getUser = async () => {
    try {
      const res = await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/getUser",
        {
          email,
        }
      );

      const user = res.data.data;

      setName(user.name);
      setPhone(user.phone);
      setProfileImage(user.profile_image);
      setImageKey(user.profile_image_key);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Preview image
      setProfileImage(
        URL.createObjectURL(selectedFile)
      );
    }
  };

  const handleUpdate = async () => {
    try {
      setLoader(true);

      let updatedImageKey = imageKey;

      if (file) {
        const uploadRes = await axios.post(
          "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/generate_s3_upload_url",
          {
            contentType: file.type,
          }
        );

        updatedImageKey =
          uploadRes.data.data.imageKey;

        await axios.put(
          uploadRes.data.data.uploadUrl,
          file,
          {
            headers: {
              "Content-Type": file.type,
            },
          }
        );
      }

      await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/update_user",
        {
          name,
          email,
          phone,
          password,
          profile_image: updatedImageKey,
        }
      );

      alert("User Updated Successfully");

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">
            Update User
          </h1>

          <p className="text-blue-100 mt-2">
            Modify your profile information
          </p>
        </div>

        <div className="p-6 space-y-5">

          {/* Image */}

          <div className="flex justify-center">
            <div className="relative">
              <img
                src={profileImage}
                alt="profile"
                className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="font-medium text-gray-700">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full border bg-gray-100 p-3 rounded-lg mt-1"
            />
          </div>

          {/* Name */}

          <div>
            <label className="font-medium text-gray-700">
              Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="font-medium text-gray-700">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}

          <div>
            <label className="font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* File Upload */}

          <div>
            <label className="font-medium text-gray-700">
              Change Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-2 border p-2 rounded-lg"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-3">

            <button
              onClick={() => navigate("/home")}
              className="w-1/2 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              disabled={loader}
              onClick={handleUpdate}
              className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loader
                ? "Updating..."
                : "Update User"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;