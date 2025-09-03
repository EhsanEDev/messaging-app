import express from "express";
import { ContactRepo } from "../db/fake/repo/contacts.js";
const router = express.Router();

// contact list
router.get("/list", (req, res) => {
  res.status(200).json(ContactRepo.findAll());
});

export default router;
