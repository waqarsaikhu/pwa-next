import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../../firebase.config";
const Home = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signOutAndNavigate = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };
  return (
    <>
      <div className="items-center flex flex-col h-screen md:w-md">
        <div className="flex justify-center mt-[28px] w-[100%] h-[40px] border-b-[1px]">
          <span
            className="ml-[28px] w-[14px] h-[14px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </span>
          <span className="ml-[79px] text-[18px] font-bold">TAILOR BOOK</span>
          <span className="ml-[79px] w-[14px] h-[14px] mr-[29px]">
            <NotificationsNoneOutlinedIcon />
          </span>
        </div>
        <div className="flex h-[20px] mt-[10px]">
          <div className="relative ml-[25px]">
            <input
              className="rounded-[5px]  border w-[250px] h-full p-2"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 right-1 m-1 mt-2 flex items-center pointer-events-none text-gray-300">
              <SearchIcon fontSize="small" />
            </div>
          </div>
          <span className="ml-[10px] text-sm">
            <FilterListIcon fontSize="small" />
          </span>
        </div>
        <div className="flex mt-[160px]">
          <span className=" flex items-center justify-center text-gray-300">
            No Data
          </span>
        </div>
        <div className="flex items-center justify-center fixed bottom-[97px] right-[24px] w-[54px] h-[54px] rounded-full bg-slate-100">
          <Link href="/new-client">
            <Button>
              <span className="text-black">
                <PersonAddAltOutlinedIcon />
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex bottom-0 fixed items-center justify-center h-[78px] bg-[#F8F8F8] w-[100%] ">
          <div className="flex ml-[48px] items-center h-[44px] my-[17px] border-r-2  ">
            <span className="text-[16px] mr-[22px]">Pending</span>
          </div>
          <div className="flex ml-[21px] h-[44px] my-[17px] items-center border-r-2">
            <span className="text-[16px] mr-[22px] ">Completed</span>
          </div>
          <div className="flex ml-[21px] h-[44px] my-[17px] items-center">
            <span className="text-[16px] ">Customers</span>
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-100 z-10">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-black font-bold"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col items-center mt-20">
              <button
                onClick={signOutAndNavigate}
                className="text-black font-bold"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
