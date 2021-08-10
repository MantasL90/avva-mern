const express = require("express");
const {
  getHouses,
  createHouse,
  getHouseById,
  updateHouse,
  deleteHouse,
} = require("../controllers/houseControllers");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getHouses);
router
  .route("/:id")
  .get(getHouseById)
  .delete(protect, deleteHouse)
  .put(protect, updateHouse);
router.route("/create").post(protect, createHouse);
module.exports = router;
