// app/login/verify-email/page.js
"use client";
import { AuthLayout } from "@/components/Auth";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function EmailVerificationPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/login/new-password');
  };

  return (
    <Suspense fallback={<Spinner/>}>

    <AuthLayout
      title="Check Your Email"
      subtitle="We've sent a password reset link to your email address."
      >
        
     
      <p>Please check your inbox and follow the instructions.</p>
      <Link href={'/login'}>
      <p className="text-blue-700 cursor-pointer mt-5">Go to Login</p>
      </Link>
      
    </AuthLayout>
      </Suspense>
  );
}