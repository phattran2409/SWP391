const User = require("../models/user");
const packageMember = require("../models/packageMember");
const bcrypt = require("bcrypt")

const useController = {
  getAllUsr: async (req, res) => {
    try {
      const user = await User.find({});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      // neu muon xoa mot user trong Database thi findByIdandDelete
      const user = await User.findById(req.params.id);
      res.status(200).json("DELETE SUCCESSFULLY ");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
        const idUser = req.params.id
        const updateData = req.body
        // hash Password
        if (updateData.password) { 
          const salt  = await bcrypt.genSalt(10);
          const hashedPawssword = await bcrypt.hash(updateData.password , salt); 
          updateData.password = hashedPawssword;
        }


         const updateUsr = await User.findByIdAndUpdate(idUser , updateData ,  {
          new : true , 
          runValidators : true,
        })
        
        if (!updateUsr) {
          return res.status(404).json({ error: "User Not found" });
        }
        // neu muon update sai save()
        // await updateUsr.save();
        res.status(202).json(updateUsr)

    } catch (err) {
      res.status(500).json(err)
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json("Not found user");
      }
      
      res.status(200).json(user);
    
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  subcribeMemberShip: async (req, res) => {
    try {
      const  packageType  = req.body.packageType;   
      const id = req.body.id; 

       // check account id da dk goi member hay chua 
      const isExist  = packageMember.find({accountID : id})
      if(isExist) {
       return  res.status(403).json({error : 'account was subcribe member'})
      }

      
      let day;
      let Name = " ";
      switch (packageType) {
        case "0":
          day = 30;
          Name = "Basic";
          break;
        case "1":
          day = 60;
          Name = "advanced";
          break;
        case "2":
          day = 90;
          Name = "Plus";
          break;
        default:
          return res.status(404).json({ error: "invalid package type" });
          break;
      }
      let DateExpires = new Date(Date.now() + day * 24 * 60 * 60 * 1000);
      const packageMem = new packageMember({
        accountID: id,
        name : Name,
        expires:  DateExpires,
      });

      
      // update status member 
      const updateUser = await User.findByIdAndUpdate(id, {
        memberStatus :true,
      })
      
   
      


      // save  to database
      const newpackageMembers = await  packageMem.save();
      updateUser.save();
      // res to json 
      return res.status(200).json( {newpackageMembers });

    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = useController;
