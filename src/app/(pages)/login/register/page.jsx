// app/login/register/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic
  };

  return (
    <AuthLayout
      title={
        <>
          welcome to <span className="text-green">Job</span>Pilot....
        </>
      }
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

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md text-white text-xl bg-green font-semibold py-[15px] mb-6"
        >
          Signup
        </button>
         <hr className="border-t border-[#B6B6B6] w-full "/>
                <button className="w-full rounded-md text-white text-xl bg-3d3 font-semibold py-2.5 mb-4 mt-7 flex justify-center items-center gap-3">
                          <Image
                            src="/assets/googleIcon.svg"
                            alt="google icon"
                            width={28}
                            height={29}
                            className="w-[28px] h-[29px]"
                          /> Sign in with Google
                        </button>
                        <button className="w-full rounded-md text-525 text-xl shad bg-white font-semibold py-2.5 mb-6 flex justify-center items-center gap-3">
                          <span className="h-[28px] w-[28px] flex justify-center items-center rounded-full bg-blue-500">
                            <LinkedinIcon color={"#ffffff"} width={20} height={20} />
                          </span>{" "}
                          Sign in with LinkedIn
                        </button>

        <p className="capitalize text-525 text-xs text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#007AFF]">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}