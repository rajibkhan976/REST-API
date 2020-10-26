const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes.js");
const songRoutes = require("./songRoutes.js");

router.post("/users", userRoutes.signUpUser);
router.post("/signin", userRoutes.signInUser);
router.get("/signout", userRoutes.signOutUser);

router.get("/songs", songRoutes.getSongs);
router.get("/song/:id", songRoutes.getSongById)
router.post("/song", songRoutes.addSongToList);
router.post("/upload", songRoutes.uploadSongImage);
router.patch("/song/:id", songRoutes.updateSongById);
router.delete("/song/:id", songRoutes.deleteSongById);

module.exports = router;
