import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessage, getUsersForSideBar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);

router.get("/:id", protectRoute, getMessage);

router.post("/:id", protectRoute, sendMessage);

export default router;