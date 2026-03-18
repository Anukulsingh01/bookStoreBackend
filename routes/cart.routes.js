const router = require("express").Router();
const User = require("../models/user.model.js")
const {authenticateToken} = require("./userAuth.js")


// put book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
       const {bookid,id} = req.headers;
       const userData = await User.findById(id);
       const isBookinCart = userData.cart.includes(bookid);
       if(isBookinCart){
        return res.status(200).json({message:"Book is already in Cart"});
       }
       await User.findByIdAndUpdate(id,{$push:{cart:bookid}});
       return res.status(200).json({message:"Book is added to cart"});
    }  
    catch(error){
      res.status(500).json({message:"internal server error"});
    }
})
// remove from cart
router.put("/remove-book-from-cart",authenticateToken,async(req,res)=>{
    try{
       const {bookid,id} = req.headers;
       const userData = await User.findById(id);
       const isBookFavourite = userData.cart.includes(bookid);
       if(!isBookFavourite){
         return res.status(400).json({message:"Book is'nt in cart"});
       }
       await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
       return res.status(200).json({message:"Book removed from cart"});
    }  
    catch(error){
      res.status(500).json({message:"internal server error"});
    }
})

// get all books added to the cart-

router.get("/get-all-books-added-to-cart",authenticateToken,async(req,res)=>{
    try{
       const {id} = req.headers;
       const userData = await User.findById(id).populate("cart");
       const cartData = userData.cart.reverse();
       return res.json({
        status:"Success",
        data:cartData,
       });
    }  
    catch(error){
      res.status(500).json({message:"internal server error"});
    }
})




module.exports= router;
