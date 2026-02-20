import mongoose, { Types } from "mongoose";


const paymentSchema = new mongoose.Schema({
serviceRequest:{type:mongoose.Schema.Types.ObjectId,ref:"ServiceRequests",required:true},
client:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
provider:{type:mongoose.Schema.Types.ObjectId,ref:"User", default:null},
amount:{type:Number, required:true},
paymentMethod:{type:String,enum:["cash","upi","card"],default:null},
status:{type:String,enum:["pending","paid"],default:"pending"},
paidAt:{type:Date}

},
{
    timestamps:true
}
)

const Payment = mongoose.model("Payment",paymentSchema)
export default Payment