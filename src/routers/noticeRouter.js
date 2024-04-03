import express from "express";
import {
  noticeDelete,
  noticeDetail,
  noticeEdit,
  noticeList,
  noticeWrite,
} from "../controllers/noticeController";

const noticeRouter = express.Router();

noticeRouter.get("", noticeList);
noticeRouter.post("/write", noticeWrite);
noticeRouter.get("/:id", noticeDetail);
noticeRouter.post("/:id/edit", noticeEdit);
noticeRouter.post("/:id/delete", noticeDelete);

export default noticeRouter;
