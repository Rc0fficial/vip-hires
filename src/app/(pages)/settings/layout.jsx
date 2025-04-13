"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Notify from "@/components/common/Notify";
import Modal from "@/components/common/Modal";
import SecurityModel from "./SecurityModel";
import InputField from "@/components/common/InputField";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const JobsLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [securityModel, setSecurityModel] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  // List of routes that require security verification
  const secureRoutes = [
    "/settings",
    "/settings/logged-in-devices",
    "/settings/remember-devices",
    "/settings/subscription",
    "/settings/payments"
  ];

  // Function to handle navigation with security check
  const handleNavigation = (route) => {
    if (secureRoutes.includes(route)) {
      setPendingRoute(route);
      setSecurityModel(true);
    } else {
      router.push(route);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Handle security verification success
  const handleSecurityVerified = () => {
    setSecurityModel(false);
    if (pendingRoute) {
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  };

  // Handle security modal close
  const handleCloseSecurityModel = () => {
    setSecurityModel(false);
    setPendingRoute(null);
  };

  return (
    <div className="bg-bggreen relative">
      <div className="bg-bggreen overflow-y-auto px-4 md:px-16 mx-auto">
       

        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
          {/* Desktop Sidebar - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:flex flex-col sticky top-[0px] h-[75vh]">
            <div>
              <div className="py-5 px-6 rounded-md shad mb-6 bg-white mont font-semibold text-525">
                Settings
              </div>
              <div className="flex flex-col gap-6 border-l-4 border-[#C5DDFB]">
                {/* sign in & security */}
                <div className={`pl-4 border-l-4 ${
                  (pathname === "/settings" || 
                   pathname === "/settings/logged-in-devices" ||
                   pathname === "/settings/remember-devices") 
                    ? "border-l-green" 
                    : "border-l-[#C5DDFB]"
                } -ml-1`}>
                  <button
                    onClick={() => handleNavigation("/settings")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                      (pathname === "/settings" || 
                       pathname === "/settings/logged-in-devices" ||
                       pathname === "/settings/remember-devices") 
                        ? "bg-green text-white" 
                        : "bg-transparent text-gray"
                    } mont font-semibold`}
                  >
                    sign in & security
                  </button>
                </div>

                {/* subscription settings */}
                <div className={`pl-4 border-l-4 ${
                  pathname === "/settings/subscription" 
                    ? "border-l-green" 
                    : "border-l-[#C5DDFB]"
                } -ml-1`}>
                  <button
                    onClick={() => handleNavigation("/settings/subscription")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                      pathname === "/settings/subscription" 
                        ? "bg-green text-white" 
                        : "bg-transparent text-gray"
                    } mont font-semibold`}
                  >
                    subscription settings
                  </button>
                </div>

                {/* Notifications */}
                <div className={`pl-4 border-l-4 ${
                  pathname === "/settings/notifications" 
                    ? "border-l-green" 
                    : "border-l-[#C5DDFB]"
                } -ml-1`}>
                  <button
                    onClick={() => handleNavigation("/settings/notifications")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                      pathname === "/settings/notifications" 
                        ? "bg-green text-white" 
                        : "bg-transparent text-gray"
                    } mont font-semibold`}
                  >
                    Notifications
                  </button>
                </div>

                {/* Payment Settings */}
                <div className={`pl-4 border-l-4 ${
                  pathname === "/settings/payments" 
                    ? "border-l-green" 
                    : "border-l-[#C5DDFB]"
                } -ml-1`}>
                  <button
                    onClick={() => handleNavigation("/settings/payments")}
                    className={`capitalize w-full text-start cursor-pointer max-w-[240px] py-3 px-6 rounded-md ${
                      pathname === "/settings/payments" 
                        ? "bg-green text-white" 
                        : "bg-transparent text-gray"
                    } mont font-semibold`}
                  >
                    Payment Settings
                  </button>
                </div>
              </div>
            </div>
            <Notify className={"-mb-10"}/>
          </div>

          {/* Main Content */}
          <div className={`col-span-1 lg:col-span-2 ${!isSidebarOpen && 'lg:ml-0'}`}>
            {children}
          </div>
        </div>

       

        {/* Security Model */}
        <SecurityModel 
          isOpen={securityModel} 
          onClose={handleCloseSecurityModel} 
          onSave={handleSecurityVerified} 
          id="Enter Password"
        >
          <div className="-mt-6">
            <h4 className="text-989 mb-6">For security reasons, please enter your password to continue.</h4>
            <div className="flex flex-col gap-6">
              <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </SecurityModel>
      </div>
    </div>
  );
};

export default JobsLayout;