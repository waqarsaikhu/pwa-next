import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  return (
    <>
      <div className="items-center flex flex-col h-[screen] md:w-md">
        <div className="flex justify-center mt-[28px] w-[100%] h-[40px] border-b-[1px]">
          <span className="ml-[28px] w-[14px] h-[14px]">
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
        <div className="flex items-center justify-center fixed bottom-[97px] right-[24px] w-[54px] h-[54px] rounded-full bg-slate-200">
          <span className="">
            <PersonAddAltOutlinedIcon />
          </span>
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
      </div>
    </>
  );
};

export default Home;
