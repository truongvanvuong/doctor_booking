import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: {
    type: String,
    require: true,
  },
  name: { type: String, require: true },
  phone: { type: Number },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['patient', 'admin'],
    default: 'patient',
  },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bloodType: {
    type: String,
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.model('User', userSchema);
