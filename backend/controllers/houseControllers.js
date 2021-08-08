const asyncHandler = require("express-async-handler");
const House = require("../models/houseModel");

const getHouses = asyncHandler(async (req, res) => {
  const houses = await House.find({ user: req.user_id });
  res.json(houses);
});

const createHouse = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const house = new House({
      user: req.user_id,
      title,
      content,
      category,
    });

    const createdHouse = await house.save();

    res.status(201).json(createdHouse);
  }
});

const getHouseById = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);
  if (house) {
    res.json(house);
  } else {
    res.status(404).json({ message: "House not found" });
  }
  res.json(house);
});

const updateHouse = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const house = await House.findById(req.params.id);

  if (house) {
    house.title = title;
    house.content = content;
    house.category = category;

    const updateHouse = await house.save();
    res.json(updateHouse);
  } else {
    res.status(404);
    throw new Error("House not found");
  }
});

const deleteHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (house) {
    await house.remove();
    res.json({ message: "House removed" });
  } else {
    res.status(404);
    throw new Error("House not found");
  }
});

module.exports = {
  getHouses,
  createHouse,
  getHouseById,
  updateHouse,
  deleteHouse,
};
