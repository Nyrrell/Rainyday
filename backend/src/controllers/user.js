import CryptoJS from "crypto-js";
import User from "../models/User.js";

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });
    const { password, ...other } = updateUser.toJSON();
    res.send(other);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid user ID';
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) return res.code(403).send(new Error('Unauthorized access'));

  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user.toJSON();
    res.send(other);
  } catch (e) {
    if (e.path === '_id') e['message'] = 'Invalid user ID';
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    const listUsers = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    const users = listUsers.map(user => {
      const { password, ...other } = user.toJSON()
      return other
    })
    res.send(users);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};

export const getUsersStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);

    res.send(data);
  } catch (e) {
    res.send(new Error('ERROR_OCCURRED'));
  }
};