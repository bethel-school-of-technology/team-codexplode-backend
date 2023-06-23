import { Router } from "express";
import {
  addEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
} from "../controllers/eventController";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getOneEvent);
router.post("/", addEvent);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);

export default router;
