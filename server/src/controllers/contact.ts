import { type Request, type Response } from "express";
import ContactService from "../services/contact.js";

const ContactController = {
  list: async (req: Request, res: Response) => {
    const list = await ContactService.list(req.user.id);
    res.status(200).json(list);
  },
};

export default ContactController;
