import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { doc, setDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../../firebase.config";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { TextField, InputAdornment, MenuItem, Button } from "@mui/material";
import { useAppDispatch } from "@/hooks";

const NewClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState("");
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    clientNumber: "",
    clientGender: "",
    clientImage: null,
    clothImage: null,
  });
  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    console.log("File input changed:", files);
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        name === "clientImage" || name === "clothImage" ? files[0] : value,
    }));
  };

  const handleFormData = async () => {
    try {
      const storage = getStorage();
      const uid = auth.currentUser?.uid;

      if (!formData.clientImage || !formData.clothImage) {
        console.error("Both images are required.");
        return { clientImageURL: null, clothImageURL: null };
      }

      const clientImageRef = ref(storage, `client_images/${uid}`);
      await uploadBytes(clientImageRef, formData.clientImage);

      const clothImageRef = ref(storage, `cloth_images/${uid}`);
      await uploadBytes(clothImageRef, formData.clothImage);

      const clientImageURL = await getDownloadURL(clientImageRef);
      const clothImageURL = await getDownloadURL(clothImageRef);
      console.log("client Image: ", clientImageURL);
      console.log("cloth Image: ", clothImageURL);

      setFormData((prevData: any) => {
        const updatedData = {
          ...prevData,
          clientImage: clientImageURL,
          clothImage: clothImageURL,
        };
        console.log("Form Data: ", updatedData);

        router.push({
          pathname: "/client-details",
          query: updatedData,
        });

        return updatedData;
      });
    } catch (error: any) {
      console.error("Error uploading images:", error.message);
      setImageError("Error uploading images");
      return { clientImageURL: null, clothImageURL: null };
    }
  };

  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-[20px]">
        <div className="absolute top-0 w-screen  h-[105px] bg-[#F8F8F8] border-b-[1px] rounded-t-[5px] mx-aut0">
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
              New Client
            </span>
          </div>
          <div>
            <span className="absolute right-[30px] flex top-[32px]">
              <MoreVertIcon />
            </span>
          </div>
        </div>
        <div className="flex flex-col md:mt-[175px] mt-[120px] w-[284px] mx-[38px]">
          <TextField
            label="Client Name"
            name="clientName"
            variant="standard"
            value={formData.clientName}
            onChange={handleInputChange}
          />
          <TextField
            label="Client Address"
            name="clientAddress"
            variant="standard"
            className="!mt-[20px]"
            value={formData.clientAddress}
            onChange={handleInputChange}
          />
          <TextField
            className="!mt-[20px]"
            label="Phone No"
            name="clientNumber"
            variant="standard"
            value={formData.clientNumber}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>
                    <AccountBoxIcon />
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="!mt-[27px]"
            id="standard-select-gender"
            select
            name="clientGender"
            helperText="Please select your Gender"
            variant="standard"
            value={formData.clientGender}
            onChange={handleInputChange}
          >
            {gender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <div className="mt-[27px]">
            <label className="block text-[12px] text-[#595959] mb-1">
              Client Photo
            </label>
            <input
              type="file"
              name="clientImage"
              accept="image/*"
              className=" p-2 outline-none"
              // @ts-ignore
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-[27px] w-[360px]">
            <label className="block text-[12px] text-[#595959] mb-1">
              Cloth Photo
            </label>
            <input
              type="file"
              name="clothImage"
              accept="image/*"
              className=" p-2 outline-none"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mt-[34px]">
          <Button
            onClick={handleFormData}
            className="!bg-black !hover:bg-black !w-[224px] !h-[34px] !text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewClient;
