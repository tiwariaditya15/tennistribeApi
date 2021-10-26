import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.router";
import verifyToken from "./middlewares/verifyToken.middleware";
import { routeNotFound } from "./middlewares/routeNotFound";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

app.use(cors());
app.use(express.json());
app.use("/accounts", userRouter);
app.use(verifyToken);
app.use(routeNotFound);
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
