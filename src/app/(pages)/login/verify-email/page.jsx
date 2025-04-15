// app/login/verify-email/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import { useRouter } from "next/navigation";

export default function EmailVerificationPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/login/new-password');
  };

  return (
    <AuthLayout
      title="OTP Code"
      subtitle="enter OTP code you received"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2 mb-5">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-10 h-12 text-center md:text-lg border border-[#BDBDBD] rounded-md bg-transparent focus:outline-0"
              placeholder="-"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-md cursor-pointer text-white md:text-xl bg-green font-semibold py-[15px] mb-12"
        >
          Verify Code
        </button>

        <p className="capitalize text-525 text-xs text-center">
          didn't get the verification code yet?{" "}
          <a href="#" className="text-[#007AFF]">
            Resend Code
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}