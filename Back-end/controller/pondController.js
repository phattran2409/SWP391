const pond = require("../models/pond");
const ponds = require("../models/pond");

const pondController = {
  //CREATE NEW POND
  createPond: async (req, res) => {
    try {
      const newPond = new ponds(req.body);
      const savedPond = await newPond.save();
      res.status(200).json(savedPond);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //GET ALL POND
  getAllPond: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      const skip = (page - 1) * limit;

      const allPond = await ponds.find().skip(skip).limit(limit);

      const totalDocuments = await ponds.countDocuments();

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: allPond,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //SEARCH POND WITH FILTER AND SORT
  searchPond: async (req, res) => {
    const {
      shape,
      direction,
      sortBy = "elementID", // Field to sort by
      sortOrder = "asc", // 'asc' or 'desc'
    } = req.query;

    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      const skip = (page - 1) * limit;
      const filter = {};

      if (shape) {
        filter.shape = { $regex: shape, $options: "i" };
      }

      if (direction) {
        filter.direction = { $regex: direction, $options: "i" };
      }

      const sortOrderValue = sortOrder === "asc" ? 1 : -1;
      const pondList = await ponds
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrderValue })
        .exec();
      const totalDocuments = await ponds.countDocuments(filter);

      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: pondList,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //GET POND BY ELEMENT
  getByElement: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const skip = (page - 1) * limit;
      const pond = await ponds
        .find({ elementID: req.params.id })

        .skip(skip)
        .limit(limit);
      const totalDocuments = await ponds.countDocuments({
        elementID: parseInt(req.params.id)
      });
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: pond,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //GET POND BY ID
  getById: async (req, res) => {
    try {
      const pond = await ponds.findById(req.params.id);
      if (!pond || pond.length === 0) {
        return res.status(403).json("data is not found");
      }
      return res.status(200).json(pond);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //DELETE POND
  deletePond: async (req, res) => {
    try {
      await ponds.findByIdAndDelete(req.params.id);
      res.status(200).json(ponds);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //UPDATE POND
  updatePond: async (req, res) => {
    try {
      const pondId = req.params.id;
      const updateData = req.body;
      const update = await ponds.findByIdAndUpdate(
        pondId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (!update) {
        return res.status(404).json({ error: "Pond Not found" });
      }
      res.status(200).json(update);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = pondController;
