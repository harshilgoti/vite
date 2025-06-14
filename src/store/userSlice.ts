import type { User } from "@/types/User";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUsers: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    updateUsers: (state, action: PayloadAction<User>) => {
      const updatedUsers = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...action.payload,
          };
        } else {
          return {
            ...user,
          };
        }
      });
      state.users = updatedUsers;
    },
    deleteUsers: (state, action: PayloadAction<number>) => {
      const updatedUsers = state.users.filter((user) => {
        if (user.id === action.payload) {
          return false;
        }
        return true;
      });
      state.users = updatedUsers;
    },
  },
});

export const { getUsers, addUsers, updateUsers, deleteUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
