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
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [imageKey, setImageKey] = useState("");

  const getUser = async () => {
    try {
      const res = await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/getUser",
        {
          email,
        },
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

  const handleUpdate = async () => {
    try {
      setLoader(true);

      let updatedImageKey  = imageKey;

      if (file) {
        const uploadRes = await axios.post(
          "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/generate_s3_upload_url",
          {
            contentType: file.type,
          },
        );

        updatedImageKey = uploadRes.data.data.imageKey;

        await axios.put(uploadRes.data.data.uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
      }

      await axios.post(
        "https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/update_user",
        {
          name,
          email,
          phone,
          password,
          profile_image: updatedImageKey,
        },
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Update User</h1>

        <div>
          <label className="font-medium">Name</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Phone</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <img
            src={profileImage}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div>
          <label className="font-medium">Change Profile Image</label>

          <input
            type="file"
            className="w-full mt-2"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>

        <button
          disabled={loader}
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loader ? "Updating..." : "Update User"}
        </button>
      </div>
    </div>
  );
};

export default Update;
