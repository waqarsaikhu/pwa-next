import React, { useEffect, ReactNode } from "react";
import { Button, Avatar } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchUsers } from "@/redux/userSlice";
import { useAppDispatch } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ClientInfo = () => {
  const user = useSelector((state: RootState) => state.user.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const router = useRouter();
  const clientData = router.query;
  const clientId = clientData.id;
  const allClients = user.flatMap((item: any) => item.clients);
  const clientInfo = allClients.find((client: any) => client.id === clientId);
  const clientMeasurements = clientInfo?.measurements || [];

  return (
    <>
      {clientInfo ? (
        <>
          <div className=" flex flex-col justify-center mb-[10px]">
            <div className="h-[114px] w-screen flex justify-center bg-[#F8F8F8] absolute top-0">
              <div className=" absolute top-[27px] left-0">
                <Link href="/home">
                  <Button>
                    <span className="text-black">
                      <ArrowBackIosNewIcon fontSize="small" />
                      Back
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-row">
                <div className="text-center mt-[87px] mr-[27px]">
                  <Avatar sx={{ bgcolor: "#939393", width: 42, height: 42 }}>
                    <span>
                      <ChatBubbleIcon fontSize="small" />
                    </span>
                  </Avatar>
                  <span className="text-[10px] text-[#6C6C6C]">Message</span>
                </div>
                <div className="mt-[63px] flex flex-col text-center">
                  <Avatar sx={{ bgcolor: "#6C6C6C", width: 87, height: 87 }}>
                    {clientInfo
                      ? typeof clientInfo.clientName === "string"
                        ? clientInfo.clientName
                            .split(" ")
                            .map((name: any) => name[0])
                            .join("")
                        : ""
                      : ""}
                  </Avatar>
                  <span className="text-[15px] font-bold text-[#000000] mt-[7px] ">
                    {clientInfo ? clientInfo.clientName : ""}
                  </span>
                  <span className="text-[12px] text-[#5E8EDA]">
                    {clientInfo ? clientInfo.clientNumber : ""}
                  </span>
                </div>
                <div className="text-center mt-[87px] ml-[27px]">
                  <Avatar sx={{ bgcolor: "#939393", width: 42, height: 42 }}>
                    <span>
                      <PhoneIcon fontSize="small" />
                    </span>
                  </Avatar>
                  <span className="text-[10px] text-[#6C6C6C]">Call</span>
                </div>
              </div>
              <div>
                <span className="absolute right-[5px] top-[32px] flex">
                  <MoreVertIcon />
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center mt-[209px]">
              <div className="md:w-[300px] w-[95%] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
                <span className="text-[11px] text-[#000] ml-[15px]">
                  {clientInfo ? clientInfo.clientAddress : ""}
                </span>
              </div>
              <div className="md:w-[300px] relative w-[95%] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
                <span className="text-[11px] text-[#000] ml-[15px]">
                  Delivery Date
                </span>
                <span className="text-[10px] md:ml-[160px] absolute right-2 text-[#5E8EDA]">
                  {clientInfo ? clientInfo.deliveryDate : ""}
                </span>
              </div>
              <div className="md:w-[300px] relative w-[95%] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
                <span className="text-[11px] text-[#000] ml-[15px]">
                  Remind Date
                </span>
                <span className="text-[10px] md:ml-[160px] absolute right-2 text-[#5E8EDA]">
                  {clientInfo ? clientInfo.remindDate : ""}
                </span>
              </div>
            </div>
            <div className="flex items-center flex-col justify-center">
              <span className="text-[11px] mt-[18px] text-[#000]">
                Payment Status
              </span>
              <div className="flex flex-row md:w-[311px] w-[95%] h-[52px] bg-[#F8F8F8] rounded-[19px]">
                <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
                  <span className="text-[10px] text-center text-[#000]">
                    Total Amount
                  </span>
                  <span className="text-[10px] text-center text-[#939393]">
                    {clientInfo ? clientInfo.totalAmount : ""} PKR
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center w-[100px] h-[15px] mt-[20px] ml-[50px]">
                  <span className="text-[10px] text-center text-[#000]">
                    Advance Payment
                  </span>
                  <span className="text-[10px] text-center text-[#939393]">
                    {clientInfo ? clientInfo.advancePayment : ""} PKR
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[50px]">
                  <span className="text-[10px] text-center text-[#FF0000]">
                    Due Amount
                  </span>
                  <span className="text-[10px] text-center text-[#FF0000]">
                    {clientInfo ? clientInfo.dueAmount : ""} PKR
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] mt-[16px] text-[#000]">
                Measurements
              </span>
              {clientMeasurements.map((item: any, index: number) => (
                <div
                  key={index}
                  className="mb-4 p-3 w-[300px] shadow-lg rounded-md bg-white"
                >
                  <h3 className="text-xl flex justify-center font-semibold text-[#000]">
                    {item.itemName}
                  </h3>
                  <div className="grid grid-cols-1 gap-10">
                    <div className="flex flex-col mt-2 justify-center text-gray-700">
                      <table>
                        <tbody>
                          {Object.entries(item.measurements).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="font-medium">{key}:</td>
                                <td className="flex justify-center items-center">
                                  {value as React.ReactNode}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="w-[311px] h-[58px] rounded-[19px] mt-[7px] bg-[#F8F8F8]">
                <span className="text-[10px] mt-[3px] ml-[12px]">Notes: </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-gray-500 border-solid h-24 w-24"></div>
        </div>
      )}
    </>
  );
};

export default ClientInfo;
