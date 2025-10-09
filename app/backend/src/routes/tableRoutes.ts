import { Router } from "express";
import {
  deleteTableRow,
  editTableRow,
  getTableData,
  insertTable,
} from "../controllers/crudTableController";

const router = Router();
router.delete("/delete", deleteTableRow);
router.post("/update", editTableRow);
router.get("/select", getTableData);
router.post("/insert", insertTable);
export default router;
