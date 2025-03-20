"use client";
import { useState } from "react";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import { useRouter } from "next/navigation";

const MODE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
  CREATE_NEW_PASSWORD: "CREATE_NEW_PASSWORD",
};

const LoginLayout = () => {
  const [mode, setMode] = useState(MODE.LOGIN);
const router = useRouter()
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(mode === "RESET_PASSWORD"){
      setMode("EMAIL_VERIFICATION")
    }else if(mode ==="EMAIL_VERIFICATION"){
      setMode("CREATE_NEW_PASSWORD")
      
    }else if(mode ==="CREATE_NEW_PASSWORD"){
      setMode("LOGIN")
    }else if(mode ==="LOGIN"){
      router.push('/login/create-account')
    }
  }

  return (
    <div className="">
      <div className="container mx-auto px-6 py-8 flex gap-12 justify-center ">
        {/* Left Section */}
        <div className="py-32 hidden lg:flex flex-col gap-4 text-white">
          <h1 className="flex items-center gap-2 text-5xl font-semibold mont text-white">
            Apply <span className="text-green ">Pro</span>{" "}
            <img src="/assets/logoArrow.png" alt="arror" className="w-10 h-10" />
          </h1>
          <p className="text-2xl font-medium">
            We Apply. You <span className="text-green">Succeed.</span>
          </p>
          <p className="max-w-[858px] text-2xl">
            ApplyPro simplifies your job search by applying on your behalf,
            optimizing your profile, and providing AI-driven job matches. Get
            hired faster with expert career support! 🚀
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-bggreen z-20 px-[56px] h-full py-40 max-h-[800px] flex flex-col justify-center w-full max-w-[459px] rounded-3xl">
          <form>
            <h1 className="text-black text-xl font-semibold mb-6 capitalize" >
              {mode === MODE.LOGIN && "Nice To See You Again"}
              {mode === MODE.REGISTER && <>
                welcome to <span className="text-green">Job</span>Pilot....
              </>}
              {mode === MODE.RESET_PASSWORD && <>forgetting your password!
              
              <br/>
              <span className="text-sm text-[#99A1AF] capitalize">enter your email to receive verification code</span>
              </>}
              {mode === MODE.EMAIL_VERIFICATION &&  <>OTP Code
              
              <br/>
              <span className="text-sm text-[#99A1AF] capitalize">enter OTP code you received</span>
              </>}
              {mode === MODE.CREATE_NEW_PASSWORD &&  <>Create a new password
              
              <br/>
              <span className="text-sm text-[#99A1AF] capitalize">enter your new password</span>
              </>}
            </h1>

            {/* Form Fields */}
            <div className="text-525 flex flex-col gap-4 mb-4">
              {mode === MODE.LOGIN || mode === MODE.REGISTER || mode === MODE.RESET_PASSWORD ? (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
                    placeholder="Enter Email"
                  />
                </>
              ) : null}
            </div>

            {mode === MODE.LOGIN || mode === MODE.REGISTER || mode === MODE.CREATE_NEW_PASSWORD ? (
              <div className="text-525 flex flex-col gap-4 mb-5">
                <label htmlFor="password">{mode === MODE.CREATE_NEW_PASSWORD ? "New Password" : "Password"}</label>
                <input
                  type="password"
                  className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
                  placeholder="Enter Password"
                />
              </div>
            ) : null}

            {mode === MODE.REGISTER || mode === MODE.CREATE_NEW_PASSWORD ? (
              <div className="text-525 flex flex-col gap-4 mb-5">
                <label htmlFor="confirm-password">{mode === MODE.CREATE_NEW_PASSWORD ? "Confirm New Password" : "Confirm Password"}</label>
                <input
                  type="password"
                  className="px-4 py-3 rounded-md bg-transparent focus:outline-0 border border-[#BDBDBD]"
                  placeholder="Confirm Password"
                />
              </div>
            ) : null}

            {mode === MODE.EMAIL_VERIFICATION ? (
              <div className="flex justify-between gap-2 mb-5">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-10 h-12 text-center text-lg border border-[#BDBDBD] rounded-md bg-transparent focus:outline-0"
                    placeholder="-"
                  />
                ))}
              </div>
            ) : null}

            {mode === MODE.LOGIN && (
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-5">
                  <input type="radio" className="h-4 w-4" />
                  <label htmlFor="remember" className="text-[#989898]">
                    Remember me
                  </label>
                </div>
                <p className="text-[#007AFF] text-xs cursor-pointer" onClick={() => setMode(MODE.RESET_PASSWORD)}>
                  Forgot Password?
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button onClick={handleSubmit} className="w-full rounded-md text-white text-xl bg-green font-semibold py-[15px] mb-12">
              {mode === MODE.LOGIN && "Signin"}
              {mode === MODE.REGISTER && "Signup"}
              {mode === MODE.RESET_PASSWORD && "Send"}
              {mode === MODE.EMAIL_VERIFICATION && "Verify Code"}
              {mode === MODE.CREATE_NEW_PASSWORD && "Create"}
            </button>

            {/* Social Login Buttons (Only in Login) */}
            {(mode === MODE.LOGIN ||mode === MODE.REGISTER) && (
              <>
                <button className="w-full rounded-md text-white text-xl bg-3d3 font-semibold py-2.5 mb-4 flex justify-center items-center gap-3">
                  <img src="/assets/googleIcon.svg" alt="" /> Sign in with Google
                </button>
                <button className="w-full rounded-md text-525 text-xl bg-white font-semibold py-2.5 mb-6 flex justify-center items-center gap-3">
                  <span className="h-[28px] w-[28px] flex justify-center items-center rounded-full bg-blue-500">
                    <LinkedinIcon color={"#ffffff"} width={20} height={20} />
                  </span>{" "}
                  Sign in with LinkedIn
                </button>
              </>
            )}

            {/* Switch Modes */}
            {mode === MODE.LOGIN ? (
              <p className="capitalize text-525 text-xs text-center">
                Don't have an account?{" "}
                <span className="text-[#007AFF] cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>
                  Sign up now
                </span>
              </p>
            ) : mode === MODE.REGISTER ? (
              <p className="capitalize text-525 text-xs text-center">
                Already have an account?{" "}
                <span className="text-[#007AFF] cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
                  Sign in
                </span>
              </p>
            ) : mode === MODE.RESET_PASSWORD ? (
              <p className="capitalize text-525 text-xs text-center">
                Remember your password?{" "}
                <span className="text-[#007AFF] cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
                  Sign in
                </span>
              </p>
            ) : mode === MODE.EMAIL_VERIFICATION ? (
              <p className="capitalize text-525 text-xs text-center">
                didn't get the verification code yet  ?{" "}
                <span className="text-[#007AFF] cursor-pointer">Resend Code</span>
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
