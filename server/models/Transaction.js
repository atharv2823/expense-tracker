import {Schema, model} from "mongoose"

const transactionSchema = new Schema({
    amount :{
        type: Number,
        required : true
    },
    category :{
        type : String,
        default:"Others",
    },
    title:{
        type : String,
        required:true,
    },
    type:{
        type:String,
        enum : ["debit","credit"],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref :"User",
        required:true,
    }
})

const Transaction = model("Transaction",transactionSchema);

export default Transaction ;