import User from '../models/UserSChema.js';
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Successfully updated',
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed updated',
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Successfully deleted',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed deleted',
    });
  }
};

const getSingUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('-password');
    res.status(200).json({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'No user found',
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({
      success: true,
      message: 'User found',
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Not found',
    });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: 'profile info is getting',
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong, cannot get' });
  }
};

const getMyAppointment = async (req, res) => {
  try {
    //step 1 retrieve appointment from booking for specified user

    const bookings = await Booking.find({ user: req.userId });

    //step 2 extract doctor ids from appointment bookings
    const doctorIds = bookings.map((booking) => {
      return booking.doctor.id;
    });
    //step 3 retrieve doctors using doctor ids

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      '-password'
    );
    res.status(200).json({
      success: true,
      message: 'Appointment are getting',
      data: doctors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong, cannot get' });
  }
};
export {
  updateUser,
  deleteUser,
  getSingUser,
  getAllUser,
  getUserProfile,
  getMyAppointment,
};
