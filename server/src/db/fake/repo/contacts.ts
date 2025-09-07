import type { Contact, User } from "@/shared/types.js";
import { UserList } from "./users.js";

let contacts: Contact[] = UserList.map(({ id, username, avatarUrl }) => ({
  id,
  username,
  avatarUrl: avatarUrl ?? "",
}));

export const ContactRepo = {
  findAll() {
    return contacts;
  },

  findById(id: string) {
    return contacts.find((u) => u.id === id) || null;
  },

  create(username: string, avatarUrl: string) {
    const contact = {
      id: String(Date.now()),
      username,
      avatarUrl,
    };
    contacts.push(contact);
    return contact;
  },
};
