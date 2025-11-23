import express from "express";
import {
  addCategory,
  deleteCategory,
  showAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/add", addCategory);
router.put("/update/:id", updateCategory);
router.get("/:id", showCategory);
router.delete("/:id", deleteCategory);
router.get("/", showAllCategory);

export default router;
