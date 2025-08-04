import mongoose from 'mongoose';

const weightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: Date,
  wgt: Number,
});

const weightModel = mongoose.models.weight || mongoose.model('weight', weightSchema);

export default weightModel
