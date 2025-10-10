import { Contact, User, UserStatus } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  current: null | User;
  contact: Record<string, { meta: Contact; status: UserStatus }>;
}

const initialState: UserState = {
  current: null,
  contact: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
    },
    cleanCurrent: (state) => {
      state.current = null;
    },
    initContacts: (state, action: PayloadAction<Contact[]>) => {
      action.payload.forEach((contact) => {
        state.contact[contact.id] = {
          meta: contact,
          status: { id: contact.id, isOnline: false, lastSeenAt: null }, // initialize status
        };
      });
    },
    setContactMeta: (state, action: PayloadAction<Contact>) => {
      const meta = action.payload;
      if (!state.contact[meta.id]) {
        state.contact[meta.id] = { meta, status: {} as UserStatus };
      } else {
        state.contact[meta.id].meta = meta;
      }
    },
    setContactStatus: (state, action: PayloadAction<UserStatus>) => {
      const status = action.payload;
      if (!state.contact[status.id]) {
        state.contact[status.id] = { meta: {} as Contact, status };
      } else {
        state.contact[status.id].status = status;
      }
    },
  },
});

export const {
  setCurrent,
  cleanCurrent,
  initContacts,
  setContactMeta,
  setContactStatus,
} = userSlice.actions;
export default userSlice.reducer;
