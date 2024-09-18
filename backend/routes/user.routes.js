import express from "express";
import ProtectRoute from "../middleware/protectRoute.js";
import { getUsersForSideBar } from "../controllers/user.controllers.js"; 

const router=express.Router();

router.get("/",ProtectRoute,getUsersForSideBar)

export default router;