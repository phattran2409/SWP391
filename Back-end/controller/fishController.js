
const { query } = require("express");
const fishkois = require("../models/fishkoi"); 

const { search } = require("../routes/oauth");
const { MongoClient } = require("mongodb");
require("dotenv").config();


const fishController = {
  pagination: (collectionName) => {
    const client = new MongoClient(proccess.env.DB_URI);
    const db = client.db("test")
    return db.collection(collectionName);
  } ,
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page || 1);
      const limit = parseInt(req.query.limit || 10);
      const skip = (page -1) * limit;
      console.log({ page, limit });

      // const result = await paginations.paginationGetAll(
      //   page,
      //   limit,
      //   "fishkois"
      // );
       const result = await fishkois.find()
      .skip(skip)
      .limit(limit)
      const totalDocuments = await fishkois.countDocuments();

      // if (result.currentPage > result.totalPages) {
      //   return res.status(404).json("Not Found Data");
      // }
  
      return res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments: totalDocuments,
        data: result,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const fishkoi = await new fishkois({
        elementID: req.body.elementID,
        koiName: req.body.koiName,
        description: req.body.description,
        image: req.body.image,
        colors: req.body.colors,
      });
      await fishkoi.save();
      return res.status(200).json({ message: "create success", fishkoi });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const idObject = req.params.id;
      console.log(idObject);

      const Fkoi = await fishkois.findByIdAndDelete(idObject);
      console.log(Fkoi);

      return res.status(200).json({ message: "delete success" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const idObject = req.params.id;
      const updateData = req.body;
      const updateFishKoi = await fishkois.findByIdAndUpdate(
        idObject,
        { $set: updateData },
        {
          new: true,
          runValidator: true,
        }
      );
      if (!updateFishKoi) {
        return res.status(404).json("fish not found");
      }
      return res.status(200).json(updateFishKoi);
    } catch (err) {
      return res.status(500).json(err);
    }
  },



   search : async (req, res) => {

     
  
    try {
      const searchName = req.query.searchName  || "";
     // const searchColor = req.query.searchColor || "";
      const searchColor = req.query.searchColor ?  req.query.searchColor.split(",") : [];
      const page = parseInt(req.query.page || 1);
      const limit = parseInt(req.query.limit || 10);
      const sortOrder = req.query.sortOrder || "asc";
      const sortBy = parseInt(req.query.sortBy) || 0;

      // tao doi tuong searh filter
      const searchFilter = {};
      // skip dung de  phan trang
      const skip = (page - 1) * limit;
      // xây dựng điều kiệm tìm kiếm
      const sortByValue = ["elementID", "koiName"];
      const sortOrderValue = sortOrder === "asc" ? 1 : -1;

      const sortOptions = {
        [sortByValue[sortBy]]: sortOrderValue,
      };
      // log
 
      // dieu kien 1 neu tim name
      if (searchName)  searchFilter.koiName = { $regex: searchName, $options: "i" };
      // dieu kien 2 tim color 
      if (searchColor.length > 0)  {  
        searchFilter.colors = { $in: searchColor };
      };
      if (req.query.searchElement) searchFilter.elementID = parseInt(req.query.searchElement);
      
     const listCollection  = await fishkois.find(searchFilter)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
      
      console.log(listCollection.length);
      
      if(listCollection.length == 0) {
      return  res.status(404).json("Not Found Data");
      }


      //  dem tong collection
      const totalDocuments =  await fishkois.countDocuments();
      
      
      
      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(listCollection.length/ limit),
        totalDocuments: listCollection.length,
        data: listCollection,
      });
    } catch (err) {
      res.status(500).json({message : err});
    }
   } ,

  //  getKoiByElement  : async(req ,res) => {
  //      try {
     

  //        console.log("query " + req.params.id);
  //        console.log("query  "  + typeof req.params.id);
  //        //get bang body
  //        // const fishkoi = await fishkois.find({elementID : parseInt(data.elementID) });

  //        //get bang query
  //        const fishkoi = await fishkois.find  ({  
  //          elementID:  req.params.id})
         
         
  //        console.log(typeof fishkoi);
  //        console.log(fishkoi.length);

  //        if (fishkoi.length === 0) {
  //          return res.status(403).json("data is not found");
  //        }
  //        return res.status(200).json(fishkoi);
  //      } catch (err) {
  //        return res.status(500).json(err);
  //      }    
  //  },

  getKoiByElementId: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const skip = (page - 1) * limit;
      const koi = await fishkois
      .find({ elementID: req.params.id})
    
      .skip(skip)
      .limit(limit);
    const totalDocuments = await fishkois.countDocuments({ elementID: req.params.id });
        res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments: totalDocuments,
      data: koi,
    });
    } catch (error) {
       res.status(500).json(error);
    }
  },

  getKoiById: async (req, res) => {
    try {
      const koi = await fishkois.findById(req.params.id);
      if (!koi || koi.length === 0) {
        return res.status(403).json("data is not found");
      }
      return res.status(200).json(koi);
    } catch (error) {
      return res.status(500).json(error);
    }
  },


  //        console.log("query " + req.params.id);
  //        console.log("query  "  + typeof req.params.id);
  //        const page = (parseInt(req.query.page)||1 )
  //       const limit = (parseInt(req.query.limit) || 5)
  //      const  skip = ( page - 1 )  * limit

      
  //        //get bang body
  //        // const fishkoi = await fishkois.find({elementID : parseInt(data.elementID) });

  //        //get bang query
  //        const fishkoi = await fishkois.find  ({  
  //          elementID:  req.params.id})
  //          .skip(skip)
  //          .limit(limit)
         
  //        console.log(typeof fishkoi);
  //        console.log(fishkoi.length);
          
  //        if (fishkoi.length === 0) {
  //          return res.status(403).json("data is not found");
  //        }
  //        return res.status(200).json({
  //          currentPage: page,
  //          totalPages: Math.ceil(fishkoi.length / limit),
  //          totalDocuments: fishkoi.length,
  //          data: fishkoi,
  //        });
  //      } catch (err) {
  //        return res.status(500).json(err);
  //      }
      
  //  },

};

module.exports = fishController