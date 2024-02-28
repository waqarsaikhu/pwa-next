import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks";
import { fetchUsers } from "@/redux/userSlice";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { auth } from "../../firebase.config";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.users);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const filteredClients = user
    ? user.reduce((acc: any, user) => {
      const filtered = user.clients.filter((client) =>
        client.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return [...acc, ...filtered];
    }, [])
    : [];

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
      <div className="flex flex-col justify-center items-center bg-[#FFF] mb-[10px]">
        <div className="flex justify-between mt-[28px] w-[100%] h-[40px] border-b-[1px]">
          <span
            className="md:ml-[28px] ml-[15px] w-[14px] h-[14px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </span>
          <span className="ml-[79px] text-[18px] font-bold">TAILOR BOOK</span>
          <span className="ml-[79px] w-[14px] h-[14px] md:mr-[29px] mr-[15px]">
            <NotificationsNoneOutlinedIcon />
          </span>
        </div>
        <div className="flex h-[30px] mt-[10px]">
          <div className="relative ">
            <input
              className="rounded-[5px] border md:w-[300px] w-[350px] h-full p-2"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 right-1 m-1 mt-2 flex items-center pointer-events-none text-gray-300">
              <SearchIcon fontSize="small" />
            </div>
          </div>
          <span className=" mt-[5px] text-sm">
            <FilterListIcon fontSize="small" />
          </span>
        </div>
        {filteredClients.length > 0 ? (
          filteredClients.map((client: any, index: number) => (
            <div
              key={index}
              className="flex flex-grow relative items-center md:w-[334px] w-[95%] bg-[#f8f8f8] mt-[10px] p-3 rounded-[19px] cursor-pointer "
              style={{
                overflowY: "auto",
              }}
              onClick={() => {
                router.push({
                  pathname: "/client-info",
                  query: client,
                });
              }}
            >
              <div className="bg-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">
                {client.clientName[0]}
              </div>
              <div className="flex flex-col">
                <span
                  className="font-bold text-[12px] cursor-pointer "
                  onClick={() => {
                    router.push({
                      pathname: "/client-info",
                      query: client,
                    });
                  }}
                >
                  {client.clientName}
                </span>
                <span
                  className="text-[#939393] text-[10px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Set delivery date now");
                  }}
                >
                  Set delivery date now
                </span>
              </div>
              <div className=" absolute right-[15px] text-center">
                <div className="w-[68px] flex justify-center items-center h-[18px] text-[9px] bg-[#939393] rounded-[7px] text-white  text-center">
                  <button
                    className=""
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Order Completed");
                    }}
                  >
                    Complete
                  </button>
                </div>
                <span className=" text-[#000] text-[9px] font-bold text-center">
                  {client.deliveryDate}{" "}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen flex justify-center items-center">
            <div className="text-center mb-[300px]">
              <span className="text-lg text-gray-300">No Data</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center fixed bottom-[97px] md:right-[24px] right-[8px] w-[54px] h-[54px] rounded-full bg-slate-100">
          <Link href="/new-client">
            <Button>
              <span className="text-black">
                <PersonAddAltOutlinedIcon />
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex fixed bottom-0  items-center justify-center h-[78px] bg-[#F8F8F8] w-[100%] ">
          <div className="flex ml-[21px] items-center h-[44px] my-[17px] border-r-2  ">
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
