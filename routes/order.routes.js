const router = require("express").Router();
const User = require("../models/user.model.js");
const Order = require("../models/order.model.js");
const {authenticateToken} = require("./userAuth.js")

// place order
router.post("place-order",authenticateToken,async(req,res)=>{
    try{
       const {id}= req.headers;
       const {order}= req.body;
       for(const orderData of order){
        const orderDataFromDb = await Order.create({
            user:id,
            book:orderData._id
        });

        // saving order in user model
        await User.findByIdAndUpdate(id,{
            $push:{orders:orderDataFromDb._id},
        })
        // clearing cart
        await User.findByIdAndUpdate(id,{
            $pull:{cart:orderData._id},
        })
       }
       return res.json({
        status:"success",
        message:"Order placed successfully"
       })
    }
    catch(error){
        console.log(error);
    }
})

// get history of a particular user
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try{
       const {id}= req.headers;
        const userData= User.findById(id).populate({
          path:"orders",
          populate:{path:"book"}
        });
       const ordersData = userData.orders.reverse();
       return res.json({
        status:"success",
        data:ordersData,
       })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
})

// update order---admin

router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try{
       const {id}=req.params;
       await Order.findByIdAndUpdate(id,{status:req.body.status});
       return res.json({
        status:"success",
        message:"status updated Successfully",
       });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
})


module.exports=router;