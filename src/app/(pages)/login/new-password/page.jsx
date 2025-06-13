// app/login/new-password/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const router = useRouter();
  const params = useSearchParams()
  const  code  = params.get('code');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`, {
        code,
        password,
        passwordConfirmation: confirmPassword,
      });
      router.push('/login');
    } catch (err) {
      setError('Error resetting password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <AuthLayout
      title="Create a new password"
      subtitle="enter your new password"
    >
      <form onSubmit={handleSubmit}>
        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Confirm Password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md cursor-pointer text-white text-xl bg-green font-semibold py-[15px] mb-12"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </AuthLayout>
  );
}