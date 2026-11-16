import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},name:{type:String,required:true},prompt:{type:String,required:true},cron:{type:String,required:true},timezone:{type:String,default:'Asia/Kolkata'},enabled:{type:Boolean,default:true},approvalRequired:{type:Boolean,default:true},nextRunAt:Date,lastRunAt:Date,lastTask:{type:mongoose.Schema.Types.ObjectId,ref:'Task'},runCount:{type:Number,default:0},lastError:String},{timestamps:true});
export default mongoose.model('Automation',schema);
