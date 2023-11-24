import jwt from 'jsonwebtoken';

import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSChema.js';

const authenticate = async (req, res, next) => {
  // get token from headers
  const authenToken = req.headers.authorization;

  //check token is exists
  if (!authenToken || !authenToken.startsWith('Bearer')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }
  try {
    const token = authenToken.split(' ')[1];

    //verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    if (err.name === 'TokeExpiredError') {
      return res.status(401).json({
        message: 'Token is expired',
      });
    }
    return res.status(401).json({
      success: true,
      message: 'Invalid token',
    });
  }
};

const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  if (!roles.includes(user.role)) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized to access this resource',
    });
  }
  next();
};
export { authenticate, restrict };
