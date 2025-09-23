import { Contact } from "@/shared/types.js";
import { ContactRepo } from "../db/fake/repo/contacts.js";

const ContactService = {
  list: async (): Promise<Contact[]> => {
    return ContactRepo.getAll();
  },
};

export default ContactService;
