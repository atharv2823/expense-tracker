import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const postTransaction = async (req, res )=>{

    const {amount , category, title ,type ,user} =req.body ;
    
   const transaction = new Transaction ({
    amount ,
    category ,
    title,
    type,
    user
   })

    try {
        const savedTransaction = await transaction.save();

        res.json({
            success:true,
            message : "Transaction Successful",
            data :savedTransaction
        })
       
    }
    catch (e){
        res.json({
            success : false ,
            message : e.meassage,
            data: null,
        })
    }

}

const getTransaction = async(req,res)=>{
    const {userId} = req.query;

    const user = await User.findById(userId)

    if(!user){
        return res.json({
            sucess: false,
            message : "User not found",
            data: null
        })
    }

    const transaction = await Transaction.find({user:userId}).sort({createdAt:-1});

    res.json({
        sucess: true,
        message : "Transaction Featched Successfully",
        data: transaction
    })

}

const deleteTransaction = async (req , res) => {
    const{id} = req.params

    await Transaction.deleteOne({_id:id})

    res.json({
        success : true ,
        message : "Transaction deleted Successfully",
        data : null
    })

    
}

export {
    postTransaction,
    getTransaction,
    deleteTransaction
}