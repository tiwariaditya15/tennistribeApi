import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import authenticationRouter from "./routes/authentication.router";
import postsRouter from "./routes/posts.router";
import commentsRouter from "./routes/comments.router";
import userRouter from "./routes/user.router";
import reactionRouter from "./routes/reactions.router";
import verifyToken from "./middlewares/verifyToken.middleware";
import { routeNotFound } from "./middlewares/routeNotFound";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

app.use(cors());
app.use(express.json());
app.use("/accounts", authenticationRouter);
app.use(verifyToken);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/users", userRouter);
app.use("/reactions", reactionRouter);
app.use(routeNotFound);
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
