import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  targetWeight: {
    type: Number,
    min: 0,
    max: 150,
    required: false,
  },
  height: {
    type: Number,
    min: 0,
    max: 213,
    required: false,
  },
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel
