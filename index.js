"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 4000;
// connect to db
connectToDB();
///============= connect to db Fn ==============
function connectToDB() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      // ============== connnecting to db ==============
      // await mongoose.connect(
      //   "mongodb+srv://tausif:129400@cluster0.py2yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      // );
      yield mongoose_1.default.connect(
        "mongodb+srv://tausif:129400@cluster0.py2yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("connected to db");
      // ============== starting the server ==============
      app_1.default.listen(port, () => {
        console.log("server is running");
      });
    } catch (err) {
      console.log("error connecting to db");
      console.log(err);
    }
  });
}
