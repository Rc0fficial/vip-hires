"use client"; // Ensure this is a Client Component

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Notify from "@/components/common/Notify";

const JobsLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = (route) => {
    if (route === "/jobs/ai-jobs") {
      // Redirect to recommended jobs if AI jobs is selected
      router.push("/jobs");
    } else {
      router.push(route);
    }
  };

  return (
    <div className="bg-bggreen">
      <div className="bg-bggreen overflow-y-auto px-12 md:px-16  mx-auto ">
        <div className="w-full mx-auto grid grid-cols-1 gap-10 py-10 lg:grid-cols-3">
          <div className="col-span-1 flex flex-col justify-between gap-10 rounded-3xl h-full">
            <div>

              <div className="py-5 px-6 rounded-md shad mb-6 bg-white mont font-semibold text-525">
                Jobs
              </div>
              <div className="flex flex-col gap-6 border-l-4 border-[#C5DDFB]">
                {/* Recommended Jobs */}
                <div
                  className={`pl-4  border-l-4 ${pathname === "/jobs" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                >
                  <button
                    onClick={() => handleNavigation("/jobs")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${pathname === "/jobs" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                  >
                    Recommended Jobs
                  </button>
                </div>

                {/* AI Jobs (Disabled) */}
                <div
                  className={`pl-4  border-l-4 ${pathname === "/jobs/ai-jobs" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                >
                  <button
                    //   onClick={() => handleNavigation("/jobs/ai-jobs")}
                    disabled
                    className="capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md bg-transparent mont font-semibold text-gray cursor-not-allowed"
                  >
                    AI Jobs <span className="py-2 px-3 text-sm rounded-full bg-[#D1D1D14D]">Coming Soon</span>
                  </button>
                </div>

                {/* My Applications */}
                <div
                  className={`pl-4  border-l-4 ${pathname === "/jobs/my-applications" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                >
                  <button
                    onClick={() => handleNavigation("/jobs/my-applications")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${pathname === "/jobs/my-applications" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                  >
                    My Applications
                  </button>
                </div>

                {/* Saved Jobs */}
                <div
                  className={`pl-4  border-l-4 ${pathname === "/jobs/saved-jobs" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                >
                  <button
                    onClick={() => handleNavigation("/jobs/saved-jobs")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${pathname === "/jobs/saved-jobs" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                  >
                    Saved Jobs
                  </button>
                </div>
              </div>
            </div>
            <Notify className={"-mb-10"}/>
          </div>

          {/* Main Content */}
          <div className={`col-span-2 rounded-3xl   ${pathname ==="/jobs/my-applications"?"":"py-10 px-12 bg-white shad"}  h-fit`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsLayout;