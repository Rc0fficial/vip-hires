// app/login/reset-password/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/login/verify-email');
  };

  return (
    <AuthLayout
      title="forgetting your password!"
      subtitle="enter your email to receive verification code"
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

        <button
          type="submit"
          className="w-full rounded-md cursor-pointer text-white md:text-xl bg-green font-semibold py-[15px] mb-12"
        >
          Send
        </button>

        
      </form>
    </AuthLayout>
  );
}