import User from '../models/UserSChema.js';

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
export { updateUser, deleteUser, getSingUser, getAllUser };
