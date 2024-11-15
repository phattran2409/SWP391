const { json } = require("express");
const User = require("../models/user");
const  CompareHistory   = require("../models/compareHistory");
const { trace } = require("../routes/user");

 const CompareController   = {
     add : async (req , res) => { 
    try {
        const  { 
            accountID,
            fishkoi ,
            pond
        } = req.body
        console.log( fishkoi , pond);
        const newHistory = new CompareHistory({
            accountID : accountID, 
            item : {  fishkoi , pond}
        })
        await newHistory.save();
        
        console.log(req.body);

        return res.status(200).json({message : "Add Success" , newHistory})
    } catch (err) {
      return res.status(500).json(err.message);
    }
    } , 
    findID : async (req ,res) =>{ 
        try {
            const  accountID =  req.params.id;
            console.log(req.params.id);
            const result = await CompareHistory.find({
               accountID  : accountID
            });
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err.message)
        }
    } , 
        delete : async (req,res) =>{ 
            try {
                
                const resultCode = await CompareHistory.findByIdAndDelete(req.params.id);
                if (resultCode) {
                    return res.status(200).json("Delete Success");
                }
                return res.status(403).json("Document not found !");
            } catch (error) {
                res.status(500).json(err.message)
            }
        }
    
 }

module.exports = CompareController;

