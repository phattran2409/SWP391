const _package  = require( "../models/package");
const { getById } = require("./pondController");
const { model } = require("mongoose");


const PackageController =  { 
    createPackage : async (req ,res) =>{ 
       
        try {
            const { packageType, amount, expiresDay } = req.body;
            const data = {packageType ,amount , expiresDay}
            const  newPackage = new _package(data);
            await newPackage.save();
            return  res.status(200).json("create successful package");
        } catch (err) {
            return res.status(500).json(err);
        }
    } , 
    UpdatePackage :  async (req , res) => { 
        console.log("RUN UPDATE PACKAGE -----> ");
        try {
            const {id, packageType , amount , expiresDay} = req.body; 
            const dataUpdate = { packageType , amount , expiresDay}
            const updatePackage = await _package.findByIdAndUpdate(id , dataUpdate , {
                new :true , 
                runValidators : true,
            });
            console.log(updatePackage);
            if (updatePackage ) {
                return res.status(200).json({message : "Update Success" , data : updatePackage})
            }else{ 
                return res.status(400).json({message : "package not found" })
            }
         
        } catch (err) {
            return res.status(500).json(err);
        }
    }, 
    DeletePackage : async ( req , res) => { 
        try {
             const result = await _package.findByIdAndDelete(req.body.id);
            if (result) { 
                return res.status(200).json({message : "Delete Success"});

            }else { 
                return res.status(404).json({message : "package not found"});
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }, 
    GetAllPackage : async (req , res) =>  {
        try {
            const result = await _package.find();
            if (result) { 
                return res.status(200).json({message : "get success"  , data : result})
            }else { 
                return res.status(404).json({message : "Empty"});
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }, 
    getByIdPackage : async (req ,res) =>  {
        try {
            const result = await _package.findById(req.body.id);
            if (result) {
              return res
                .status(200)
                .json({ message: "Package found", data: package });
            } else {
              return res.status(404).json({ message: "Package not found" });
            } 
        } catch (err) {
             return res
               .status(500)
               .json({ message: "Error finding package", error: err.message });
        }
    }

}

module.exports = PackageController;