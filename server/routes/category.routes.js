import express from "express";
import {
  addCategory,
  deleteCategory,
  showAllCategory,
  showCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import { protectAdmin } from "../middlewares/admin.middleware.js";
const router = express.Router();

router.post("/add", protectAdmin, addCategory);
router.put("/update/:id", protectAdmin, updateCategory);
router.get("/:id", protectAdmin, showCategoryById);
router.delete("/:id", protectAdmin, deleteCategory);
router.get("/", showAllCategory);

export default router;
