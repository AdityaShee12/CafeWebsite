import express from "express";
import { getMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } from "../controller/Menu.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/")
  .get(getMenuItems)
  .post(protect, admin, createMenuItem);

router.route("/:id")
  .get(getMenuItemById)
  .put(protect, admin, updateMenuItem)
  .delete(protect, admin, deleteMenuItem);

export default router;
