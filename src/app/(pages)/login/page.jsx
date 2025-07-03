// app/login/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "@/app/Store/ReduxSlice/authSlice";
import { useEffect, useState } from "react";
import { trackDevice } from "@/components/DeviceTracker";

export default function LoginPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUserStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`;
  };

  const handleLinkedInLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/linkedin`;
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local?populate=*`, {
      identifier: email,
      password,
    });

    const { jwt, user } = response.data;
    localStorage.setItem("token", jwt);

    if (user) {
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=devices`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      
      await trackDevice(user.id, rememberMe, jwt, userResponse.data.devices);
      dispatch(checkUserStatus())
      router.push('/');
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed. Please try again.");
  }
};
  return (
    <AuthLayout
      title="Nice To See You Again"
      showSocialLogin={true}
    >
      <form onSubmit={handleSubmit}>
        <div className="text-525 flex flex-col gap-4 mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-5">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="text-[#989898]">
              Remember me
            </label>
          </div>
          <Link href="/login/reset-password" className="text-[#007AFF] text-xs">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-md cursor-pointer text-white md:text-xl bg-green font-semibold py-[15px] mb-6 "
        >
          Signin
        </button>
        <hr className="border-t border-[#B6B6B6] w-full " />
<Link href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`}>
        <button
          type="button"
          className="w-full rounded-md cursor-pointer text-white md:text-xl bg-3d3 font-semibold py-2.5 mb-4 mt-7 flex justify-center items-center gap-3"
          >
          <Image
            src="/assets/googleIcon.svg"
            alt="google icon"
            width={28}
            height={29}
            className="w-[28px] h-[29px]"
          /> Sign in with Google
        </button>
            </Link>

        <button
          type="button"
          onClick={handleLinkedInLogin}
          className="w-full rounded-md cursor-pointer text-525 md:text-xl shad bg-white font-semibold py-2.5 mb-6 flex justify-center items-center gap-3"
        >
          <span className="h-[28px] w-[28px] flex justify-center items-center rounded-full bg-blue-500">
            <LinkedinIcon color="#ffffff" width={20} height={20} />
          </span>
          Sign in with LinkedIn
        </button>

        <p className="capitalize text-525 text-xs text-center">
          Don't have an account?{" "}
          <Link href="/login/register" className="text-[#007AFF]">
            Sign up now
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
