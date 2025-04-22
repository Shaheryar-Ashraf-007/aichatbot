import { Router } from "express";

const chatRoutes = Router();


chatRoutes.use("/", (req, res) => {
  res.send("Chat route is working");
});

export default chatRoutes;
