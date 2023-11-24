import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  ticketPrice: {
    type: String,
  },
  role: {
    type: String,
  },
  specialization: {
    type: String,
  },
  qualifications: {
    type: Array,
  },
  experiences: {
    type: Array,
  },
  bio: {
    type: String,
    maxLength: 50,
  },
  about: {
    type: String,
  },
  timeSlots: {
    type: Array,
  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

export default mongoose.model("Doctor", DoctorSchema);
