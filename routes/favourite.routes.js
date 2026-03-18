const router = require("express").Router();
const User = require("../models/user.model.js")
const {authenticateToken} = require("./userAuth.js")

// add book to favourite 
router.put("/add-book-to-favourite",authenticateToken,async(req,res)=>{
    try{
       const {bookid,id} = req.headers;
       const userData = await User.findById(id);
       const isBookFavourite = userData.favourites.includes(bookid);
       if(isBookFavourite){
        return res.status(200).json({message:"Book is already in favourite"});
       }
       await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
       return res.status(200).json({message:"Book is added to favourites"});
    }  
    catch(error){
      res.status(500).json({message:"internal server error"});
    }
})


// delete book from favourite
router.delete("/remove-book-from-favourite",authenticateToken,async(req,res)=>{
    try{
       const {bookid,id} = req.headers;
       const userData = await User.findById(id);
       const isBookFavourite = userData.favourites.includes(bookid);
       if(!isBookFavourite){
         return res.status(400).json({message:"Book is'nt in favourites"});
       }
       await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
       return res.status(200).json({message:"Book removed favourites"});
    }  
    catch(error){
      res.status(500).json({message:"internal server error"});
    }
})


//get all favourite books of a particular user
router.get("/get-all-favourite-books",authenticateToken,async(req,res)=>{
    try{
       const {id} = req.headers;
       const userData = await User.findById(id).populate("favourites");
       const favouriteBooks = userData.favourites;
       return res.json({
        status:"Success",
        data:favouriteBooks,
       });
    }  
    catch(error){
      res.status(500).json({message:"internal server error"});
    }
})



module.exports=router;