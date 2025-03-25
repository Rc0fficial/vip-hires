// app/login/new-password/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import { useRouter } from "next/navigation";

export default function NewPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/login');
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
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="text-525 flex flex-col gap-4 mb-5">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md cursor-pointer text-white text-xl bg-green font-semibold py-[15px] mb-12"
        >
          Create
        </button>
      </form>
    </AuthLayout>
  );
}