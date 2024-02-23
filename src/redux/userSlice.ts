import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { RootState } from "../store"; // Assuming you have a store setup

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
  // Add other properties as needed
  measurements: any[]; // Define type for the 'measurements' property
}
interface User {
  id: string; // Assuming each user has an ID
  number: string; // Example property, update as needed
  // Add other properties as needed
  clients: Client[]; // Define type for the 'clients' property
}
interface UserState {
  loading: boolean;
  users: User[];
  error: string;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: "",
};
const userId = auth.currentUser?.uid || "";

export const fetchUsers = createAsyncThunk<User[]>(
  "user/fetchUsers",
  async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);

      const usersData: User[] = [];
      for (const userDoc of usersSnapshot.docs) {
        const clientCollectionRef = collection(userDoc.ref, "clients");
        const clientSnapshot = await getDocs(clientCollectionRef);

        const clientsData: Client[] = [];
        for (const clientDoc of clientSnapshot.docs) {
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
            // Add other properties as needed
            measurements: measurementsData,
          };

          clientsData.push(clientData);
        }

        // Create a new user object with the clients data
        const userData: User = {
          id: userDoc.id,
          number: userDoc.data().phoneNumber, // Assuming 'phoneNumber' is a property of the user document
          // Add other properties as needed
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

// export const selectUsers = (state: RootState) => state.user

export default userSlice.reducer;
