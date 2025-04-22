import { Router } from "express";
import {
  getUsers,
  userLogin,
  userSignup,
} from "../controllers/user-controllers.js";
import {
  loginvalidator,
  signupvalidator,
  validate,
} from "../uttils/validators.js";


const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/signup", validate(signupvalidator), userSignup);
userRoutes.post("/login", validate(loginvalidator), userLogin);

export default userRoutes;
