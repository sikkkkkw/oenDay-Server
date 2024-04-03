import "dotenv/config";
import "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import appleRouter from "./routers/appleRouter";
import noticeRouter from "./routers/noticeRouter";
import userRouter from "./routers/userRouter";

const corsOptions = {
  origin: [
    "http://localhost:5172",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://dynamic-sundae-4d7f60.netlify.app",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(
  session({
    name: "Session ID",
    secret: "secret",
    resave: false, // 세션이 변경되지 않아도 항상 저장하도록 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장하지 않도록 설정
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true, // javascript에서 사용이 안되게 하는 옵션
      secure: false, // https를 통해서만 세션 쿠키를 전송하도록 설정
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL + "/oneday",
    }),
  })
);

// 라우터
app.get("/", (req, res) => res.send({ name: "kenJo" }));
app.use("/notice", noticeRouter);
app.use("/apple", appleRouter);
app.use("/users", userRouter);
// app.use("/tweets", upload.single("file"),tweetRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
