import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc } from "firebase/firestore";
import { db,  auth} from "../firebase.config";
import { RootState } from "../store"; // Assuming you have a store setup


interface User {
  id: string; // Assuming each user has an ID
  number: string; // Example property, update as needed
  // Add other properties as needed
  clients: any[]; // Define type for the 'clients' property
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
const userId =  auth.currentUser?.uid || "";

// export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
//   try {
//     const userDocRef = doc(db, "users", userId);
//     const userDocSnapshot = await getDoc(userDocRef);

//     if (userDocSnapshot.exists()) {
//       const userData = userDocSnapshot.data();
//       const clientsCollectionRef = collection(userDocRef, "clients");
//       const clientsSnapshot = await getDocs(clientsCollectionRef);
//       const clientsData = clientsSnapshot.docs.map((doc) => doc.data());
//       userData.clients = clientsData;
//       return userData;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     throw error;
//   }
// });

// export const selectUser = (state: UserState) => state.user;


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
        const clientsData = clientSnapshot.docs.map((doc) => doc.data());

        // Create a new user object with the clients data
        const userData: User = {
          id: userDoc.id,
          number: userDoc.data().phoneNumber, // Assuming 'name' is a property of the user document
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
