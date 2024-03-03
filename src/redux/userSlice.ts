import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase.config";

// Define interfaces for Client and User
interface Client {
  id: string;
  advancePayment: string;
  clientAddress: string;
  clientGender: string;
  clientImage: string;
  clientName: string;
  clientNumber: string;
  clothImage: string;
  deliveryDate: string;
  dueAmount: string;
  remindDate: string;
  totalAmount: string;
  completed: boolean;
  measurements: any[]; // Define type for the 'measurements' property
}

interface User {
  [x: string]: any;
  id: string; // Assuming each user has an ID
  number: string; // Example property, update as needed
  clients: Client[]; // Define type for the 'clients' property
}

// Define interface for UserState
interface UserState {
  loading: boolean;
  users: User[];
  error: string;
}

// Define initial state for UserState
const initialState: UserState = {
  loading: false,
  users: [],
  error: "",
};

// Fetch users and their associated clients and measurements from Firestore
export const fetchUsers = createAsyncThunk<User[], void>(
  "user/fetchUsers",
  async () => {
    try {
      const storedUid = localStorage.getItem("uid");

      // Get users collection reference
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(
        query(usersCollectionRef, where("id", "==", storedUid))
      );
      const usersData: User[] = [];
      for (const userDoc of usersSnapshot.docs) {
        // Get clients collection reference for each user
        const clientCollectionRef = collection(userDoc.ref, "clients");
        const clientSnapshot = await getDocs(clientCollectionRef);

        const clientsData: Client[] = [];
        for (const clientDoc of clientSnapshot.docs) {
          // Get measurements collection reference for each client
          const measurementsCollectionRef = collection(
            clientDoc.ref,
            "measurements"
          );
          const measurementsSnapshot = await getDocs(measurementsCollectionRef);
          const measurementsData = measurementsSnapshot.docs.map((doc) =>
            doc.data()
          );

          // Create a new client object with the measurements data
          const clientData: Client = {
            id: clientDoc.id,
            advancePayment: clientDoc.data().advancePayment,
            clientAddress: clientDoc.data().clientAddress,
            clientGender: clientDoc.data().clientGender,
            clientImage: clientDoc.data().clientImage,
            clientName: clientDoc.data().clientName,
            clientNumber: clientDoc.data().clientNumber,
            clothImage: clientDoc.data().clothImage,
            deliveryDate: clientDoc.data().deliveryDate,
            dueAmount: clientDoc.data().dueAmount,
            remindDate: clientDoc.data().remindDate,
            totalAmount: clientDoc.data().totalAmount,
            completed: clientDoc.data().completed,
            measurements: measurementsData,
          };

          clientsData.push(clientData);
        }

        // Create a new user object with the clients data
        const userData: User = {
          id: userDoc.id,
          number: userDoc.data().phoneNumber,
          clients: clientsData,
        };

        usersData.push(userData);
      }
      return usersData;
    } catch (error) {
      throw error;
    }
  }
);

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      // @ts-ignore
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      // @ts-ignore
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
