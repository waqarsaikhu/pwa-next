import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";
import MeasurmentTable from "@/components/MeasurmentTable";
import Modal from "../../components/MeasurementForm";
import { useRouter } from "next/router";
import { auth, firestore } from "../../firebase.config";
import { collection, doc, addDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface ItemProps {
  name: string;
  onMeasurementSubmit: (
    measurements: Record<string, number>,
    itemName: string
  ) => void;
}

const measurementMap: { [key: string]: string[] } = {
  Shirt: ["Collar", "Sleeve", "Chest", "Length", "Teera"],
  Pants: ["Length", "Waist", "Hip", "Arouund Leg", "Around Knee", "Mori"],
  Coat: ["Collar", "Sleeve", "Chest", "Length", "Teera"],
  Trouser: ["Length", "Waist", "Hip", "Around Leg", "Around Knee", "Mori"],
};
const Item: React.FC<ItemProps> = ({ name, onMeasurementSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState(name);
  //@ts-ignore
  const measurements = measurementMap[name];

  const openModal = (itemName: string) => {
    setIsModalOpen(true);
    setItemName(itemName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMeasurementSubmit = async (
    measurements: Record<string, number>,
    itemName: string,
    submitCallback: (
      measurements: Record<string, number>,
      itemName: string
    ) => void
  ) => {
    console.log("Measurement Data:", measurements);
    submitCallback(measurements, itemName);
  };

  return (
    <div className="flex flex-col justify-center items-center ml-[18px] mt-[35px] mb-[19px]">
      <span className="text-[10px] text-[#5E8EDA] text-center">Set Price</span>
      <button
        onClick={() => openModal(name)}
        className="w-16 h-16 bg-gray-300 rounded-full"
      ></button>
      <span className="text-[12px] text-[#595959]">{name}</span>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        measurements={measurements}
        itemName={itemName}
        onMeasurementSubmit={(measurements) =>
          handleMeasurementSubmit(measurements, name, onMeasurementSubmit)
        }
      />
    </div>
  );
};
const items = ["Shirt", "Pants", "Coat", "Trouser"];

const ClientDetails = () => {
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [remindDate, setRemindDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [advancePayment, setAdvancePayment] = useState("");
  const [dueAmount, setDueAmount] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [savedMeasurements, setSavedMeasurements] = useState<
    Record<string, number>
  >({});

  const handleMeasurementSubmit = (
    measurements: Record<string, number>,
    itemName: string
  ) => {
    console.log("Item Name:", itemName);
    setSavedMeasurements((prevState: any) => ({
      ...prevState,
      [itemName]: measurements,
    }));
    setSelectedItem(itemName);
    console.log("Received measurements data:", measurements);
  };

  const handleDeliveryDate = (date: Date | null) => {
    setDeliveryDate(date);
  };
  const handleRemindDate = (date: Date | null) => {
    setRemindDate(date);
  };
  const handleTotalAmount = () => {
    const totalAmount = prompt("Total Amount:");
    if (totalAmount) {
      setTotalAmount(totalAmount);
      const due = parseFloat(totalAmount) - parseFloat(advancePayment);
      setDueAmount(due.toString());
    }
  };
  const handleAdvancePayment = () => {
    const advancePayment = prompt("Total Amount:");
    if (advancePayment) {
      setAdvancePayment(advancePayment);
      const due = parseFloat(totalAmount) - parseFloat(advancePayment);
      setDueAmount(due.toString());
    }
  };

  const router = useRouter();
  const clientData = router.query;
  const [startIndex, setStartIndex] = useState(0); // Start from the first item

  const handleNext = () => {
    if (startIndex < items.length - 3) setStartIndex(startIndex + 1);
  };
  const handleBack = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleClient = async (e: any) => {
    e.preventDefault();
    const userId = auth.currentUser?.uid;
    // @ts-ignore
    const userDocRef = doc(firestore, "users", userId);
    const clientsCollectionRef = collection(userDocRef, "clients");

    // Format dates
    const formatDate = (date: any) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const deliveryDateString = deliveryDate ? formatDate(deliveryDate) : null;
    const remindDateString = remindDate ? formatDate(remindDate) : null;

    // Save client data
    const clientInfo = {
      clientName: clientData.clientName,
      clientNumber: clientData.clientNumber,
      clientAddress: clientData.clientAddress,
      clientGender: clientData.clientGender,
      deliveryDate: deliveryDateString,
      remindDate: remindDateString,
      totalAmount: totalAmount,
      advancePayment: advancePayment,
      dueAmount: dueAmount,
      clientImage: clientData.clientImage || null,
      clothImage: clientData.clothImage || null,
    };

    const clientDocRef = await addDoc(clientsCollectionRef, clientInfo);
    console.log("Client saved successfully.........");

    // Iterate over saved measurements and save them to Firebase
    Object.entries(savedMeasurements).forEach(async ([measurements]) => {
      const measurementsCollectionRef = collection(
        clientDocRef,
        "measurements"
      );
      const measurementsData = {
        measurements: measurements,
      };
      await addDoc(measurementsCollectionRef, measurementsData);
    });

    router.push("/home");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#FFF] mb-[10px]">
        <div className=" w-screen bg-[#F8F8F8] border-b-[1px] mt-[0px] rounded-t-[5px] mx-aut0">
          <div className="mt-[32px] ml-[25px]">
            <Link href="/home">
              <Button>
                <span className="text-black">
                  <ArrowBackIosNewIcon fontSize="small" />
                  Back
                </span>
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <span className="text-[18px] font-bold text-center">
              {clientData.clientName}{" "}
            </span>
          </div>
          <div>
            <span className="absolute right-[30px] top-[32px] flex">
              <MoreVertIcon />
            </span>
          </div>
          <div className="flex justify-center mt-[24px] mb-[18px] ">
            <div className="text-center">
              {clientData.clientImage && (
                <img
                  //@ts-ignore
                  src={clientData.clientImage}
                  alt="Client Image"
                  className="w-[110px] h-[110px] rounded-full bg-gray-300"
                />
              )}
              <div className="mt-[7px] text-[12px] text-[#595959]">
                Client Photo
              </div>
            </div>
            <div className="text-center ml-[65px]">
              {clientData.clothImage && (
                <img
                  //@ts-ignore
                  src={clientData.clothImage}
                  alt="Client Image"
                  className="w-[110px] h-[110px] rounded-full bg-gray-300"
                />
              )}

              <div className="mt-[7px] text-[12px] text-[#595959]">
                Cloth Photo
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[300px] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
            <span className="text-[11px] text-[#000] ml-[15px]">
              {clientData.clientAddress}{" "}
            </span>
          </div>
          <div className="w-[300px] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
            <span className="text-[11px] text-[#000] ml-[15px]">
              Delivery Date
            </span>
            <DatePicker
              selected={deliveryDate}
              onChange={handleDeliveryDate}
              dateFormat="yyyy-MM-dd"
              className="text-[10px] ml-[150px] items-center w-[50px] text-[#5E8EDA] cursor-pointer"
              placeholderText="Set Date"
            />
          </div>
          <div className="w-[300px] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
            <span className="text-[11px] text-[#000] ml-[15px]">
              Remind Date
            </span>
            <DatePicker
              selected={remindDate}
              onChange={handleRemindDate}
              dateFormat="yyyy-MM-dd"
              className="text-[10px] ml-[150px] items-center w-[50px] text-[#5E8EDA] cursor-pointer"
              placeholderText="Set Date"
            />
          </div>
        </div>

        <span className="text-[11px] mt-[18px] text-[#000]">
          Payment Status
        </span>
        <div className="flex flex-row w-[311px] h-[52px] bg-[#F8F8F8] rounded-[19px]">
          <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
            <span className="text-[10px] text-center text-[#000]">
              Total Amount
            </span>
            <span
              className="text-[10px] text-center text-[#939393] cursor-pointer"
              onClick={handleTotalAmount}
            >
              {totalAmount || "0.0"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-[100px] h-[15px] mt-[20px] ml-[15px]">
            <span className="text-[10px] text-center text-[#000]">
              Advance Payment
            </span>
            <span
              className="text-[10px] text-center text-[#939393] cursor-pointer"
              onClick={handleAdvancePayment}
            >
              {advancePayment || "0.0"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
            <span className="text-[10px] text-center text-[#FF0000]">
              Due Amount
            </span>
            <span className="text-[10px] text-center text-[#FF0000] cursor-pointer">
              {dueAmount || "0.0"}
            </span>
          </div>
        </div>
        <div className="bg-[#F8F8F8] items-center justify-center rounded-[19px] w-[314px] h-[172px] flex flex-row mt-[29px]">
          {startIndex > 0 && (
            <button
              onClick={handleBack}
              className="ml-1 text-[10px] h-[20px] p-1 text-black rounded"
            >
              <NavigateBeforeIcon fontSize="small" />
            </button>
          )}
          {items.slice(startIndex, startIndex + 3).map((item) => (
            <Item
              key={item}
              name={item}
              onMeasurementSubmit={handleMeasurementSubmit}
            />
          ))}
          {startIndex < items.length - 3 && (
            <button
              onClick={handleNext}
              className="ml-1 text-[10px] h-[20px] p-1 text-black rounded"
            >
              <NavigateNextIcon fontSize="small" />
            </button>
          )}
        </div>
        <span className="text-[11px] mt-[16px] text-[#000]">Measurements</span>
        <MeasurmentTable />
        <div className="w-[311px] h-[58px] rounded-[19px] mt-[7px] bg-[#F8F8F8]">
          <span className="text-[10px] mt-[3px] ml-[12px]">Notes: </span>
        </div>
        <div className="mt-[24px]">
          <Button variant="outlined" size="small">
            Invoice
          </Button>
          <Link href="/home">
            <Button
              className="!bg-primary !ml-[8px]"
              variant="contained"
              size="small"
              onClick={handleClient}
            >
              Save
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
