import type { Contact, User } from "@/shared/types.js";
import { Users } from "./users.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const contacts: Contact[] = Users.map(({ password, ...contact }) => contact);

export const ContactRepo = {
  getAll() {
    return contacts;
  },

  getAllById(id: string) {
    return contacts.filter((contact) => contact.id !== id) || [];
  },

  findById(id: string) {
    return contacts.find((u) => u.id === id) || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add({ password, ...rest }: User) {
    const contact: Contact = { ...rest };
    contacts.push(contact);
    return contact;
  },
};