import { type Request, type Response } from "express";
import { ContactRepo } from "../db/fake/repo/contacts.js";
import ContactService from "../services/contact.js";

const ContactController = {
  list: async (req: Request, res: Response) => {
    const list = await ContactService.list();
    res.status(200).json(list);
  },
};

export default ContactController;
