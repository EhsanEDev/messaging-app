import { Contact } from "@/shared/types.js";
import { ContactRepo } from "../db/fake/repo/contacts.js";

const ContactService = {
  list: async (id: string): Promise<Contact[]> => {
    return ContactRepo.getAllById(id);
  },
};

export default ContactService;
