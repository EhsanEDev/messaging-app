import { v4 as uuid } from "uuid";

let contacts = [];

export const ContactRepo = {
  findAll() {
    return contacts;
  },

  findById(id) {
    return contacts.find((u) => u.id === id) || null;
  },

  create(name, avatar) {
    const user = {
      id: uuid(),
      name,
      avatar,
    };
    contacts.push(user);
    return user;
  },
};