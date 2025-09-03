import { UserList } from "./users.js";

let contacts = UserList.map(({ id, username, avatarUrl }) => ({
  id,
  username,
  avatarUrl,
}));

export const ContactRepo = {
  findAll() {
    return contacts;
  },

  findById(id) {
    return contacts.find((u) => u.id === id) || null;
  },

  create(username, avatarUrl) {
    const contact = {
      id: String(Date.now()),
      username,
      avatarUrl,
    };
    contacts.push(contact);
    return contact;
  },
};
