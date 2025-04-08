"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Notify from "@/components/common/Notify";
import Modal from "@/components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/app/Store/ReduxSlice/modalSlice";
import TextEditor from "@/components/TextEditor";

const PostLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  const handleCloseModal = () => dispatch(closeModal());
  const handleSave = () => dispatch(closeModal());
  
  const handleNavigation = (route) => {
    if (route === "/jobs/ai-jobs") {
      router.push("/jobs");
    } else {
      router.push(route);
    }
  };

  return (
    <div className="bg-bggreen relative">
      <div className="bg-bggreen overflow-y-auto px-12 md:px-16 mx-auto">
        <div className="w-full mx-auto grid grid-cols-1 gap-10 py-10 lg:grid-cols-3">
          {/* Left Sidebar - Sticky with scrollable content */}
          <div className="col-span-1 sticky top-[0px] h-[75vh]">
            <div className="flex flex-col justify-between h-full  gap-10 rounded-3xl">
              <div className="w-full">
                <div className="py-5 px-6 rounded-md shad mb-6 bg-white mont font-semibold text-525">
                  Posts
                </div>
                <div className="flex flex-col gap-6 border-l-4 border-[#C5DDFB]">
                  {/* Recommended Posts */}
                  <div
                    className={`pl-4 border-l-4 cursor-pointer ${
                      pathname === "/posts" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                  >
                    <button
                      onClick={() => handleNavigation("/posts")}
                      className={`capitalize w-full cursor-pointer text-start max-w-[250px] py-3 px-6 rounded-md ${
                        pathname === "/posts" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                    >
                      Recommended Posts
                    </button>
                  </div>

                  {/* Draft Posts */}
                  <div
                    className={`pl-4 border-l-4 cursor-pointer ${
                      pathname === "/posts/draft-posts" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                  >
                    <button
                      onClick={() => handleNavigation("/posts/draft-posts")}
                      className={`capitalize w-full cursor-pointer text-start max-w-[250px] py-3 px-6 rounded-md ${
                        pathname === "/posts/draft-posts" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                    >
                      Draft Posts
                    </button>
                  </div>

                  {/* my Applications */}
                  <div
                    className={`pl-4 border-l-4 cursor-pointer ${
                      pathname === "/posts/my-applications" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                  >
                    <button
                      onClick={() => handleNavigation("/posts/my-applications")}
                      className={`capitalize w-full cursor-pointer text-start max-w-[250px] py-3 px-6 rounded-md ${
                        pathname === "/posts/my-applicatons" ? "bg-green text-white" : "bg-transparent text-gray"
                      } mont font-semibold`}
                    >
                      My Applications
                    </button>
                  </div>
                  
                  {/* AI Jobs (Disabled) */}
                  <div
                    className={`pl-4 border-l-4 ${
                      pathname === "/posts/ai-posts" ? "border-l-green" : "border-l-[#C5DDFB]"
                    } -ml-1`}
                  >
                    <button
                      disabled
                      className="capitalize w-full text-start max-w-[250px] py-3 px-6 rounded-md bg-transparent mont font-semibold text-gray cursor-not-allowed"
                    >
                      AI Posts <span className="py-2 px-3 text-sm rounded-full bg-[#D1D1D14D] text-nowrap">Coming Soon</span>
                    </button>
                  </div>
                </div>
              </div>
              <Notify className="-mb-10" />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2 rounded-3xl shad bg-white py-10 px-12 h-[calc(100vh-116px)] overflow-y-auto">
            {children}
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} id="Post">
          <div className='flex flex-wrap gap-4'>
            <TextEditor/>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PostLayout;