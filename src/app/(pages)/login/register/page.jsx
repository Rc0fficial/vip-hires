// app/login/register/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const generateUniqueUsername = (email) => {
    // Extract the part before @ from email
    const baseUsername = email.split('@')[0];
    // Add a random 4-digit number to ensure uniqueness
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${baseUsername}_${randomSuffix}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        username: generateUniqueUsername(email), // Auto-generate username
        email,
        password
      });

      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      router.push("/login/create-account");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed. Please try again.");
    }
  }
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`;
  };

  const handleLinkedInLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/linkedin`;
  };

  return (
    <AuthLayout
      title={
        <>
          welcome to <span className="text-green mr-1">Job</span>Pilot....
        </>
      }
      showSocialLogin={true}
    >
      <form onSubmit={handleSubmit}>
        <div className="text-525 flex flex-col gap-4 mb-4">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            name="confirm-password"
            type="password"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md text-white md:text-xl bg-green font-semibold py-[15px] mb-6"
        >
          Signup
        </button>
        <hr className="border-t border-[#B6B6B6] w-full " />

        <button
          type="button"
          onClick={handleGoogleLogin}
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
          Already have an account?{" "}
          <Link href="/login" className="text-[#007AFF]">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
