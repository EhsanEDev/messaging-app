import { ContactRepo } from "../db/fake/repo/contacts.js";
import express, { type Request, type Response } from "express";

const router = express.Router();

// contact list
router.get("/list", (req: Request, res: Response) => {
  res.status(200).json(ContactRepo.findAll());
});

export default router;
