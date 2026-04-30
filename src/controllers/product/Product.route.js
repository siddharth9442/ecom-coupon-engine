import { Router } from "express";
import * as ProductController from "./Product.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { createUploader } from "../../middlewares/multer.middleware.js";

const router = Router();

// const upload = createUploader({
//   allowedTypes: [".jpg", ".jpeg", ".png"],
//   maxSize: 5
// });


// /product/add 
router.route("/add").post(
  authenticate,
  // upload.array("images", 5), 
  ProductController.add);

// /product/list
router.route("/list").get(authenticate, ProductController.list);

// /product/get/:id
router.route("/get/:id").get(authenticate, ProductController.get);

// /product/remove/:id
router.route("/remove/:id").delete(authenticate, ProductController.remove);

export default router;