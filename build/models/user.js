"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  profileImage: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
});
var User = _mongoose["default"].model("User", userSchema);
var _default = exports["default"] = User;