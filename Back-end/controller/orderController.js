const { model } = require("mongoose");
const Orders = require("../models/orders");
const User = require("../models/user");
const packageMember = require("../models/packageMember");

const orderController = {
  getAllOrder: async (req, res) => {
    try {
      //   const page = parseInt(req.query.page) || 1;
      //   const limit = parseInt(req.query.limit) || 10;

      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * limit;
      const user = await Orders.find().skip(skip).sort({createdAt : -1}).limit(limit);

      const totalDocuments = await Orders.countDocuments();
      const basic = await Orders.countDocuments({ packageType: "Basic" });
      const plus = await Orders.countDocuments({ packageType: "Plus" });
      const advanced = await Orders.countDocuments({ packageType: "Advance" });
      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: user,
        basic: basic,
        plus: plus,
        advanced: advanced,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);

      // const result = await Orders.findByIdAndDelete(id);
      const result = await Orders.findByIdAndDelete({ _id: id });
      if (result) {
        return res.status(200).json({ message: "delete order successfull" });
      }
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  viewProfileUser: async (req, res) => {
    try {
      const result = await User.findOne({ _id: req.query.id });
      if (result) {
        return res.status(200).json(result);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getMonthlyOrderCount: async (req, res) => {
    try {
      const monthlyOrderCounts = await Orders.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]);

      // Initialize array for all 12 months with count = 0
      const currentYear = new Date().getFullYear(); // Or specify any year you need
      const formattedResults = Array.from({ length: 12 }, (_, i) => ({
        year: currentYear,
        month: i + 1,
        count: 0,
      }));

      // Update array with actual data where available
      monthlyOrderCounts.forEach((item) => {
        const index = item._id.month - 1; // Convert month to 0-indexed
        formattedResults[index].count = item.count;
        formattedResults[index].year = item._id.year; // Ensure the correct year is set
      });

      return res.status(200).json(formattedResults);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getOrderByUser: async (req, res) => {
    try {
      const user = req.params.id;
      const orders = await Orders.find({ accountID: user }).sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Orders.findById(id);
      res.status(200).json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

module.exports = orderController;
