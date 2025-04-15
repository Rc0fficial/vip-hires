// app/login/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/login/create-account');
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
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-5">
            <input type="checkbox" className="h-4 w-4" />
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
        <hr className="border-t border-[#B6B6B6] w-full "/>
        <button className="w-full rounded-md text-white md:text-xl bg-3d3 font-semibold py-2.5 mb-4 mt-7 flex justify-center items-center gap-3">
                  <Image
                    src="/assets/googleIcon.svg"
                    alt="google icon"
                    width={28}
                    height={29}
                    className="w-[28px] h-[29px]"
                  /> Sign in with Google
                </button>
                <button className="w-full rounded-md text-525 md:text-xl shad bg-white font-semibold py-2.5 mb-6 flex justify-center items-center gap-3">
                  <span className="h-[28px] w-[28px] flex justify-center items-center rounded-full bg-blue-500">
                    <LinkedinIcon color={"#ffffff"} width={20} height={20} />
                  </span>{" "}
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