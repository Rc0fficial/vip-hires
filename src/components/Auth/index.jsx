"use client";
import Image from "next/image";
import LinkedinIcon from "@/components/Icons/LinkedinIcon.svg";
import FacecookIcon from "../Icons/FacebookIcon.svg";
import InstagramIcon from "../Icons/InstagramIcon";

export const AuthLayout = ({
  children,
  title,
  subtitle,
  showSocialLogin = false,
}) => {
  return (
    <div className=" flex flex-col justify-between loginbg min-h-screen overflow-y-auto w-screen overflow-hidden bg-no-repeat bg-cover bg-bottom">
      <div className="container mx-auto px-6 py-8 flex gap-12 justify-center">
        {/* Left Section */}
        <div className="py-32 hidden lg:flex flex-col gap-4 text-white">
          <h1 className="flex items-center gap-2 text-5xl font-semibold mont text-white">
            Apply <span className="text-green">Pro</span>{" "}
            <Image
              src="/assets/logoArrow.png"
              alt="arrow"
              width={40}
              height={40}
              className="w-10 h-10"
            />
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
        <div className="bg-bggreen z-20 px-4 md:px-[56px] h-full py-40 max-h-[800px] flex flex-col justify-center w-full max-w-[459px] rounded-3xl">
          <div>
            <h1 className="text-black text-xl font-semibold mb-6 capitalize">
              {title}
              {subtitle && (
                <>
                  <br />
                  <span className="text-sm text-[#99A1AF] capitalize">
                    {subtitle}
                  </span>
                </>
              )}
            </h1>

            {children}

            {/* Social Login Buttons */}
          </div>
        </div>
      </div>

      <div
        className={`py-8  bg-[#FFFFFF1A]  border-t border-gray w-screen overflow-x-hidden`}
      >
        <div className="container mx-auto px-6 md:px-10  flex justify-between flex-wrap gap-10 items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-semibold mont text-green">Pro</h1>
            <Image
              src="/assets/logoArrow.png"
              alt="Logo Arrow"
              width={24} // 6 * 4px = 24px
              height={24} // 6 * 4px = 24px
              className="w-6 h-6"
            />
          </div>
          <p className="">© 2019 All rights reserved to applypro</p>

          <div className="flex items-center gap-6">
            <div className="h-[45px] w-[45px] border-2 border-[#ffffff50] rounded-full flex justify-center items-center ">
              <LinkedinIcon color={"#ffffff"} height={13.5} width={13.5} />
            </div>
            <div className="h-[45px] w-[45px] border-2 border-[#ffffff50] rounded-full flex justify-center items-center ">
              <FacecookIcon color={"#ffffff"} height={13.5} width={13.5} />
            </div>
            <div className="h-[45px] w-[45px] border-2 border-[#ffffff50] rounded-full flex justify-center items-center ">
              <InstagramIcon color={"#ffffff"} height={13.5} width={13.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
