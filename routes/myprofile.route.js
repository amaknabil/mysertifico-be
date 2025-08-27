const express = require("express");
const router = express.Router();
const myprofileController = require("../controllers/myprofile.controller");
const { authMiddleware } = require("../middleware/auth.middleware"); // Corrected import
const upload = require("../middleware/upload.middleware"); // Multer upload middleware


router.get("/", authMiddleware, myprofileController.getProfile);


router.patch("/", authMiddleware, myprofileController.updateProfile);


router.post(
  "/photo",
  authMiddleware,
  upload.single("file"),
  myprofileController.uploadProfilePicture
);

module.exports = router;
