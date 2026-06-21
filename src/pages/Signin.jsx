import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const Navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        email:"rushikesharote14@gmail.com",
        password:"Rushi@07"
    })

    const getData = (e)=>{
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }
    const handleSignin = async (e) =>{
        e.preventDefault()
        setLoader(true)
        console.log("Hiii")
        try{
            const res = await axios.post('https://emc6g4olt5.execute-api.ap-south-1.amazonaws.com/uat/practise/signin', data)
            console.log(res.data)
            console.log(res.data.status)
            if(res.data.status){
                Navigate('/home')
            }
        }
        catch(err){
            console.error(err)
            setLoader(false)
        }
        finally{
            setLoader(false)
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in to your account
        </p>

        <form className="space-y-5" onSubmit={handleSignin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={getData}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name='password'
              value={data.password}
              onChange={getData}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="text-blue-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loader}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {loader ? (
              <>
                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signin Up...</span>
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to='/signup'><span className="text-blue-600 cursor-pointer font-medium">
              Sign Up
            </span></Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
