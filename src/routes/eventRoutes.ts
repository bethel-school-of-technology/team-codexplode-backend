import { Router } from "express";
import {
  addEvent,
  editEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  addParticipant,
  removeParticipant
} from "../controllers/eventController";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getOneEvent);
router.post("/", addEvent);
router.put("/:id/add-participant", addParticipant);
router.put("/:id/remove-participant", removeParticipant);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);

export default router;
