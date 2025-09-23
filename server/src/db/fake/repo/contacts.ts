import type { Contact, User } from "@/shared/types.js";
import { Users } from "./users.js";

const contacts: Contact[] = Users.map((user) => (user as Contact));

export const ContactRepo = {
  getAll() {
    return contacts;
  },

  findById(id: string) {
    return contacts.find((u) => u.id === id) || null;
  },

  add(user: User) {
    const contact: Contact = { ...user };
    contacts.push(contact);
    return contact;
  },
};
