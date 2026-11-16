import cron from 'node-cron';
import Task from '../models/Task.js';
import User from '../models/User.js';
import {getQueue} from '../config/queue.js';
import {executeTask} from '../services/executor.js';
// Dispatch due tasks every minute. Atomic status update prevents duplicate dispatch across API instances.
cron.schedule('* * * * *', async () => {
  try {
    const due = await Task.find({status:'scheduled', scheduledAt:{$lte:new Date()}}).select('_id user');
    for (const item of due) {
      const user = await User.findById(item.user).select('preferences');
      const nextStatus = user?.preferences?.approvalMode === 'auto' ? 'queued' : 'awaiting_approval';
      const claimed = await Task.findOneAndUpdate({_id:item._id,status:'scheduled'},{$set:{status:nextStatus},$push:{logs:{level:'info',message:nextStatus==='queued'?'Scheduled task is due and queued':'Scheduled task is due; approval required'}}},{new:true});
      if (!claimed || nextStatus !== 'queued') continue;
      const queue = getQueue();
      if (queue) await queue.add('execute',{taskId:String(claimed._id)});
      else executeTask(claimed).catch(console.error);
    }
  } catch (error) { console.error('Scheduler error:',error.message); }
});
