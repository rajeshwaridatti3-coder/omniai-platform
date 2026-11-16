import mongoose from 'mongoose';
const schema=new mongoose.Schema({provider:{type:String,required:true},eventId:{type:String,required:true},eventType:String,payload:mongoose.Schema.Types.Mixed,processed:{type:Boolean,default:false},processedAt:Date,error:String},{timestamps:true});schema.index({provider:1,eventId:1},{unique:true});
export default mongoose.model('WebhookEvent',schema);
