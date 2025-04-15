"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Notify from "@/components/common/Notify";
import { FiChevronRight, FiChevronLeft, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const JobsLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (route) => {
    if (route === "/jobs/ai-jobs") {
      router.push("/jobs");
    } else {
      router.push(route);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="bg-bggreen"> 
      <div className="bg-bggreen sticky top-0 z-10 px-4 md:px-16 mx-auto">
        

        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
          {/* Desktop Sidebar - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:flex flex-col sticky top-[0px] h-[75vh]">
            <div className="flex flex-col justify-between gap-10 h-full">
              <div>
                <div className="py-5 px-6 rounded-md shad mb-6 bg-white mont font-semibold text-525">
                  Jobs
                </div>
                <div className="flex flex-col gap-6 border-l-4 border-[#C5DDFB]">
                  {/* Recommended Jobs */}
                  <div className={`pl-4 border-l-4 ${pathname === "/jobs" ? "border-l-green" : "border-l-[#C5DDFB]"} -ml-1`}>
                    <button
                      onClick={() => handleNavigation("/jobs")}
                      className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                        pathname === "/jobs" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                    >
                      Recommended Jobs
                    </button>
                  </div>

                  {/* AI Jobs (Disabled) */}
                  <div className={`pl-4 border-l-4 ${pathname === "/jobs/ai-jobs" ? "border-l-green" : "border-l-[#C5DDFB]"} -ml-1`}>
                    <button
                      disabled
                      className="capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md bg-transparent mont font-semibold text-gray cursor-not-allowed"
                    >
                      AI Jobs <span className="py-2 px-3 text-sm rounded-full bg-[#D1D1D14D]">Coming Soon</span>
                    </button>
                  </div>

                  {/* My Applications */}
                  <div className={`pl-4 border-l-4 ${pathname === "/jobs/my-applications" ? "border-l-green" : "border-l-[#C5DDFB]"} -ml-1`}>
                    <button
                      onClick={() => handleNavigation("/jobs/my-applications")}
                      className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                        pathname === "/jobs/my-applications" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                    >
                      My Applications
                    </button>
                  </div>

                  {/* Saved Jobs */}
                  <div className={`pl-4 border-l-4 ${pathname === "/jobs/saved-jobs" ? "border-l-green" : "border-l-[#C5DDFB]"} -ml-1`}>
                    <button
                      onClick={() => handleNavigation("/jobs/saved-jobs")}
                      className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                        pathname === "/jobs/saved-jobs" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                    >
                      Saved Jobs
                    </button>
                  </div>
                </div>
              </div>
              <Notify className="-mb-10" />
            </div>
          </div>

          {/* Main Content */}
          <div className={`col-span-1 lg:col-span-2 rounded-3xl h-fit overflow-y-auto ${
            pathname === "/jobs/my-applications" ? "" : "py-10 px-4 md:px-12 bg-white shad"
          }`}>
            {children}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default JobsLayout;