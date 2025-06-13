// app/login/reset-password/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`, {
        email,
      });
      // Redirect to verify email page
      router.push('/login/verify-email');
    } catch (err) {
      setError('Error sending reset link. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md cursor-pointer text-white md:text-xl bg-green font-semibold py-[15px] mb-12"
        >
           {loading ? 'Sending...' : 'Send Reset Link'}
        </button>


      </form>
    </AuthLayout>
  );
}