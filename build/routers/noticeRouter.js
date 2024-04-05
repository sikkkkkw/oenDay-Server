"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _noticeController = require("../controllers/noticeController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var noticeRouter = _express["default"].Router();
noticeRouter.get("", _noticeController.noticeList);
noticeRouter.post("/write", _noticeController.noticeWrite);
noticeRouter.get("/:id", _noticeController.noticeDetail);
noticeRouter.post("/:id/edit", _noticeController.noticeEdit);
noticeRouter.post("/:id/delete", _noticeController.noticeDelete);
var _default = exports["default"] = noticeRouter;