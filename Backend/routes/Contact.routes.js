import express from "express";
import { submitContact, getContacts, markContactRead, deleteContact } from "../controller/Contact.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/")
  .post(submitContact)
  .get(protect, admin, getContacts);

router.route("/:id/read")
  .put(protect, admin, markContactRead);

router.route("/:id")
  .delete(protect, admin, deleteContact);

export default router;
