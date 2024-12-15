import { Router } from "express";
import userController from "../controllers/userController";
import { loginDataValidator } from "../validators/userValidator";

const router=Router();

router.post("/login",loginDataValidator,userController.login );
router.post("/logout",userController.logout);

export default router