import mongoose from "mongoose";


const serviceRequestsSchema = new mongoose.Schema({
client:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
provider:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null},
serviceType:{type:String, required:true, trim:true},
serviceAddress:{type:String, required:true,trim:true},
preferredDate:{type:Date, required:true},
status:{type:String, enum:["pending","accepted","completed","cancelled"],default:"pending"},
estimatedPrice:{type:Number,required:true},
description:{type:String, required:true}


},
{
    timestamps:true
}
)


const ServiceRequests = mongoose.model("ServiceRequests",serviceRequestsSchema)
export default ServiceRequests;